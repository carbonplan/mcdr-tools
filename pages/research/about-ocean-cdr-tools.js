import React from 'react'
import { MDXProvider, useMDXComponents } from '@mdx-js/react'
import { ThemeUIProvider } from 'theme-ui'
import theme from '@carbonplan/theme'
import { Supplement } from '@carbonplan/layouts'
import { useThemedStylesWithMdx } from '@theme-ui/mdx'

import OceanCdrToolsContent from './about-ocean-cdr-tools.mdx'
import { Table } from '@carbonplan/components'

const meta = {
  title: 'About Ocean CDR Tools',
  date: '2025-06-04',
  quickLook: 'Information about Ocean CDR Tools',
  path: '/research/about-ocean-cdr-tools',
  card: 'ocean-cdr-tools',
}

const AboutOceanCdrTools = () => {
  const components = useThemedStylesWithMdx(useMDXComponents())

  return (
    <ThemeUIProvider theme={theme}>
      <Supplement meta={meta} back='/research/ocean-cdr'>
        <MDXProvider components={{ ...components, Table }}>
          <OceanCdrToolsContent />
        </MDXProvider>
      </Supplement>
    </ThemeUIProvider>
  )
}

export default AboutOceanCdrTools
