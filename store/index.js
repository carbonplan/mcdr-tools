import { create } from 'zustand'

export const overviewVariable = {
  key: 'EFFICIENCY',
  colorLimits: [0.65, 0.85],
  colormap: 'warm',
  label: 'Efficiency',
  unit: '',
  description: 'tk',
}

export const variables = {
  ALK: {
    meta: {
      label: 'Alkalinity',
      description: `Alkalinity (mEq/m³) averaged over depth. Higher alkalinity values correlate with increases in the ocean's ability to absorb carbon dioxide.`,
      threshold: 0.001,
    },
    variables: [
      {
        key: 'DELTA_ALK',
        calc: ['ALK', 'ALK_ALT_CO2'],
        colorLimits: [0, 0.1],
        colormap: 'warm',
        label: 'change',
        unit: 'mEq/m³',
        description:
          'Plume showing the change in alkalinity (mEq/m³) due to alkalinity enhancement in the selected region.',
      },
      {
        key: 'ALK',
        colorLimits: [2000, 2800],
        colormap: 'warm',
        label: 'Total',
        unit: 'mEq/m³',
        description:
          'Total alkalinity (mEq/m³) in the ocean after alkalinity enhancement in the selected region.',
      },
    ],
  },
  DIC: {
    meta: {
      label: 'Dissolved inorganic carbon (DIC)',
      description: `DIC (mmol/m³) is the sum of inorganic carbon in the ocean, shown here averaged over depth.`,
      threshold: 0.001,
    },
    variables: [
      {
        key: 'DELTA_DIC',
        calc: ['DIC', 'DIC_ALT_CO2'],
        colorLimits: [0, 0.1],
        colormap: 'cool',
        label: 'change',
        unit: 'mmol/m³',
        description:
          'Plume showing the change in DIC (mmol/m³) due to alkalinity enhancement in the selected region.',
      },
      {
        key: 'DIC',
        colorLimits: [1800, 2300],
        colormap: 'cool',
        label: 'Total',
        unit: 'mmol/m³',
        description:
          'Total DIC (mmol/m³) in the ocean after alkalinity enhancement in the selected region.',
      },
    ],
  },
}

const useStore = create((set) => ({
  loading: false,
  setLoading: (loading) => set({ loading }),

  regionDataLoading: false,
  setRegionDataLoading: (regionDataLoading) => set({ regionDataLoading }),

  expanded: true,
  setExpanded: (expanded) => set({ expanded }),

  variableFamily: 'ALK',
  setVariableFamily: (variableFamily) => set({ variableFamily }),

  currentVariable: overviewVariable,
  setCurrentVariable: (currentVariable) => set({ currentVariable }),

  selectedRegion: null,
  setSelectedRegion: (selectedRegion) =>
    selectedRegion !== null
      ? set(() => {
          if (selectedRegion !== 0) {
            alert('only region 0 (near greenland!) is available at this time')
            return { selectedRegion: null }
          }
          return { selectedRegion, currentVariable: variables.ALK.variables[0] }
        })
      : set({
          selectedRegion,
          currentVariable: overviewVariable,
          showRegionPicker: false,
          regionData: null,
          hoveredRegion: null,
          elapsedTime: 0,
        }),

  selectedRegionCenter: null,
  setSelectedRegionCenter: (selectedRegionCenter) =>
    set({ selectedRegionCenter }),

  showDeltaOverBackground: false,
  setShowDeltaOverBackground: (showDeltaOverBackground) =>
    set({ showDeltaOverBackground }),

  hoveredRegion: null,
  setHoveredRegion: (hoveredRegion) => set({ hoveredRegion }),

  timeHorizon: 15,
  setTimeHorizon: (timeHorizon) => set({ timeHorizon }),

  elapsedTime: 0,
  setElapsedTime: (elapsedTime) => set({ elapsedTime }),

  regionsInView: undefined,
  setRegionsInView: (regionsInView) =>
    set({ regionsInView: new Set(regionsInView) }),

  injectionSeason: {
    JAN: true,
    APR: false,
    JUL: false,
    OCT: false,
  },
  setInjectionSeason: (injectionSeason) =>
    set(() => {
      if (injectionSeason.JAN) {
        return { injectionSeason }
      }
      alert('only january is available at this time')
      return {
        injectionSeason: { JAN: true, APR: false, JUL: false, OCT: false },
      }
    }),

  showRegionPicker: false,
  setShowRegionPicker: (showRegionPicker) => set({ showRegionPicker }),

  regionData: null,
  setRegionData: (regionData) => set({ regionData }),
}))

export default useStore
