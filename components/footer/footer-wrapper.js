import React from 'react'
import { SidebarFooter } from '@carbonplan/layouts'
import { useBreakpointIndex } from '@theme-ui/match-media'

const getMobileMarginFix = (index) => {
  // !important breaks things when using standard array syntax
  if (index <= 1) {
    return '0 !important'
  } else {
    return 0
  }
}

const getExtraStyles = (index) => {
  if (index <= 1) {
    return {
      zIndex: 2,
      bg: 'background',
      '&:hover': { bg: 'background' },
      cursor: 'auto',
      borderTop: '0.5px solid #393a3d',
      my: '-0.5px', // account for border
    }
  } else {
    return {}
  }
}

const FooterWrapper = ({ children }) => {
  const index = useBreakpointIndex({ defaultIndex: 2 })

  return (
    <SidebarFooter
      sx={{
        width: ['100%', '100%', 'auto', 'auto'],
        mr: getMobileMarginFix(index),
        ml: getMobileMarginFix(index),
        ...getExtraStyles(index),
      }}
    >
      {children}
    </SidebarFooter>
  )
}

export default FooterWrapper
