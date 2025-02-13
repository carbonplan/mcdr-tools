import React from 'react'
import { Box, Flex, Divider } from 'theme-ui'
import { Badge } from '@carbonplan/components'
import useStore from '../store'
import { getColorForValue, useVariableColormap } from '../utils'

const StorageSection = ({ sx }) => {
  const storageEfficiency = useStore((state) => state.storageEfficiency)
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
    <Flex
      sx={{
        mb: 3,
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 3,
        width: '220px',
      }}
    >
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
      <ValueDisplay
        label='Region efficiency'
        value={currentEfficiency}
        requiresRegionData={true}
      />

      <ValueDisplay
        label='Storage loss'
        value={storageLoss}
        requiresRegionData={false}
      />

      <Divider sx={{ width: 220, mb: 2, mt: -2 }} />
      <ValueDisplay
        label='Net efficiency'
        value={netEfficiency}
        requiresRegionData={true}
        color={getColorForValue(netEfficiency, colormap, currentVariable)}
      />
    </Box>
  )
}

export default StorageSection
