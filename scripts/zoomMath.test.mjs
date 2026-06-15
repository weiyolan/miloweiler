import { containedRect, clampTranslate, anchoredZoom, MIN_SCALE, MAX_SCALE } from '../src/utils/zoomMath.js'

let failed = 0
const approx = (a, b, t = 1e-6) => Math.abs(a - b) <= t
function eq(name, got, want, t = 1e-6) {
  const ok = approx(got, want, t)
  if (!ok) { failed++; console.error(`FAIL ${name}: got ${got}, want ${want}`) }
  else console.log(`ok   ${name}`)
}

// --- containedRect: square image in a wide box is height-bound and centred horizontally
{
  const r = containedRect(1000, 500, 1)
  eq('containedRect.iw', r.iw, 500)
  eq('containedRect.ih', r.ih, 500)
  eq('containedRect.ox', r.ox, 250)
  eq('containedRect.oy', r.oy, 0)
}

// --- clampTranslate centres at 1x
{
  const c = clampTranslate(1000, 500, 1, 1, 9999, 9999)
  eq('clamp@1x.x', c.x, 0)
  eq('clamp@1x.y', c.y, 0)
}

// --- clampTranslate at 2x: image exactly covers width (centred), height pans within bounds
{
  const c = clampTranslate(1000, 500, 1, 2, 9999, 9999) // push far positive -> hits maxY=0, x centred
  eq('clamp@2x.x', c.x, -500)
  eq('clamp@2x.y(maxY)', c.y, 0)
  const c2 = clampTranslate(1000, 500, 1, 2, -9999, -9999) // push far negative -> minY
  eq('clamp@2x.y(minY)', c2.y, -500)
  // a value already inside the range is left untouched on the panning axis
  const c3 = clampTranslate(1000, 500, 1, 2, -200, -120)
  eq('clamp@2x.y(passthrough)', c3.y, -120)
}

// --- anchoredZoom keeps the cursor point fixed
{
  const z = anchoredZoom(1, 0, 0, 300, 200, 2)
  eq('anchored.s', z.s, 2)
  // box point 300 maps to same screen position before & after
  const before = 0 + 1 * ((300 - 0) / 1) // = 300
  const after = z.x + z.s * ((300 - 0) / 1)
  eq('anchored.fixedX', after, before)
}

// --- scale is clamped to [MIN,MAX]
{
  eq('anchored.maxClamp', anchoredZoom(1, 0, 0, 0, 0, 99).s, MAX_SCALE)
  eq('anchored.minClamp', anchoredZoom(2, 0, 0, 0, 0, 0.1).s, MIN_SCALE)
}

// --- portrait image (ar<1) in a tall box is width-bound
{
  const r = containedRect(400, 1000, 0.5) // ar 0.5 -> W/H=0.4 < ar -> width-bound
  eq('portrait.iw', r.iw, 400)
  eq('portrait.ih', r.ih, 800)
  eq('portrait.oy', r.oy, 100)
}

console.log(failed === 0 ? '\nALL MATH TESTS PASSED' : `\n${failed} MATH TEST(S) FAILED`)
process.exit(failed === 0 ? 0 : 1)
