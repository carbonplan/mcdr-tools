import React, { useMemo } from 'react'
import { Box, Flex } from 'theme-ui'
import { Badge, Column, Row } from '@carbonplan/components'
import useStore from '../store'

const formatNumber = (value, decimals = 2) => {
  const formatted = Number(value).toFixed(decimals)
  return value > 0 ? `+${formatted}` : formatted
}

const StorageSection = ({ sx }) => {
  const storageLoss = useStore((state) => state.storageLoss)
  const overviewLineData = useStore((state) => state.overviewLineData)
  const selectedRegion = useStore((state) => state.selectedRegion)
  const hoveredRegion = useStore((state) => state.hoveredRegion)
  const overviewElapsedTime = useStore((state) => state.overviewElapsedTime)

  const activeRegion = selectedRegion ?? hoveredRegion
  const hasRegionData = activeRegion !== null

  const { currentEfficiency, netEfficiency } = useMemo(() => {
    if (!hasRegionData) {
      return {
        currentEfficiency: 0,
        netEfficiency: 0,
      }
    }

    const currentEfficiency =
      overviewLineData?.[activeRegion]?.data?.[overviewElapsedTime]?.[1] || 0
    const netEfficiency = currentEfficiency - storageLoss

    return {
      currentEfficiency,
      netEfficiency,
    }
  }, [
    hasRegionData,
    activeRegion,
    overviewLineData,
    overviewElapsedTime,
    storageLoss,
  ])

  return (
    <>
      <Box sx={{ ...sx.heading }}>EFFICIENCY COMPONENTS</Box>
      <Box sx={{ ...sx.label, color: 'primary', mt: [4, 4, 4, 5] }}>
        <Row columns={[3]} sx={{ mt: 3 }}>
          <Column
            start={1}
            width={[1, 1, 1, 1]}
            sx={{ ...sx.label, color: 'primary' }}
          >
            <Flex sx={{ justifyContent: 'space-between' }}>
              <Box as='span'>NET</Box>
              <Box as='span' sx={{ color: 'primary', fontSize: 2 }}>
                =
              </Box>
            </Flex>
          </Column>
          <Column start={[2, 2, 2, 2]} width={[2]}>
            <Flex
              sx={{
                flexWrap: 'wrap',
                gap: 2,
                alignItems: 'center',
              }}
            >
              <Box as='span' sx={{ color: 'secondary' }}>
                reuptake
              </Box>
              <Box as='span' sx={{ color: 'primary', fontSize: 2 }}>
                -
              </Box>
              <Box as='span' sx={{ color: 'secondary' }}>
                Storage Loss
              </Box>
            </Flex>
          </Column>
        </Row>
        <Row columns={[3]} sx={{ mt: 3 }}>
          <Column start={[1, 1, 1, 1]} width={[1, 1, 1, 1]}>
            <Flex sx={{ justifyContent: 'space-between' }}>
              <Badge sx={{ color: 'primary' }}>
                {hasRegionData ? formatNumber(netEfficiency) : '----'}
              </Badge>
              <Box as='span' sx={{ color: 'primary', fontSize: 2 }}>
                =
              </Box>
            </Flex>
          </Column>
          <Column start={[2, 2, 2, 2]} width={[2]}>
            <Flex sx={{ gap: 2 }}>
              <Badge sx={{ color: 'secondary' }}>
                {hasRegionData ? currentEfficiency.toFixed(2) : '----'}
              </Badge>
              <Box as='span' sx={{ color: 'primary', fontSize: 2 }}>
                {' '}
                -{' '}
              </Box>
              <Badge sx={{ color: 'secondary' }}>
                {storageLoss.toFixed(2)}
              </Badge>
            </Flex>
          </Column>
        </Row>
      </Box>
    </>
  )
}

export default StorageSection
