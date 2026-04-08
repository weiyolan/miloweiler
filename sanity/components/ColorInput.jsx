import { useCallback } from 'react'
import { set, unset } from 'sanity'

const SWATCH_SIZE = 64

export function ColorInput(props) {
  const { value, onChange, elementProps } = props

  const handlePickerChange = useCallback(
    (event) => {
      const hex = event.target.value
      onChange(hex ? set(hex) : unset())
    },
    [onChange]
  )

  const handleTextChange = useCallback(
    (event) => {
      const hex = event.target.value
      onChange(hex ? set(hex) : unset())
    },
    [onChange]
  )

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <input
        type="color"
        value={value || '#000000'}
        onChange={handlePickerChange}
        style={{
          width: SWATCH_SIZE,
          height: SWATCH_SIZE,
          padding: 0,
          border: '2px solid #333',
          borderRadius: '6px',
          cursor: 'pointer',
          backgroundColor: 'transparent',
        }}
      />
      <input
        {...elementProps}
        type="text"
        value={value || ''}
        onChange={handleTextChange}
        placeholder="#000000"
        style={{
          fontFamily: 'monospace',
          fontSize: '16px',
          padding: '8px 12px',
          border: '1px solid #333',
          borderRadius: '4px',
          backgroundColor: 'transparent',
          color: 'inherit',
          width: '140px',
        }}
      />
      {/* {value && (
        <div
          style={{
            width: SWATCH_SIZE,
            height: SWATCH_SIZE,
            backgroundColor: value,
            borderRadius: '6px',
            border: '2px solid #333',
            flexShrink: 0,
          }}
        />
      )} */}
    </div>
  )
}
