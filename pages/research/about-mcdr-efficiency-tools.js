import React from 'react'
import { MDXProvider, useMDXComponents } from '@mdx-js/react'
import { ThemeUIProvider } from 'theme-ui'
import theme from '@carbonplan/theme'
import { Supplement } from '@carbonplan/layouts'
import { useThemedStylesWithMdx } from '@theme-ui/mdx'

import AboutMcdrEfficiencyToolsContent from './about-mcdr-efficiency-tools.mdx'
import { Table, Link } from '@carbonplan/components'

const meta = {
  title: 'About mCDR Efficiency Tools',
  date: '2025-06-04',
  quickLook: 'Information about mCDR Efficiency Tools',
  path: '/research/about-mcdr-efficiency-tools',
  card: 'mcdr-efficiency-tools', //TODO: card?
}

const AboutMcdrEfficiencyTools = () => {
  const components = useThemedStylesWithMdx(useMDXComponents())

  return (
    <ThemeUIProvider theme={theme}>
      <Supplement meta={meta} back='/research/mcdr-efficiency'>
        <MDXProvider components={{ ...components, Table, Link }}>
          <AboutMcdrEfficiencyToolsContent />
        </MDXProvider>
      </Supplement>
    </ThemeUIProvider>
  )
}

export default AboutMcdrEfficiencyTools
