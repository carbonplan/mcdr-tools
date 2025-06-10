import React from 'react'
import { Box } from 'theme-ui'
import { Link } from '@carbonplan/components'

const Intro = ({ sx }) => {
  return (
    <Box sx={{ ...sx.description, mb: 3 }}>
      This is an interactive tool for exploring the efficiency of ocean
      alkalinity enhancement (OAE). You can explore global patterns, or select a
      polygon region to see how alkalinity released in a specific region and
      month will move through the ocean and result in carbon removal over time.
      Developed in collaboration with{' '}
      <Link href='https://cworthy.org/'>[C]Worthy</Link>.
    </Box>
  )
}

export default Intro
