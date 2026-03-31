import { useState, useEffect } from 'react'
import { useClient } from 'sanity'

const SIZE_QUERY = `*[_type == "project" && _id == $id][0]{
  "mainImageSize": mainImage.image.asset->size,
  "otherImagesSize": otherImages[].image.asset->size
}`

export function ProjectPreview(props) {
  const { _id, _rev, subtitle, renderDefault, ...rest } = props
  const client = useClient({ apiVersion: '2024-03-14' })
  const [sizeMB, setSizeMB] = useState(null)

  useEffect(() => {
    if (!_id) return

    let cancelled = false

    client.fetch(SIZE_QUERY, { id: _id }).then((result) => {
      if (cancelled) return
      if (!result) { setSizeMB(null); return }

      const mainSize = result.mainImageSize || 0
      const otherSizes = result.otherImagesSize || []
      const totalBytes = mainSize + otherSizes.reduce((sum, s) => sum + (s || 0), 0)
      setSizeMB(Math.round(totalBytes / (1024 * 1024)))
    }).catch(() => {
      if (!cancelled) setSizeMB(null)
    })

    return () => { cancelled = true }
  }, [_id, _rev, client])

  const newSubtitle = sizeMB !== null && sizeMB > 0
    ? `${subtitle} — ${sizeMB} MB`
    : subtitle

  return renderDefault({
    ...rest,
    subtitle: newSubtitle,
    renderDefault,
  })
}
