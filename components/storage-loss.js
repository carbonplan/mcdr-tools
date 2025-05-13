import React from 'react'
import { Box, Flex } from 'theme-ui'
import { Slider } from '@carbonplan/components'
import useStore from '../store'

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

  const handleChange = (e) => {
    const value = Math.min(1, Math.max(0, parseFloat(e.target.value)))
    setStorageLoss(value)
  }

  return (
    <Flex sx={{ gap: [3, 4, 4, 5], alignItems: 'center' }}>
      <Box sx={{ ...sx.label, color: showStorageLoss ? 'secondary' : 'muted' }}>
        Storage loss
      </Box>
      <Flex sx={{ flex: 1, gap: 3, alignItems: 'center' }}>
        <Box sx={{ flex: 1 }}>
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
        </Box>
        <Box
          sx={{
            ...sx.label,
            color: showStorageLoss ? 'primary' : 'secondary',
            width: '45px',
            textAlign: 'right',
            opacity: showStorageLoss ? 1 : 0.5,
          }}
        >
          {(storageLoss * 100).toFixed(0)}%
        </Box>
      </Flex>
    </Flex>
  )
}

export default StorageLoss
