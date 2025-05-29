import React, { useMemo } from 'react'
import { Box, Flex } from 'theme-ui'
import { Badge, Column, Row } from '@carbonplan/components'
import useStore from '../store'
import {
  createCombinedColormap,
  getColorForValue,
  useVariableColormap,
} from '../utils'
import { useThemedColormap } from '@carbonplan/colormaps'
import TooltipWrapper from './tooltip'

const formatNumber = (value, decimals = 2) => {
  const formatted = Number(value).toFixed(decimals)
  return value > 0 ? `${formatted}` : formatted
}

const StorageSection = ({ sx }) => {
  const storageLoss = useStore((state) => state.storageLoss)
  const overviewLineData = useStore((state) => state.overviewLineData)
  const selectedRegion = useStore((state) => state.selectedRegion)
  const hoveredRegion = useStore((state) => state.hoveredRegion)
  const overviewElapsedTime = useStore((state) => state.overviewElapsedTime)
  const currentVariable = useStore((state) => state.currentVariable)
  const showStorageLoss = useStore((state) => state.showStorageLoss)

  const activeRegion = selectedRegion ?? hoveredRegion
  const hasRegionData = activeRegion !== null

  const colormap = useVariableColormap()
  const negativeColormap = useThemedColormap('reds', {
    format: 'hex',
    count: colormap.length,
  })
  const combinedColormap = createCombinedColormap(
    colormap,
    negativeColormap,
    storageLoss
  )

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

  const color = getColorForValue(
    currentEfficiency,
    combinedColormap,
    currentVariable
  )

  if (!showStorageLoss) return null

  return (
    <>
      <TooltipWrapper
        sx={{
          justifyContent: 'flex-start',
          gap: 2,
          alignItems: 'center',
        }}
        tooltip={
          <Box sx={{ color: 'secondary', fontSize: 1 }}>
            <Box as='span' sx={{ color: 'primary' }}>
              Reuptake
            </Box>{' '}
            is the fraction of removed CO₂ that is reabsorbed by the ocean.{' '}
            <Box as='span' sx={{ color: 'primary' }}>
              Storage loss
            </Box>{' '}
            is the fraction of removed CO₂ lost to the atmosphere during
            transport, storage, or use. Combined, they represent the{' '}
            <Box as='span' sx={{ color: 'primary' }}>
              net
            </Box>{' '}
            efficiency. Change the storage loss using the slider below.
          </Box>
        }
      >
        <Box sx={{ ...sx.heading, mb: 0 }}>EFFICIENCY COMPONENTS</Box>
      </TooltipWrapper>
      <Box sx={{ ...sx.label, color: 'primary', mt: [3, 3, 3, 4] }}>
        <Row columns={[3]}>
          <Column
            start={1}
            width={[1, 1, 1, 1]}
            sx={{ ...sx.label, color: 'primary' }}
          >
            <Flex
              sx={{ justifyContent: 'space-between', alignItems: 'baseline' }}
            >
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
                alignItems: 'baseline',
              }}
            >
              <Box as='span' sx={{ color: 'primary' }}>
                reuptake
              </Box>
              <Box as='span' sx={{ color: 'primary', fontSize: 2 }}>
                -
              </Box>
              <Box as='span' sx={{ color: 'primary' }}>
                Storage Loss
              </Box>
            </Flex>
          </Column>
        </Row>
        <Row columns={[3]} sx={{ mt: 3 }}>
          <Column start={[1, 1, 1, 1]} width={[1, 1, 1, 1]}>
            <Flex sx={{ justifyContent: 'space-between' }}>
              <Badge
                sx={{
                  color: 'primary',
                  bg: hasRegionData ? color : 'muted',
                }}
              >
                {hasRegionData ? formatNumber(netEfficiency) : '----'}
              </Badge>
              <Box as='span' sx={{ color: 'primary', fontSize: 2 }}>
                =
              </Box>
            </Flex>
          </Column>
          <Column start={[2, 2, 2, 2]} width={[2]}>
            <Flex sx={{ gap: 2 }}>
              <Badge sx={{ color: 'primary' }}>
                {hasRegionData ? currentEfficiency.toFixed(2) : '----'}
              </Badge>
              <Box as='span' sx={{ color: 'primary', fontSize: 2 }}>
                {' '}
                -{' '}
              </Box>
              <Badge sx={{ color: 'primary' }}>{storageLoss.toFixed(2)}</Badge>
            </Flex>
          </Column>
        </Row>
      </Box>
    </>
  )
}

export default StorageSection
