import React from 'react'
import { Box } from 'theme-ui'
import { SidebarDivider } from '@carbonplan/layouts'
import { Link } from '@carbonplan/components'

const AboutDOR = ({ sx }) => {
  return (
    <>
      <SidebarDivider sx={{ mt: 5, mb: 4 }} />
      <Box sx={sx.heading}>About</Box>

      <Box sx={{ ...sx.description, mb: 3 }}>
        <p>
          [C]Worthy and collaborators developed the underlying DOR efficiency
          dataset. Together, CarbonPlan and [C]Worthy built the interactive
          tool, with funding from the Chan Zuckerberg Initiative, the Navigation
          Fund, and the Grantham Foundation for the Protection of the
          Environment. See the tool’s{' '}
          <Link href='https://carbonplan.org/research/mcdr-tools-about'>
            about page
          </Link>
          , read our{' '}
          <Link href='https://carbonplan.org/research/dor-efficiency-explainer'>
            explainer article
          </Link>
          , or compare with our tool for{' '}
          <Link href='https://carbonplan.org/research/oae-efficiency'>
            ocean alkalinity enhancement
          </Link>
          .
        </p>
      </Box>
    </>
  )
}

export default AboutDOR
