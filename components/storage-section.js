import React from 'react'
import { Box, Slider, Flex, Divider } from 'theme-ui'
import { Row, Column, Badge } from '@carbonplan/components'
import useStore from '../store'

const StorageSection = ({ sx }) => {
  const storageEfficiency = useStore((state) => state.storageEfficiency)
  const setStorageEfficiency = useStore((state) => state.setStorageEfficiency)
  const overviewLineData = useStore((state) => state.overviewLineData)
  const selectedRegion = useStore((state) => state.selectedRegion)
  const hoveredRegion = useStore((state) => state.hoveredRegion)
  const overviewElapsedTime = useStore((state) => state.overviewElapsedTime)

  const activeRegion = selectedRegion ?? hoveredRegion
  const hasRegionData = activeRegion !== null

  const currentEfficiency = hasRegionData
    ? overviewLineData?.[activeRegion]?.data?.[overviewElapsedTime]?.[1] || 0
    : 0

  const carbonRemoved = 100 // Hard coded value for now
  const carbonRemovedNet = -1 * carbonRemoved * storageEfficiency
  const carbonLost = carbonRemoved * (1 - storageEfficiency)
  const carbonAbsorbed = -1 * carbonRemoved * currentEfficiency
  const atmosphericNet = carbonRemovedNet + carbonAbsorbed + carbonLost

  const formatValue = (value) => {
    const fixed = value.toFixed(0)
    return value > 0 ? `+${fixed}` : fixed
  }

  const ValueDisplay = ({
    label,
    value,
    requiresRegionData,
    secondaryValue,
  }) => (
    <Flex sx={{ mb: 3, alignItems: 'center', gap: 3 }}>
      <Box sx={{ ...sx.label, flex: 'none', width: '140px' }}>{label}</Box>
      <Box sx={{ flex: 'none' }}>
        {!requiresRegionData || hasRegionData ? (
          <Badge>
            {formatValue(value)}
            {secondaryValue !== undefined && (
              <Box as='span' sx={{ color: 'secondary', ml: 1 }}>
                / {formatValue(secondaryValue)}
              </Box>
            )}
          </Badge>
        ) : (
          <Badge color='secondary' sx={{ color: 'secondary' }}>
            --
          </Badge>
        )}
      </Box>
    </Flex>
  )

  return (
    <Box sx={{ mt: [4, 4, 4, 5] }}>
      <Box sx={sx.heading}>Storage</Box>
      <Flex sx={{ mb: 4, alignItems: 'center', gap: 2 }}>
        <Box sx={{ ...sx.label, flex: 'none', width: 'auto' }}>
          Storage efficiency
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

      <Box sx={{ mt: 4 }}>
        <ValueDisplay
          label='Carbon removed'
          value={carbonRemovedNet}
          secondaryValue={-carbonRemoved}
          requiresRegionData={false}
        />
        <ValueDisplay
          label='Carbon absorbed'
          value={carbonAbsorbed}
          requiresRegionData={true}
        />
        <ValueDisplay
          label='Carbon lost'
          value={carbonLost}
          requiresRegionData={false}
        />
        <Divider sx={{ width: '60%', mb: 2, mt: -2 }} />
        <ValueDisplay
          label='Atmospheric net'
          value={atmosphericNet}
          requiresRegionData={true}
        />
      </Box>
    </Box>
  )
}

export default StorageSection
