import React, { useState } from 'react'
import { Box, Flex } from 'theme-ui'
import { Slider } from '@carbonplan/components'
import useStore from '../store'
import { Tooltip } from './tooltip'
import AnimateHeight from 'react-animate-height'

const sx = {
  label: {
    fontFamily: 'mono',
    letterSpacing: 'mono',
    textTransform: 'uppercase',
    color: 'secondary',
    fontSize: [1, 1, 1, 2],
  },
}

const StorageLoss = () => {
  const storageLoss = useStore((state) => state.storageLoss)
  const setStorageLoss = useStore((state) => state.setStorageLoss)
  const showStorageLoss = useStore((state) => state.showStorageLoss)

  const [expanded, setExpanded] = useState(false)

  const handleChange = (e) => {
    const value = Math.min(1, Math.max(0, parseFloat(e.target.value)))
    setStorageLoss(value)
  }

  return (
    <>
      <Flex sx={{ gap: [3, 4, 4, 5], alignItems: 'center', width: '100%' }}>
        <Box
          sx={{ ...sx.label, color: showStorageLoss ? 'secondary' : 'muted' }}
        >
          Storage loss
        </Box>
        <Flex
          sx={{
            flex: 1,
            gap: 3,
            alignItems: 'center',
          }}
        >
          <Slider
            sx={{
              color: showStorageLoss ? 'primary' : 'secondary',
              opacity: showStorageLoss ? 1 : 0.5,
            }}
            value={storageLoss}
            onChange={handleChange}
            min={0}
            max={1}
            step={0.01}
            disabled={!showStorageLoss}
          />
          <Flex
            sx={{
              ...sx.label,
              color: showStorageLoss ? 'primary' : 'secondary',
              opacity: showStorageLoss ? 1 : 0.5,
              alignItems: 'center',
              justifyContent: 'space-between',
              mr: [-2, -2, -2, -3],
              minWidth: [52, 52, 52, 58],
            }}
          >
            <Box sx={{}}>{(storageLoss * 100).toFixed(0)}%</Box>
            <Tooltip
              expanded={expanded}
              setExpanded={setExpanded}
              disabled={!showStorageLoss}
            />
          </Flex>
        </Flex>
      </Flex>
      <AnimateHeight
        duration={100}
        height={expanded ? 'auto' : 0}
        easing={'linear'}
      >
        <Box
          sx={{
            mt: 3,
            fontSize: 1,
            color: showStorageLoss ? 'secondary' : 'muted',
          }}
        >
          Percentage of CO₂ extracted from the ocean that ends up in the
          atmosphere, either from unintentional leakage during CO₂ transport or
          storage or through short-lived utilization pathways. Losses are
          assumed to occur instantaneously—an idealization meant to illustrate
          the ultimate result of storage losses, rather than the timing of
          specific scenarios.
        </Box>
      </AnimateHeight>
    </>
  )
}

export default StorageLoss
