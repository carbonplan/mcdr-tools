import React from 'react'
import { MDXProvider, useMDXComponents } from '@mdx-js/react'
import { ThemeUIProvider, Box } from 'theme-ui'
import theme from '@carbonplan/theme'
import { Supplement } from '@carbonplan/layouts'
import { useThemedStylesWithMdx } from '@theme-ui/mdx'

import AboutMcdrToolsContent from './about-mcdr-tools.mdx'
import { Table, Link } from '@carbonplan/components'

const meta = {
  title: 'About mCDR Efficiency Tools',
  date: '2025-06-04',
  quickLook: 'Information about mCDR Efficiency Tools',
  path: '/research/about-mcdr-tools',
  card: 'mcdr-tools', //TODO: card?
}

const AboutMcdrTools = () => {
  const components = useThemedStylesWithMdx(useMDXComponents())

  return (
    <ThemeUIProvider theme={theme}>
      <Supplement meta={meta} back='/research/mcdr-tools'>
        <MDXProvider components={{ ...components, Table, Link, Box }}>
          <AboutMcdrToolsContent />
        </MDXProvider>
      </Supplement>
    </ThemeUIProvider>
  )
}

export default AboutMcdrTools
