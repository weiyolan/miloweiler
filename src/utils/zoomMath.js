// Pure geometry helpers for the photo focus/zoom layer (ZoomableImage).
// Kept dependency-free so they can be unit-tested in isolation.

export const MIN_SCALE = 1
export const MAX_SCALE = 4
export const DOUBLE_TAP_SCALE = 2.5

// The object-fit:contain rectangle of an image with aspect ratio `ar` (w/h)
// inside a `W`×`H` box, plus its top-left offset within that box.
export function containedRect(W, H, ar) {
  if (!ar) return { iw: W, ih: H, ox: 0, oy: 0 } // no metadata: treat as filling the box
  let iw, ih
  if (H > 0 && W / H > ar) { ih = H; iw = H * ar } else { iw = W; ih = W / ar }
  return { iw, ih, ox: (W - iw) / 2, oy: (H - ih) / 2 }
}

// Clamp a translation (transform-origin 0,0; transform: translate(x,y) scale(s))
// so the scaled image always covers the box; centre it on any axis where the
// scaled image is smaller than the box.
export function clampTranslate(W, H, ar, s, x, y) {
  const { iw, ih, ox, oy } = containedRect(W, H, ar)
  const sw = s * iw, sh = s * ih
  let nx, ny
  if (sw <= W) nx = (W - s * (2 * ox + iw)) / 2
  else nx = Math.min(-s * ox, Math.max(W - s * ox - sw, x))
  if (sh <= H) ny = (H - s * (2 * oy + ih)) / 2
  else ny = Math.min(-s * oy, Math.max(H - s * oy - sh, y))
  return { x: nx, y: ny }
}

// New (unclamped) transform when zooming to `nextScale` while keeping the box
// point (cx,cy) — measured from the box top-left — pinned under the cursor.
export function anchoredZoom(s, x, y, cx, cy, nextScale, min = MIN_SCALE, max = MAX_SCALE) {
  const ns = Math.min(max, Math.max(min, nextScale))
  const k = ns / s
  return { s: ns, x: cx - k * (cx - x), y: cy - k * (cy - y) }
}
