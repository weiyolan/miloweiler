/**
 * Parses a Figma SVG export and extracts image grid positions.
 *
 * Algorithm (grouping-independent):
 * 1. Collect all <rect> elements regardless of nesting
 * 2. Detect grid cells by finding the most common rect size
 * 3. Auto-detect pitch from spacing between first two grid cells
 * 4. Auto-detect offset from the first grid cell's position
 * 5. All non-grid, non-background rects are image rects
 * 6. Convert pixel coords to 1-based grid coords with rounding
 *
 * @param {string} svgString - Raw SVG file contents
 * @param {number} columnCount - Number of grid columns (e.g. 24 for desktop, 9 for mobile)
 * @returns {{ images: Array<{id, col, row, colSpan, rowSpan, border}>, error: string|null }}
 */
export function parseSvg(svgString, columnCount) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(svgString, 'image/svg+xml')

  const parseError = doc.querySelector('parsererror')
  if (parseError) {
    return { images: [], error: 'Invalid SVG file' }
  }

  const allRects = Array.from(doc.querySelectorAll('rect'))
  if (allRects.length === 0) {
    return { images: [], error: 'No <rect> elements found in SVG' }
  }

  // Extract attributes from every rect
  const rects = allRects.map((el) => ({
    el,
    id: el.getAttribute('id') || '',
    x: parseFloat(el.getAttribute('x')) || 0,
    y: parseFloat(el.getAttribute('y')) || 0,
    width: parseFloat(el.getAttribute('width')) || 0,
    height: parseFloat(el.getAttribute('height')) || 0,
    stroke: el.getAttribute('stroke'),
    strokeWidth: parseFloat(el.getAttribute('stroke-width')) || 0,
  }))

  // --- Step 1: Detect grid cells by most common size ---
  const sizeKey = (r) => `${r.width.toFixed(1)}x${r.height.toFixed(1)}`
  const sizeCounts = new Map()
  for (const r of rects) {
    const key = sizeKey(r)
    sizeCounts.set(key, (sizeCounts.get(key) || 0) + 1)
  }

  let gridSizeKey = null
  let gridSizeCount = 0
  for (const [key, count] of sizeCounts) {
    if (count > gridSizeCount) {
      gridSizeKey = key
      gridSizeCount = count
    }
  }

  if (gridSizeCount < columnCount) {
    return { images: [], error: `Could not detect grid cells (most common size "${gridSizeKey}" appears ${gridSizeCount} times, expected at least ${columnCount})` }
  }

  const gridCells = rects.filter((r) => sizeKey(r) === gridSizeKey)
  const nonGridRects = rects.filter((r) => sizeKey(r) !== gridSizeKey)

  // --- Step 2: Auto-detect pitch from first row of grid cells ---
  const minY = Math.min(...gridCells.map((c) => c.y))
  const firstRow = gridCells
    .filter((c) => Math.abs(c.y - minY) < 1)
    .sort((a, b) => a.x - b.x)

  if (firstRow.length < 2) {
    return { images: [], error: 'Could not detect grid pitch (need at least 2 cells in the first row)' }
  }

  const pitch = firstRow[1].x - firstRow[0].x
  if (pitch <= 0) {
    return { images: [], error: `Invalid grid pitch: ${pitch}` }
  }

  // --- Step 3: Auto-detect offset ---
  const offsetX = firstRow[0].x
  const offsetY = minY

  // --- Step 4: Filter out background rects ---
  const svgEl = doc.querySelector('svg')
  const svgWidth = parseFloat(svgEl?.getAttribute('width')) || 0
  const svgHeight = parseFloat(svgEl?.getAttribute('height')) || 0

  const imageRects = nonGridRects.filter((r) => {
    // Skip rects that match the full SVG dimensions (background)
    if (Math.abs(r.width - svgWidth) < 5 && Math.abs(r.height - svgHeight) < 5) return false
    // Skip rects with near-SVG-width (background variants)
    if (r.width > svgWidth * 0.95 && r.height > svgHeight * 0.95) return false
    // Skip rects with no meaningful id
    if (!r.id) return false
    return true
  })

  // --- Step 5: Convert to grid coordinates ---
  const images = imageRects.map((r) => {
    let { x, y, width, height } = r
    const border = r.stroke != null && r.stroke !== 'none' && r.stroke !== ''

    // Adjust for stroke centering on bordered rects
    if (border && r.strokeWidth > 0) {
      x += r.strokeWidth / 2
      y += r.strokeWidth / 2
      width -= r.strokeWidth
      height -= r.strokeWidth
    }

    const col = Math.round((x - offsetX) / pitch) + 1
    const row = Math.round((y - offsetY) / pitch) + 1
    const colSpan = Math.round(width / pitch)
    const rowSpan = Math.round(height / pitch)

    return {
      id: r.id,
      col,
      row,
      colSpan,
      rowSpan,
      border,
    }
  })

  // Sort top-to-bottom, then left-to-right
  images.sort((a, b) => a.row - b.row || a.col - b.col)

  return { images, error: null }
}
