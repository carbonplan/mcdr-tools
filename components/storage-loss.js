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

  const handleChange = (e) => {
    const value = Math.min(1, Math.max(0, parseFloat(e.target.value)))
    setStorageLoss(value)
  }

  return (
    <Flex sx={{ gap: [3, 4, 4, 5], alignItems: 'center' }}>
      <Box sx={sx.label}>Storage loss</Box>
      <Flex sx={{ flex: 1, gap: 3, alignItems: 'center' }}>
        <Box sx={{ flex: 1 }}>
          <Slider
            sx={{ color: 'primary' }}
            value={storageLoss}
            onChange={handleChange}
            min={0}
            max={1}
            step={0.01}
          />
        </Box>
        <Box
          sx={{
            ...sx.label,
            color: 'primary',
            width: '50px',
            textAlign: 'right',
          }}
        >
          {(storageLoss * 100).toFixed(0)}%
        </Box>
      </Flex>
    </Flex>
  )
}

export default StorageLoss
