import { useState, useCallback, useMemo } from 'react'
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
import { UploadIcon, CheckmarkCircleIcon, CloseCircleIcon, TrashIcon } from '@sanity/icons'
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

  // Image files
  const [imageFiles, setImageFiles] = useState([])

  // Import state
  const [importing, setImporting] = useState(false)
  const [progress, setProgress] = useState({ current: 0, total: 0 })

  const client = useClient({ apiVersion: '2024-03-14' })
  const toast = useToast()

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

  // --- Matching ---

  const matches = useMemo(() => {
    if (!desktopResult?.images?.length || !mobileResult?.images?.length || !imageFiles.length) {
      return { matched: [], unmatchedFiles: [], unmatchedDesktop: [], unmatchedMobile: [] }
    }

    const desktopMap = new Map(desktopResult.images.map((img) => [img.id, img]))
    const mobilMap = new Map(mobileResult.images.map((img) => [img.id, img]))

    const matched = []
    const unmatchedFiles = []

    for (const file of imageFiles) {
      const baseName = stripExtension(file.name)
      const desktop = desktopMap.get(baseName)
      const mobile = mobilMap.get(baseName)

      if (desktop && mobile) {
        matched.push({ file, desktop, mobile })
        desktopMap.delete(baseName)
        mobilMap.delete(baseName)
      } else {
        unmatchedFiles.push({
          name: file.name,
          hasDesktop: !!desktop,
          hasMobile: !!mobile,
        })
      }
    }

    return {
      matched,
      unmatchedFiles,
      unmatchedDesktop: Array.from(desktopMap.values()),
      unmatchedMobile: Array.from(mobilMap.values()),
    }
  }, [desktopResult, mobileResult, imageFiles])

  // --- Import ---

  const handleImport = useCallback(async () => {
    if (matches.matched.length === 0) return

    setImporting(true)
    setProgress({ current: 0, total: matches.matched.length })

    const newItems = []
    const errors = []

    for (let i = 0; i < matches.matched.length; i++) {
      const { file, desktop, mobile } = matches.matched[i]
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
            lg: {
              x: desktop.col,
              y: desktop.row,
              width: desktop.colSpan,
              height: desktop.rowSpan,
            },
            sm: {
              x: mobile.col,
              y: mobile.row,
              width: mobile.colSpan,
              height: mobile.rowSpan,
            },
          },
        })
      } catch (err) {
        errors.push(`${file.name}: ${err.message}`)
      }

      setProgress({ current: i + 1, total: matches.matched.length })
    }

    if (newItems.length > 0) {
      const existing = props.value || []
      props.onChange(set([...existing, ...newItems]))
    }

    if (errors.length > 0) {
      toast.push({
        title: `Imported ${newItems.length} images (${errors.length} failed)`,
        status: 'warning',
        description: errors.join(', '),
      })
    } else {
      toast.push({
        title: `Imported ${newItems.length} images`,
        status: 'success',
      })
    }

    setImporting(false)
    setOpen(false)
    resetState()
  }, [matches, client, props, toast])

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

              {/* Step 3: Image files */}
              <Card padding={3} radius={2} shadow={1}>
                <Stack space={3}>
                  <Text weight="semibold" size={1}>
                    3. Select Image Files
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

              {/* Match preview */}
              {matches.matched.length > 0 && (
                <Card padding={3} radius={2} tone="positive" shadow={1}>
                  <Stack space={2}>
                    <Text size={1} weight="semibold">
                      {matches.matched.length} matched
                    </Text>
                    {matches.matched.map(({ file, desktop, mobile }) => (
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
                text={
                  importing
                    ? 'Importing...'
                    : `Import ${matches.matched.length} Image${matches.matched.length !== 1 ? 's' : ''}`
                }
                icon={UploadIcon}
                onClick={handleImport}
                tone="positive"
                disabled={importing || matches.matched.length === 0}
              />
            </Stack>
          </Box>
        </Dialog>
      )}

      {props.renderDefault(props)}
    </Stack>
  )
}
