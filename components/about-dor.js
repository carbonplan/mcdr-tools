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
          dataset, mirroring previous work done on{' '}
          <Link href='https://doi.org/10.21203/rs.3.rs-4124909/v1'>
            ocean alkalinity enhancement
          </Link>
          . Together, CarbonPlan and [C]Worthy built the interactive tool, with
          funding from with funding from the Chan Zuckerberg Initiative, the
          Navigation Fund, and the Grantham Foundation for the Protection of the
          Environment.
        </p>
      </Box>
    </>
  )
}

export default AboutDOR
