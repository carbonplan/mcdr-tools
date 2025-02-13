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

const StorageDurability = () => {
  const storageEfficiency = useStore((state) => state.storageEfficiency)
  const setStorageEfficiency = useStore((state) => state.setStorageEfficiency)

  const handleChange = (e) => {
    const value = Math.min(1, Math.max(0, parseFloat(e.target.value)))
    setStorageEfficiency(value)
  }

  return (
    <Flex sx={{ gap: [3, 4, 4, 5], alignItems: 'center' }}>
      <Box sx={sx.label}>Storage durability</Box>
      <Flex sx={{ flex: 1, gap: 3, alignItems: 'center' }}>
        <Box sx={{ flex: 1 }}>
          <Slider
            sx={{ color: 'primary' }}
            value={storageEfficiency}
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
          {(storageEfficiency * 100).toFixed(0)}%
        </Box>
      </Flex>
    </Flex>
  )
}

export default StorageDurability
