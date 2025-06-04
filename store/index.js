import { create } from 'zustand'
import { useRouter } from 'next/router'

import { OAE_VARIABLES } from './oae-variables'
import { DOR_VARIABLES } from './dor-variables'

const monthMap = {
  JAN: 1,
  APR: 4,
  JUL: 7,
  OCT: 10,
}

export const getInjectionMonth = (season) => {
  for (const month in season) {
    if (season[month]) {
      return monthMap[month]
    }
  }
  console.error('No injection month found, defaulting Jan')
  return 1
}

const findVariableFamily = (variable, variables) => {
  return Object.keys(variables).find((family) =>
    variables[family].variables.some((v) => v.variable === variable.variable)
  )
}

const createStore = (variables, isDOR = false) => {
  return create((set) => ({
    isDOR,
    loading: false,
    setLoading: (loading) => set({ loading }),

    regionDataLoading: false,
    setRegionDataLoading: (regionDataLoading) => set({ regionDataLoading }),

    circlePickerMetaData: null,
    setCirclePickerMetaData: (circlePickerMetaData) =>
      set({ circlePickerMetaData }),

    expanded: true,
    setExpanded: (expanded) => set({ expanded }),

    zarrStore: isDOR
      ? 'https://carbonplan-dor-efficiency.s3.amazonaws.com/v2/store2.zarr'
      : 'https://carbonplan-oae-efficiency.s3.amazonaws.com/v3/store2.zarr',

    variableFamily: 'EFFICIENCY',
    setVariableFamily: (variableFamily) => set({ variableFamily }),

    currentVariable: variables.EFFICIENCY.variables[0],
    setCurrentVariable: (currentVariable, variableFamily) =>
      set(() => {
        if (variableFamily && variables[variableFamily]?.overview) {
          return {
            currentOverviewVariable: currentVariable,
            currentVariable,
            variableFamily,
            showStorageLoss: isDOR && variableFamily === 'EFFICIENCY',
          }
        } else {
          return { currentVariable, variableFamily, showStorageLoss: false }
        }
      }),

    currentOverviewVariable: variables.EFFICIENCY.variables[0],
    setCurrentOverviewVariable: (currentOverviewVariable) =>
      set({ currentOverviewVariable }),

    logScale: false,
    setLogScale: (logScale) =>
      set((state) => {
        if (!state.currentVariable.logScale) {
          return { logScale: false }
        }
        return { logScale }
      }),

    selectedRegion: null,
    setSelectedRegion: (selectedRegion) =>
      selectedRegion !== null
        ? set((state) => {
            const activeLineData =
              state.overviewLineData?.[selectedRegion] || null
            const selectedRegionGeojson = state.regionGeojson.features.find(
              (f) => f.properties.polygon_id === selectedRegion
            )
            const currentVariable = isDOR
              ? variables.DIC_SURF.variables[0]
              : variables.ALK.variables[0]
            const variableFamily = isDOR ? 'DIC_SURF' : 'ALK'
            return {
              selectedRegion,
              currentVariable,
              variableFamily,
              activeLineData,
              selectedRegionGeojson,
              showStorageLoss: false,
            }
          })
        : set((state) => {
            const isOverview = variables[state.variableFamily].overview
            const variableFamily = isOverview
              ? state.variableFamily
              : findVariableFamily(state.currentOverviewVariable, variables)
            return {
              selectedRegion,
              currentVariable: isOverview
                ? state.currentVariable
                : state.currentOverviewVariable,
              currentOverviewVariable: isOverview
                ? state.currentVariable
                : state.currentOverviewVariable,
              variableFamily: variableFamily,
              showRegionPicker: false,
              regionData: null,
              hoveredRegion: null,
              activeLineData: null,
              logScale: false,
              selectedRegionCenter: null,
              showStorageLoss: isDOR,
            }
          }),

    selectedRegionCenter: null,
    setSelectedRegionCenter: (selectedRegionCenter) =>
      set({ selectedRegionCenter }),

    overviewLineData: {},
    setOverviewLineData: (overviewLineData) => set({ overviewLineData }),

    regionGeojson: null,
    setRegionGeojson: (regionGeojson) => set({ regionGeojson }),

    selectedRegionGeojson: null,
    setSelectedRegionGeojson: (selectedRegionGeojson) =>
      set({ selectedRegionGeojson }),

    hoveredRegion: null,
    setHoveredRegion: (hoveredRegion) =>
      set((state) => {
        if (state.selectedRegion) {
          return {}
        }
        const activeLineData = state.overviewLineData?.[hoveredRegion] || null
        return { hoveredRegion, activeLineData: activeLineData || null }
      }),

    activeLineData: null,
    setActiveLineData: (activeLineData) => set({ activeLineData }),

    overviewElapsedTime: 179,
    setOverviewElapsedTime: (overviewElapsedTime) =>
      set({ overviewElapsedTime }),

    detailElapsedTime: 0,
    setDetailElapsedTime: (detailElapsedTime) => set({ detailElapsedTime }),

    filterToRegionsInView: false,
    setFilterToRegionsInView: (filterToRegionsInView) =>
      set({ filterToRegionsInView }),

    regionsInView: null,
    setRegionsInView: (regionsInView) => set({ regionsInView }),

    injectionSeason: {
      JAN: true,
      APR: false,
      JUL: false,
      OCT: false,
    },
    setInjectionSeason: (injectionSeason) =>
      set({
        injectionSeason,
      }),

    showRegionPicker: false,
    setShowRegionPicker: (showRegionPicker) => set({ showRegionPicker }),

    storageLoss: isDOR ? 0.25 : 0,
    setStorageLoss: (storageLoss) => set({ storageLoss }),

    showStorageLoss: isDOR,

    regionData: null,
    setRegionData: (regionData) => set({ regionData }),
  }))
}

export const useVariables = () => {
  const router = useRouter()
  return router.pathname.includes('dor-efficiency')
    ? DOR_VARIABLES
    : OAE_VARIABLES
}

const useOAEStore = createStore(OAE_VARIABLES, false)
const useDORStore = createStore(DOR_VARIABLES, true)

export const useStore = (selector) => {
  const router = useRouter()
  return router.pathname.includes('dor-efficiency')
    ? useDORStore(selector)
    : useOAEStore(selector)
}

export default useStore
