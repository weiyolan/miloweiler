import { useState, useEffect, useCallback, useRef } from 'react'
import { set, unset, useClient, useFormValue } from 'sanity'
import { Card, Text, Flex, Stack, Spinner, Box, Badge } from '@sanity/ui'

const THUMB_SIZE = 80
const PREVIEW_WIDTH = 320

export function ImagePickerInput(props) {
  const { value, onChange, path } = props

  const parentPath = path.slice(0, -1)
  const projectRef = useFormValue([...parentPath, 'project', '_ref'])

  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const prevProjectRef = useRef(projectRef)

  const client = useClient({ apiVersion: '2024-03-14' })

  const selectedRef = value?.asset?._ref

  // Clear image selection when project changes
  useEffect(() => {
    if (prevProjectRef.current && prevProjectRef.current !== projectRef) {
      onChange(unset())
    }
    prevProjectRef.current = projectRef
  }, [projectRef, onChange])

  // Fetch project images when project ref changes
  useEffect(() => {
    if (!projectRef) {
      setImages([])
      return
    }

    setLoading(true)
    client
      .fetch(
        `*[_type == "project" && _id == $id][0]{
          mainImage{image{asset->{_id, url}}},
          otherImages[]{image{asset->{_id, url}}}
        }`,
        { id: projectRef }
      )
      .then((project) => {
        if (!project) {
          setImages([])
          return
        }

        const result = []

        if (project.mainImage?.image?.asset) {
          result.push({
            assetId: project.mainImage.image.asset._id,
            url: project.mainImage.image.asset.url,
            isMain: true,
          })
        }

        if (project.otherImages) {
          for (const item of project.otherImages) {
            if (item.image?.asset) {
              result.push({
                assetId: item.image.asset._id,
                url: item.image.asset.url,
                isMain: false,
              })
            }
          }
        }

        setImages(result)
      })
      .catch(() => setImages([]))
      .finally(() => setLoading(false))
  }, [projectRef, client])

  const handleSelect = useCallback(
    (assetId) => {
      onChange(
        set({
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: assetId,
          },
        })
      )
    },
    [onChange]
  )

  const handleDeselect = useCallback(() => {
    onChange(unset())
  }, [onChange])

  if (!projectRef) {
    return (
      <Card padding={3} tone="transparent" border radius={2}>
        <Text size={1} muted>
          Select a project first to choose an image.
        </Text>
      </Card>
    )
  }

  if (loading) {
    return (
      <Card padding={4} tone="transparent">
        <Flex align="center" gap={3}>
          <Spinner muted />
          <Text size={1} muted>
            Loading project images…
          </Text>
        </Flex>
      </Card>
    )
  }

  if (images.length === 0) {
    return (
      <Card padding={3} tone="caution" border radius={2}>
        <Text size={1}>No images found in the selected project.</Text>
      </Card>
    )
  }

  const selectedImage = selectedRef
    ? images.find((img) => img.assetId === selectedRef)
    : null

  return (
    <Stack space={3}>
      {/* Selected image preview */}
      {selectedImage && (
        <Card padding={2} tone="positive" border radius={2}>
          <Stack space={2}>
            <Flex align="center" justify="space-between">
              <Text size={1} weight="semibold">
                Selected image
              </Text>
              <button
                type="button"
                onClick={handleDeselect}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'inherit',
                  textDecoration: 'underline',
                  fontSize: '13px',
                  padding: 0,
                }}
              >
                Clear
              </button>
            </Flex>
            <img
              src={`${selectedImage.url}?w=${PREVIEW_WIDTH * 2}&fit=max`}
              alt="Selected"
              style={{
                width: '100%',
                maxWidth: PREVIEW_WIDTH,
                height: 'auto',
                borderRadius: '4px',
                display: 'block',
              }}
            />
          </Stack>
        </Card>
      )}

      {/* Thumbnail grid */}
      <Card padding={2} border radius={2}>
        <Stack space={2}>
          <Text size={1} weight="semibold">
            Choose an image
          </Text>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(auto-fill, minmax(${THUMB_SIZE}px, 1fr))`,
              gap: '6px',
            }}
          >
            {images.map((img) => {
              const isSelected = selectedRef === img.assetId
              return (
                <button
                  key={img.assetId}
                  type="button"
                  onClick={() => handleSelect(img.assetId)}
                  style={{
                    position: 'relative',
                    padding: 0,
                    border: isSelected ? '3px solid #4100A4' : '2px solid transparent',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    background: 'none',
                    outline: 'none',
                    aspectRatio: '1',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={`${img.url}?w=${THUMB_SIZE * 2}&h=${THUMB_SIZE * 2}&fit=crop`}
                    alt=""
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      borderRadius: '2px',
                    }}
                  />
                  {img.isMain && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '3px',
                        left: '3px',
                        background: '#4100A4',
                        color: '#fff',
                        fontSize: '9px',
                        fontWeight: 700,
                        padding: '1px 4px',
                        borderRadius: '2px',
                        lineHeight: '14px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}
                    >
                      Main
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </Stack>
      </Card>
    </Stack>
  )
}
