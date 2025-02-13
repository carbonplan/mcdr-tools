import React from 'react'
import { Box, Slider, Flex, Divider } from 'theme-ui'
import { Row, Column, Badge } from '@carbonplan/components'
import useStore from '../store'
import { getColorForValue, useVariableColormap } from '../utils'

const StorageSection = ({ sx }) => {
  const storageEfficiency = useStore((state) => state.storageEfficiency)
  const setStorageEfficiency = useStore((state) => state.setStorageEfficiency)
  const overviewLineData = useStore((state) => state.overviewLineData)
  const selectedRegion = useStore((state) => state.selectedRegion)
  const hoveredRegion = useStore((state) => state.hoveredRegion)
  const overviewElapsedTime = useStore((state) => state.overviewElapsedTime)
  const currentVariable = useStore((state) => state.currentVariable)
  const colormap = useVariableColormap()

  const activeRegion = selectedRegion ?? hoveredRegion
  const hasRegionData = activeRegion !== null

  const currentEfficiency = hasRegionData
    ? overviewLineData?.[activeRegion]?.data?.[overviewElapsedTime]?.[1] || 0
    : 0
  const storageLoss = (1 - storageEfficiency) * -1
  const netEfficiency = currentEfficiency + storageEfficiency - 1

  const formatValue = (value) => {
    const fixed = value.toFixed(2)
    return value >= 0 ? `+${fixed}` : fixed
  }

  const ValueDisplay = ({ label, value, requiresRegionData, color }) => (
    <Flex sx={{ mb: 3, alignItems: 'center', gap: 3 }}>
      <Box sx={{ ...sx.label, flex: 'none' }}>{label}</Box>
      <Box sx={{ flex: 'none' }}>
        {!requiresRegionData || hasRegionData ? (
          <Badge sx={{ bg: color }}>{formatValue(value)}</Badge>
        ) : (
          <Badge sx={{ color: 'secondary' }}>-----</Badge>
        )}
      </Box>
    </Flex>
  )

  return (
    <Box sx={{ mt: [4, 4, 4, 5] }}>
      <Box sx={sx.heading}>Storage</Box>
      <Flex sx={{ mb: 4, alignItems: 'center', gap: 2 }}>
        <Box sx={{ ...sx.label, flex: 'none', width: 'auto' }}>
          Storage durability
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Slider
            value={storageEfficiency}
            onChange={(e) => setStorageEfficiency(parseFloat(e.target.value))}
            min={0}
            max={1}
            step={0.01}
            sx={{
              color: 'primary',
            }}
          />
        </Box>
        <Box
          sx={{
            ...sx.description,
            flex: 'none',
            fontFamily: 'mono',
          }}
        >
          {(storageEfficiency * 100).toFixed(0)}%
        </Box>
      </Flex>
      <Flex sx={{ justifyContent: 'space-between' }}>
        <ValueDisplay
          label='Region efficiency'
          value={currentEfficiency}
          requiresRegionData={true}
        />
        <Box sx={{ fontSize: 4, fontFamily: 'mono', color: 'secondary' }}>
          {' '}
          +{' '}
        </Box>
        <ValueDisplay
          label='Storage loss'
          value={storageLoss}
          requiresRegionData={false}
        />
      </Flex>

      <Divider sx={{ mb: 2, mt: -2 }} />
      <Flex sx={{ justifyContent: 'flex-end' }}>
        <ValueDisplay
          label='Net efficiency'
          value={netEfficiency}
          requiresRegionData={true}
          color={
            netEfficiency > 0
              ? getColorForValue(netEfficiency, colormap, currentVariable)
              : 'red'
          }
        />
      </Flex>
    </Box>
  )
}

export default StorageSection
