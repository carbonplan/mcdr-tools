import React from 'react'
import { Box } from 'theme-ui'
import { Link } from '@carbonplan/components'

const IntroDOR = ({ sx }) => {
  return (
    <Box sx={{ ...sx.description, mb: 3 }}>
      This is an interactive tool for exploring the efficiency of direct ocean
      removal (DOR). You can explore global patterns, or select a polygon region
      to see how extracting CO₂ from the ocean in a specific region and month
      will result in carbon removal over time. Developed in collaboration with{' '}
      <Link href='https://cworthy.org/'>[C]Worthy</Link>.
    </Box>
  )
}

export default IntroDOR
