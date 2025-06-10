import React from 'react'
import { Box } from 'theme-ui'
import { SidebarDivider } from '@carbonplan/layouts'
import { Column, Link, Logo, Row } from '@carbonplan/components'

import { CarbonToSea, CWorthy, EDF } from './logos'

const About = ({ sx }) => {
  return (
    <>
      <SidebarDivider sx={{ mt: 5, mb: 4 }} />
      <Box sx={sx.heading}>About</Box>

      <Box sx={{ ...sx.description, mb: 3 }}>
        [C]Worthy and collaborators developed the underlying OAE efficiency
        dataset. Together, CarbonPlan and [C]Worthy built the interactive tool,
        with funding from the Carbon to Sea Initiative (via Windward Fund) and
        Environmental Defense Fund. See the tool’s{' '}
        <Link href='/research/mcdr-tools-about'>about page</Link> for more
        details, read the{' '}
        <Link href='https://www.nature.com/articles/s41558-024-02179-9.epdf?sharing_token=LgDF4VdJvkifRzIuQy5nT9RgN0jAjWel9jnR3ZoTv0ML06qtsGAXcI3ncw2VKMdvNBF8yc3ykUNvQP2YZSZZg3VEb8eJNbnayufBxkZ0cVTHRB4myOJv4osBgWv1OPyMNfRCLYPLT3MancsjfEhCqWMLGD_VUA_LXbALrR9640c%3D'>
          paper
        </Link>{' '}
        or our{' '}
        <Link href='https://carbonplan.org/research/oae-efficiency-explainer'>
          explainer article
        </Link>
        , or compare withour tool for{' '}
        <Link href='/research/dor-efficiency'>direct ocean removal</Link>.
      </Box>
      <Row columns={[6, 8, 4, 4]} sx={{ mt: 5 }}>
        <Column start={1} width={[3, 4, 2, 2]}>
          <CWorthy sx={{ width: '75%', maxWidth: '200px' }} />
        </Column>
        <Column start={[4, 5, 3, 3]} width={[3, 4, 2, 2]}>
          <CarbonToSea sx={{ mt: 1, width: '80%', maxWidth: '200px' }} />
        </Column>
        <Column start={1} width={[3, 4, 2, 2]}>
          <EDF sx={{ mt: 4, width: '80%', maxWidth: '200px' }} />
        </Column>
        <Column start={[4, 5, 3, 3]} width={[3, 4, 2, 2]}>
          <Logo sx={{ mt: 4, width: '80%', maxWidth: '200px' }} />
        </Column>
      </Row>
    </>
  )
}

export default About
