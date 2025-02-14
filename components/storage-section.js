import React from 'react'
import { Box, Flex, Divider } from 'theme-ui'
import { Badge } from '@carbonplan/components'
import useStore from '../store'

const StorageSection = ({ sx }) => {
  const storageEfficiency = useStore((state) => state.storageEfficiency)
  const overviewLineData = useStore((state) => state.overviewLineData)
  const selectedRegion = useStore((state) => state.selectedRegion)
  const hoveredRegion = useStore((state) => state.hoveredRegion)
  const overviewElapsedTime = useStore((state) => state.overviewElapsedTime)

  const activeRegion = selectedRegion ?? hoveredRegion
  const hasRegionData = activeRegion !== null

  const currentEfficiency = hasRegionData
    ? overviewLineData?.[activeRegion]?.data?.[overviewElapsedTime]?.[1] || 0
    : 0
  const storageLoss = 1 - storageEfficiency
  const netEfficiency = currentEfficiency + storageEfficiency - 1

  const ValueDisplay = ({ label, value, requiresRegionData, color, math }) => (
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
          <>
            {math && (
              <Box as='span' sx={{ mr: 1 }}>
                {math}
              </Box>
            )}
            <Badge sx={{ bg: color }}>{value.toFixed(2)}</Badge>
          </>
        ) : (
          <Badge sx={{ color: 'secondary' }}>----</Badge>
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
        math={'-'}
      />
      <Divider sx={{ width: 220, mb: 2, mt: -2 }} />
      <ValueDisplay
        label='Net efficiency'
        value={netEfficiency}
        requiresRegionData={true}
      />
    </Box>
  )
}

export default StorageSection
