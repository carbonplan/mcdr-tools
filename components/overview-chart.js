import React, { useCallback, useEffect, useMemo } from 'react'
import { Box, Divider, Flex, useThemeUI } from 'theme-ui'
import { useThemedColormap } from '@carbonplan/colormaps'

import useStore, { useVariables } from '../store'
import Timeseries from './timeseries'
import { openZarr, getChunk, getTimeSeriesData, downloadCsv } from '../utils'
import DownloadCSV from './download-csv'
import Checkbox from './checkbox'

const toMonthsIndex = (year, startYear) => (year - startYear) * 12 - 1
const ids = Array.from({ length: 690 }, (_, i) => i)

const OverviewChart = ({ sx }) => {
  const variables = useVariables()

  const selectedRegion = useStore((state) => state.selectedRegion)
  const setSelectedRegion = useStore((state) => state.setSelectedRegion)
  const setHoveredRegion = useStore((state) => state.setHoveredRegion)
  const overviewLineData = useStore((state) => state.overviewLineData)
  const setOverviewLineData = useStore((state) => state.setOverviewLineData)
  const injectionDate = useStore(
    (state) =>
      Object.values(state.injectionSeason).findIndex((value) => value) + 1
  )
  const injectionMonthString = useStore((state) =>
    Object.keys(state.injectionSeason).find(
      (value) => state.injectionSeason[value]
    )
  )
  const filterToRegionsInView = useStore((state) => state.filterToRegionsInView)
  const setFilterToRegionsInView = useStore(
    (state) => state.setFilterToRegionsInView
  )
  const regionsInView = useStore((state) => state.regionsInView)
  const currentVariable = useStore((state) => state.currentVariable)
  const variableFamily = useStore((state) => state.variableFamily)
  const setActiveLineData = useStore((state) => state.setActiveLineData)
  const setLoading = useStore((state) => state.setLoading)
  const setRegionDataLoading = useStore((state) => state.setRegionDataLoading)
  const storageLoss = useStore((state) => state.storageLoss)
  const showStorageLoss = useStore((state) => state.showStorageLoss)

  const colormap = useThemedColormap(currentVariable.colormap, {
    count: 100,
    format: 'hex',
    // low count prevents banding in gradient.
    // >8 breaks chrome in some cases.
  })

  const startYear = 0

  const { theme } = useThemeUI()

  const hideFilter = typeof selectedRegion === 'number'

  useEffect(() => {
    const fetchTimeSeriesData = async () => {
      setOverviewLineData(null)
      setActiveLineData(null)
      setLoading(true)
      setRegionDataLoading(true)
      const zarrUrl = variables[variableFamily].url
      const getter = await openZarr(zarrUrl, currentVariable.variable)
      const injectionChunkIndex = injectionDate - 1
      const raw =
        currentVariable.optionIndex !== undefined
          ? await getChunk(getter, [0, 0, injectionChunkIndex, 0])
          : await getChunk(getter, [0, 0, injectionChunkIndex])
      const timeSeriesData = getTimeSeriesData(
        raw,
        ids,
        startYear,
        currentVariable.optionIndex
      )

      const transformed = timeSeriesData.reduce((acc, regionData, index) => {
        acc[index] = {
          id: index,
          activeColor: theme.rawColors?.primary,
          strokeWidth: 2,
          data: regionData,
        }
        return acc
      }, {})

      setOverviewLineData(transformed)
      setLoading(false)
      setRegionDataLoading(false)
    }
    fetchTimeSeriesData()
  }, [injectionDate, currentVariable, variableFamily])

  useEffect(() => {
    if (!selectedRegion) {
      setActiveLineData(null)
    } else {
      const regionData = overviewLineData?.[selectedRegion]
      setActiveLineData(regionData || null)
    }
  }, [selectedRegion, overviewLineData])

  const selectedLines = useMemo(() => {
    const lineData = overviewLineData
    if (!lineData) return {}

    if (!filterToRegionsInView || !regionsInView) {
      return lineData
    }

    const selected = Object.fromEntries(
      regionsInView
        .filter((regionId) => lineData[regionId])
        .map((regionId) => [regionId, lineData[regionId]])
    )
    return selected
  }, [regionsInView, filterToRegionsInView, overviewLineData])

  const handleClick = useCallback(
    (e) => {
      const id = parseInt(e.target.id)
      setSelectedRegion(id)
    },
    [setSelectedRegion]
  )

  const handleHover = useCallback(
    (region) => {
      setHoveredRegion(region)
    },
    [setHoveredRegion]
  )

  const handleCSVDownload = useCallback(() => {
    const totalMonths = 180
    const csvData = Array.from({ length: totalMonths }, (_, index) => ({
      month: index + 1,
      injection_month: injectionMonthString,
      units: currentVariable.unit,
      ...(showStorageLoss && { storage_loss: storageLoss }),
    }))
    Object.values(selectedLines).forEach((line) => {
      line.data.forEach(([year, value]) => {
        const monthIndex = toMonthsIndex(year, 0)
        csvData[monthIndex][`region_${line.id}`] = showStorageLoss
          ? value - storageLoss
          : value
      })
    })

    const name = (() => {
      const { label } = variables[variableFamily]
      const varLabel = currentVariable.graphLabel || currentVariable.label

      if (label.includes('Efficiency')) {
        return label === 'Efficiency' ? varLabel : 'Efficiency_DOR_comparison'
      }
      if (label === 'Spread of CO₂ uptake')
        return `${label}_${currentVariable.label}`
      return `${label}_${varLabel}`
    })()

    downloadCsv(
      csvData,
      `${
        filterToRegionsInView ? 'filtered_' : ''
      }${name}_timeseries.csv`.replace(/ /g, '_')
    )
  }, [
    selectedLines,
    toMonthsIndex,
    storageLoss,
    showStorageLoss,
    variableFamily,
  ])

  return (
    <Box sx={{ mb: 4 }}>
      <Divider sx={{ mt: 2, mb: 4 }} />
      <Box sx={sx.heading}>Time series</Box>

      <Flex sx={{ justifyContent: hideFilter ? 'flex-end' : 'space-between' }}>
        {!hideFilter && (
          <Checkbox
            checked={filterToRegionsInView}
            label='Filter to map view'
            onChange={(e) => setFilterToRegionsInView(e.target.checked)}
          />
        )}
        <DownloadCSV
          onClick={handleCSVDownload}
          disabled={
            Object.keys(selectedLines ? selectedLines : {}).length === 0
          }
          sx={{
            mb: 1,
          }}
        />
      </Flex>
      <Timeseries
        xLimits={[startYear, 15]}
        yLimits={currentVariable.colorLimits}
        yLabels={{
          title: currentVariable.graphLabel
            ? `${currentVariable.graphLabel}`
            : currentVariable.label,
          units:
            currentVariable.graphUnit !== undefined
              ? currentVariable.graphUnit
              : currentVariable.unit,
        }}
        selectedLines={selectedLines}
        colormap={colormap}
        opacity={0.1}
        handleClick={hideFilter ? undefined : handleClick}
        handleHover={hideFilter ? undefined : handleHover}
        showActive
      />
    </Box>
  )
}

export default OverviewChart
