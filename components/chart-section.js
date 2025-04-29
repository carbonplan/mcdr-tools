import React from 'react'
import { useCurrentStore, useVariables } from '../store'
import OverviewChart from './overview-chart'
import RegionChart from './region-chart'

const ChartSection = ({ sx }) => {
  const useStore = useCurrentStore()
  const variables = useVariables()

  const isOverview = useStore((s) => variables[s.variableFamily].overview)
  return isOverview ? <OverviewChart sx={sx} /> : <RegionChart sx={sx} />
}

export default ChartSection
