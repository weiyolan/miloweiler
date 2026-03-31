import { useState, useCallback, useMemo, useEffect } from 'react'
import { set, useClient, useFormValue } from 'sanity'
import {
  Button,
  Dialog,
  Stack,
  Card,
  Text,
  Flex,
  Box,
  Spinner,
  Code,
  useToast,
} from '@sanity/ui'
import { UploadIcon, CheckmarkCircleIcon, CloseCircleIcon, TrashIcon, EditIcon } from '@sanity/icons'
import { parseSvg } from './svgParser'

function generateKey() {
  return Math.random().toString(36).slice(2, 12)
}

function stripExtension(filename) {
  const lastDot = filename.lastIndexOf('.')
  return lastDot > 0 ? filename.substring(0, lastDot) : filename
}

export function ImageImportInput(props) {
  const [open, setOpen] = useState(false)

  // Grid columns from the project document
  const desktopCols = useFormValue(['gridCols', 'lg']) || 24
  const mobileCols = useFormValue(['gridCols', 'sm']) || 9

  // SVG state
  const [desktopResult, setDesktopResult] = useState(null)
  const [mobileResult, setMobileResult] = useState(null)
  const [svgError, setSvgError] = useState(null)

  // Image files (optional — only for new images)
  const [imageFiles, setImageFiles] = useState([])

  // Existing items asset map: baseName → existingItem
  const [existingMap, setExistingMap] = useState(new Map())
  const [loadingAssets, setLoadingAssets] = useState(false)

  // Import state
  const [importing, setImporting] = useState(false)
  const [progress, setProgress] = useState({ current: 0, total: 0 })

  const client = useClient({ apiVersion: '2024-03-14' })
  const toast = useToast()

  // --- Fetch existing item filenames when dialog opens ---

  useEffect(() => {
    if (!open) return
    const items = props.value || []
    if (items.length === 0) {
      setExistingMap(new Map())
      return
    }

    const assetIds = items
      .map((item) => item.image?.asset?._ref)
      .filter(Boolean)

    if (assetIds.length === 0) {
      setExistingMap(new Map())
      return
    }

    setLoadingAssets(true)
    client
      .fetch(
        `*[_type == "sanity.imageAsset" && _id in $ids]{_id, originalFilename}`,
        { ids: assetIds },
      )
      .then((assets) => {
        const assetNameMap = new Map()
        for (const asset of assets) {
          if (asset.originalFilename) {
            assetNameMap.set(asset._id, stripExtension(asset.originalFilename))
          }
        }

        const map = new Map()
        for (const item of items) {
          const ref = item.image?.asset?._ref
          const baseName = assetNameMap.get(ref)
          if (baseName) {
            map.set(baseName, item)
          }
        }
        setExistingMap(map)
      })
      .catch((err) => {
        console.error('Failed to fetch asset filenames:', err)
        setExistingMap(new Map())
      })
      .finally(() => setLoadingAssets(false))
  }, [open, props.value, client])

  // --- SVG handlers ---

  const handleDesktopSvg = useCallback(
    async (e) => {
      const file = e.target.files[0]
      if (!file) return
      const text = await file.text()
      const result = parseSvg(text, desktopCols)
      setDesktopResult(result)
      if (result.error) setSvgError(`Desktop SVG: ${result.error}`)
      else setSvgError(null)
    },
    [desktopCols],
  )

  const handleMobileSvg = useCallback(
    async (e) => {
      const file = e.target.files[0]
      if (!file) return
      const text = await file.text()
      const result = parseSvg(text, mobileCols)
      setMobileResult(result)
      if (result.error) setSvgError(`Mobile SVG: ${result.error}`)
      else setSvgError(null)
    },
    [mobileCols],
  )

  const handleImageFiles = useCallback((e) => {
    setImageFiles(Array.from(e.target.files))
  }, [])

  // --- Matching (3-way: existing items, new files, unmatched) ---

  const matches = useMemo(() => {
    const empty = { existingMatches: [], newMatches: [], unmatchedFiles: [], unmatchedSvg: [] }
    if (!desktopResult?.images?.length || !mobileResult?.images?.length) return empty

    const desktopMap = new Map(desktopResult.images.map((img) => [img.id, img]))
    const mobileMap = new Map(mobileResult.images.map((img) => [img.id, img]))

    // Find all SVG entries present in BOTH desktop and mobile
    const svgEntries = []
    for (const [id, desktop] of desktopMap) {
      const mobile = mobileMap.get(id)
      if (mobile) {
        svgEntries.push({ id, desktop, mobile })
      }
    }

    const existingMatches = []
    const newMatches = []
    const unmatchedSvg = []

    // Build a file map for uploaded files
    const fileMap = new Map()
    for (const file of imageFiles) {
      fileMap.set(stripExtension(file.name), file)
    }

    for (const entry of svgEntries) {
      const existingItem = existingMap.get(entry.id)
      if (existingItem) {
        existingMatches.push({ existingItem, desktop: entry.desktop, mobile: entry.mobile, id: entry.id })
      } else {
        const file = fileMap.get(entry.id)
        if (file) {
          newMatches.push({ file, desktop: entry.desktop, mobile: entry.mobile })
          fileMap.delete(entry.id)
        } else {
          unmatchedSvg.push(entry)
        }
      }
    }

    // Remaining uploaded files that didn't match any SVG entry
    const unmatchedFiles = Array.from(fileMap.entries()).map(([baseName, file]) => ({
      name: file.name,
      hasDesktop: desktopMap.has(baseName),
      hasMobile: mobileMap.has(baseName),
    }))

    return { existingMatches, newMatches, unmatchedFiles, unmatchedSvg }
  }, [desktopResult, mobileResult, imageFiles, existingMap])

  const totalMatches = matches.existingMatches.length + matches.newMatches.length

  // --- Import ---

  const handleImport = useCallback(async () => {
    if (totalMatches === 0) return

    setImporting(true)
    setProgress({ current: 0, total: matches.newMatches.length })

    // Step 1: Update existing items in place
    const existingKeys = new Set(matches.existingMatches.map((m) => m.existingItem._key))
    const updatedItems = (props.value || []).map((item) => {
      const match = matches.existingMatches.find((m) => m.existingItem._key === item._key)
      if (!match) return item
      return {
        ...item,
        border: match.desktop.border || match.mobile.border,
        position: {
          lg: { x: match.desktop.col, y: match.desktop.row, width: match.desktop.colSpan, height: match.desktop.rowSpan },
          sm: { x: match.mobile.col, y: match.mobile.row, width: match.mobile.colSpan, height: match.mobile.rowSpan },
        },
      }
    })

    // Step 2: Upload + create new items
    const newItems = []
    const errors = []

    for (let i = 0; i < matches.newMatches.length; i++) {
      const { file, desktop, mobile } = matches.newMatches[i]
      try {
        const asset = await client.assets.upload('image', file, {
          filename: file.name,
        })

        newItems.push({
          _key: generateKey(),
          _type: 'otherImage',
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: asset._id,
            },
          },
          border: desktop.border || mobile.border,
          position: {
            lg: { x: desktop.col, y: desktop.row, width: desktop.colSpan, height: desktop.rowSpan },
            sm: { x: mobile.col, y: mobile.row, width: mobile.colSpan, height: mobile.rowSpan },
          },
        })
      } catch (err) {
        errors.push(`${file.name}: ${err.message}`)
      }

      setProgress({ current: i + 1, total: matches.newMatches.length })
    }

    // Step 3: Set the full array (updated existing + new)
    props.onChange(set([...updatedItems, ...newItems]))

    // Toast
    const parts = []
    if (matches.existingMatches.length > 0) parts.push(`${matches.existingMatches.length} updated`)
    if (newItems.length > 0) parts.push(`${newItems.length} imported`)
    if (errors.length > 0) parts.push(`${errors.length} failed`)

    toast.push({
      title: parts.join(', '),
      status: errors.length > 0 ? 'warning' : 'success',
      description: errors.length > 0 ? errors.join(', ') : undefined,
    })

    setImporting(false)
    setOpen(false)
    resetState()
  }, [totalMatches, matches, client, props, toast])

  function resetState() {
    setDesktopResult(null)
    setMobileResult(null)
    setImageFiles([])
    setSvgError(null)
  }

  const handleClose = useCallback(() => {
    if (importing) return
    setOpen(false)
    resetState()
  }, [importing])

  const handleDeleteAll = useCallback(() => {
    if (!props.value?.length) return
    if (!window.confirm(`Delete all ${props.value.length} images?`)) return
    props.onChange(set([]))
    toast.push({ title: 'All images deleted', status: 'success' })
  }, [props, toast])

  const desktopParsed = desktopResult?.images?.length ?? 0
  const mobileParsed = mobileResult?.images?.length ?? 0

  // Build import button text
  let importText = 'Import'
  if (importing) {
    importText = 'Importing...'
  } else {
    const parts = []
    if (matches.existingMatches.length > 0) parts.push(`Update ${matches.existingMatches.length}`)
    if (matches.newMatches.length > 0) parts.push(`Import ${matches.newMatches.length} New`)
    importText = parts.length > 0 ? parts.join(' + ') : 'Import 0 Images'
  }

  return (
    <Stack space={3}>
      <Flex gap={2}>
        <Button
          text="Import Images"
          icon={UploadIcon}
          onClick={() => setOpen(true)}
          tone="primary"
          mode="ghost"
          fontSize={1}
        />
        {props.value?.length > 0 && (
          <Button
            text={`Delete All (${props.value.length})`}
            icon={TrashIcon}
            onClick={handleDeleteAll}
            tone="critical"
            mode="ghost"
            fontSize={1}
          />
        )}
      </Flex>

      {open && (
        <Dialog
          header="Import Project Images"
          id="image-import-dialog"
          onClose={handleClose}
          width={1}
          zOffset={1000}
        >
          <Box padding={4}>
            <Stack space={4}>
              {/* Loading existing assets */}
              {loadingAssets && (
                <Card padding={3} radius={2} shadow={1}>
                  <Flex align="center" gap={3}>
                    <Spinner muted />
                    <Text size={1}>Loading existing images...</Text>
                  </Flex>
                </Card>
              )}

              {/* Existing items info */}
              {!loadingAssets && existingMap.size > 0 && (
                <Card padding={3} radius={2} tone="transparent" shadow={1}>
                  <Text size={1} muted>
                    {existingMap.size} existing image(s) available for metadata update
                  </Text>
                </Card>
              )}

              {/* Step 1: Desktop SVG */}
              <Card padding={3} radius={2} shadow={1}>
                <Stack space={3}>
                  <Text weight="semibold" size={1}>
                    1. Desktop SVG ({desktopCols} columns)
                  </Text>
                  <input
                    type="file"
                    accept=".svg"
                    onChange={handleDesktopSvg}
                    disabled={importing}
                    style={{ fontSize: '13px' }}
                  />
                  {desktopResult && !desktopResult.error && (
                    <Text size={1} muted>
                      {desktopParsed} image(s) detected
                    </Text>
                  )}
                </Stack>
              </Card>

              {/* Step 2: Mobile SVG */}
              <Card padding={3} radius={2} shadow={1}>
                <Stack space={3}>
                  <Text weight="semibold" size={1}>
                    2. Mobile SVG ({mobileCols} columns)
                  </Text>
                  <input
                    type="file"
                    accept=".svg"
                    onChange={handleMobileSvg}
                    disabled={importing}
                    style={{ fontSize: '13px' }}
                  />
                  {mobileResult && !mobileResult.error && (
                    <Text size={1} muted>
                      {mobileParsed} image(s) detected
                    </Text>
                  )}
                </Stack>
              </Card>

              {/* Step 3: New image files (optional) */}
              <Card padding={3} radius={2} shadow={1}>
                <Stack space={3}>
                  <Text weight="semibold" size={1}>
                    3. New Image Files (optional)
                  </Text>
                  <Text size={0} muted>
                    Only needed for images not already in the list.
                  </Text>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageFiles}
                    disabled={importing}
                    style={{ fontSize: '13px' }}
                  />
                  {imageFiles.length > 0 && (
                    <Text size={1} muted>
                      {imageFiles.length} file(s) selected
                    </Text>
                  )}
                </Stack>
              </Card>

              {/* SVG parse error */}
              {svgError && (
                <Card padding={3} radius={2} tone="critical" shadow={1}>
                  <Stack space={2}>
                    <Text size={1} weight="semibold">
                      SVG Error
                    </Text>
                    <Code size={1} style={{ whiteSpace: 'pre-wrap' }}>
                      {svgError}
                    </Code>
                  </Stack>
                </Card>
              )}

              {/* Existing matches (updates) */}
              {matches.existingMatches.length > 0 && (
                <Card padding={3} radius={2} tone="primary" shadow={1}>
                  <Stack space={2}>
                    <Text size={1} weight="semibold">
                      {matches.existingMatches.length} existing image(s) to update
                    </Text>
                    {matches.existingMatches.map(({ id, desktop, mobile }) => (
                      <Flex key={id} align="center" gap={2}>
                        <Text size={1}>
                          <EditIcon />
                        </Text>
                        <Text size={1}>
                          {id} — lg({desktop.col},{desktop.row},{desktop.colSpan},{desktop.rowSpan}) sm({mobile.col},{mobile.row},{mobile.colSpan},{mobile.rowSpan})
                          {(desktop.border || mobile.border) ? ' border' : ''}
                        </Text>
                      </Flex>
                    ))}
                  </Stack>
                </Card>
              )}

              {/* New matches (uploads) */}
              {matches.newMatches.length > 0 && (
                <Card padding={3} radius={2} tone="positive" shadow={1}>
                  <Stack space={2}>
                    <Text size={1} weight="semibold">
                      {matches.newMatches.length} new image(s) to import
                    </Text>
                    {matches.newMatches.map(({ file, desktop, mobile }) => (
                      <Flex key={file.name} align="center" gap={2}>
                        <Text size={1}>
                          <CheckmarkCircleIcon />
                        </Text>
                        <Text size={1}>
                          {stripExtension(file.name)} — lg({desktop.col},{desktop.row},{desktop.colSpan},{desktop.rowSpan}) sm({mobile.col},{mobile.row},{mobile.colSpan},{mobile.rowSpan})
                          {(desktop.border || mobile.border) ? ' border' : ''}
                        </Text>
                      </Flex>
                    ))}
                  </Stack>
                </Card>
              )}

              {/* Unmatched files */}
              {matches.unmatchedFiles.length > 0 && (
                <Card padding={3} radius={2} tone="caution" shadow={1}>
                  <Stack space={2}>
                    <Text size={1} weight="semibold">
                      {matches.unmatchedFiles.length} unmatched file(s)
                    </Text>
                    {matches.unmatchedFiles.map(({ name, hasDesktop, hasMobile }) => (
                      <Flex key={name} align="center" gap={2}>
                        <Text size={1}>
                          <CloseCircleIcon />
                        </Text>
                        <Text size={1} muted>
                          {name}
                          {hasDesktop && !hasMobile ? ' (missing in mobile SVG)' : ''}
                          {!hasDesktop && hasMobile ? ' (missing in desktop SVG)' : ''}
                          {!hasDesktop && !hasMobile ? ' (not in any SVG)' : ''}
                        </Text>
                      </Flex>
                    ))}
                  </Stack>
                </Card>
              )}

              {/* Unmatched SVG entries */}
              {matches.unmatchedSvg.length > 0 && (
                <Card padding={3} radius={2} tone="caution" shadow={1}>
                  <Stack space={2}>
                    <Text size={1} weight="semibold">
                      {matches.unmatchedSvg.length} SVG entry(s) without matching image
                    </Text>
                    {matches.unmatchedSvg.map(({ id }) => (
                      <Flex key={id} align="center" gap={2}>
                        <Text size={1}>
                          <CloseCircleIcon />
                        </Text>
                        <Text size={1} muted>
                          {id} — no existing or uploaded image
                        </Text>
                      </Flex>
                    ))}
                  </Stack>
                </Card>
              )}

              {/* Progress */}
              {importing && (
                <Card padding={3} radius={2} shadow={1}>
                  <Flex align="center" gap={3}>
                    <Spinner muted />
                    <Text size={1}>
                      Uploading {progress.current} / {progress.total}...
                    </Text>
                  </Flex>
                </Card>
              )}

              {/* Import button */}
              <Button
                text={importText}
                icon={UploadIcon}
                onClick={handleImport}
                tone="positive"
                disabled={importing || totalMatches === 0}
              />
            </Stack>
          </Box>
        </Dialog>
      )}

      {props.renderDefault(props)}
    </Stack>
  )
}
