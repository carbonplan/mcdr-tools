import React, { useMemo } from 'react'
import { Box, Flex, Divider } from 'theme-ui'
import { Badge } from '@carbonplan/components'
import useStore from '../store'

const formatNumber = (value, decimals = 2) => {
  const formatted = Number(value).toFixed(decimals)
  return value > 0 ? `+${formatted}` : formatted
}

const StorageSection = ({ sx }) => {
  const storageEfficiency = useStore((state) => state.storageEfficiency)
  const overviewLineData = useStore((state) => state.overviewLineData)
  const selectedRegion = useStore((state) => state.selectedRegion)
  const hoveredRegion = useStore((state) => state.hoveredRegion)
  const overviewElapsedTime = useStore((state) => state.overviewElapsedTime)

  const activeRegion = selectedRegion ?? hoveredRegion
  const hasRegionData = activeRegion !== null

  const { currentEfficiency, storageLoss, netEfficiency } = useMemo(() => {
    if (!hasRegionData) {
      return {
        currentEfficiency: 0,
        storageLoss: 0,
        netEfficiency: 0,
      }
    }

    const currentEfficiency =
      overviewLineData?.[activeRegion]?.data?.[overviewElapsedTime]?.[1] || 0
    const storageLoss = 1 - storageEfficiency
    const netEfficiency = currentEfficiency + storageEfficiency - 1

    return {
      currentEfficiency,
      storageLoss,
      netEfficiency,
    }
  }, [
    hasRegionData,
    activeRegion,
    overviewLineData,
    overviewElapsedTime,
    storageEfficiency,
  ])

  return (
    <Box sx={{ ...sx.label, color: 'primary', mt: [4, 4, 4, 5] }}>
      <Flex sx={{ flexDirection: 'column', gap: 2 }}>
        <Flex sx={{ alignItems: 'center', gap: 2 }}>
          <Flex
            sx={{
              flexDirection: 'column',
              gap: 1,
              alignItems: 'center',
              minWidth: 60,
            }}
          >
            <Box>Total</Box>
            <Box>
              <Badge sx={{ color: 'primary' }}>
                {hasRegionData ? formatNumber(netEfficiency) : '----'}
              </Badge>
            </Box>
          </Flex>
          <Box sx={{ fontSize: 3 }}>=</Box>
          <Flex sx={{ flexDirection: 'column', gap: 1, alignItems: 'center' }}>
            <Box>
              <Box as='span' sx={{ color: 'green' }}>
                air-sea exchange
              </Box>
            </Box>
            <Box>
              <Badge sx={{ color: 'green' }}>
                {hasRegionData ? currentEfficiency.toFixed(2) : '----'}
              </Badge>
            </Box>
          </Flex>
          <Box sx={{ fontSize: 3 }}>-</Box>
          <Flex sx={{ flexDirection: 'column', gap: 1, alignItems: 'center' }}>
            <Box>
              <Box as='span' sx={{ color: 'red' }}>
                Storage Loss
              </Box>
            </Box>
            <Box>
              <Badge sx={{ color: 'red' }}>{storageLoss.toFixed(2)}</Badge>
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
}

export default StorageSection
