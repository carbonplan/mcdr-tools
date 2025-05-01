import React, { useEffect, useRef } from 'react'
import { Sidebar, SidebarAttachment } from '@carbonplan/layouts'
import { Box, Spinner } from 'theme-ui'
import { useBreakpointIndex } from '@theme-ui/match-media'

import { useOAEStore } from '../../store'
import Header from '../../components/header'
import MapWrapper from '../../components/map'
import Footer from '../../components/footer'
import MobileSettings from '../../components/mobile-settings'
import Intro from '../../components/introOAE'
import RegionInfo from '../../components/region-info'
import About from '../../components/aboutOAE'
import DisplaySection from '../../components/display-section'
import ChartSection from '../../components/chart-section'
import useRegionUrlSync from '../../utils/useRegionUrlSync'

const sx = {
  heading: {
    fontFamily: 'heading',
    letterSpacing: 'smallcaps',
    textTransform: 'uppercase',
    fontSize: [2, 2, 2, 3],
    mb: [2],
  },
  label: {
    fontFamily: 'mono',
    letterSpacing: 'mono',
    textTransform: 'uppercase',
    color: 'secondary',
    fontSize: [1, 1, 1, 2],
    whiteSpace: 'nowrap',
  },
  description: {
    fontSize: [1, 1, 1, 2],
  },
}

const Main = () => {
  const loading = useOAEStore((state) => state.loading)
  const expanded = useOAEStore((state) => state.expanded)
  const setExpanded = useOAEStore((state) => state.setExpanded)
  const setShowRegionPicker = useOAEStore((state) => state.setShowRegionPicker)
  const index = useBreakpointIndex({ defaultIndex: 2 })
  useRegionUrlSync(useOAEStore)

  // toggle sidebar based on breakpoint
  const prevIndexRef = useRef(index)
  useEffect(() => {
    // ref prevents toggling between mobile sizes
    const prevIndex = prevIndexRef.current
    prevIndexRef.current = index
    if (prevIndex < 2 && index >= 2) {
      setExpanded(true)
    } else if (prevIndex >= 2 && index < 2) {
      setExpanded(false)
      setShowRegionPicker(false)
    }
  }, [index])

  return (
    <>
      <Header expanded={expanded} setExpanded={setExpanded} />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          width: '100%',
          overflowX: 'hidden',
        }}
      >
        {index >= 2 ? (
          <Box
            sx={{
              display: ['none', 'none', 'block', 'block'],
            }}
          >
            <Sidebar expanded={true} side='left' width={4} footer={<Footer />}>
              <>
                <Intro sx={sx} />
                <RegionInfo sx={sx} />
                <DisplaySection sx={sx} />
                <ChartSection sx={sx} />
                <About sx={sx} />
              </>
            </Sidebar>
            {loading && (
              <SidebarAttachment
                expanded={expanded}
                side='left'
                width={4}
                sx={{
                  top: '16px',
                }}
              >
                <Spinner size={32} />
              </SidebarAttachment>
            )}
          </Box>
        ) : (
          <>
            {loading && (
              <Box
                sx={{
                  position: 'absolute',
                  top: '72px',
                  left: '16px',
                  zIndex: 20220,
                }}
              >
                <Spinner size={32} />
              </Box>
            )}
            <MobileSettings expanded={expanded}>
              <Intro sx={sx} />
              <RegionInfo sx={sx} />
              <DisplaySection sx={sx} />
              <ChartSection sx={sx} />
              <About sx={sx} />
            </MobileSettings>
            <Footer />
          </>
        )}
        <MapWrapper />
      </Box>
    </>
  )
}

export default Main
