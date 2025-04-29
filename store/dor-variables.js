export const DOR_VARIABLES = {
  EFFICIENCY: {
    label: 'Efficiency',
    threshold: 0.001,
    overview: true,
    url: 'https://carbonplan-dor-efficiency.s3.us-west-2.amazonaws.com/store1b.zarr',
    variables: [
      {
        variable: 'DOR_efficiency',
        colorLimits: [0, 1],
        colormap: 'cool',
        label: 'Net efficiency',
        unit: 'mole CO₂ reabsorbed / removed',
        graphUnit: '',
      },
    ],
  },

  pCO2SURF: {
    label: 'Partial pressure of CO₂',
    optionsTooltip: 'View the change in pCO₂, or the total pCO₂ value.',
    variables: [
      {
        variable: 'pCO2SURF',
        delta: true,
        logScale: true,
        threshold: -1e-6,
        colorLimits: [0, -0.01],
        logColorLimits: [-1e-5, -1],
        colormap: 'warm',
        label: 'Change',
        unit: 'µatm',
      },
      {
        variable: 'pCO2SURF',
        delta: false,
        colorLimits: [300, 400],
        colormap: 'warm',
        label: 'Total',
        unit: 'µatm',
      },
    ],
  },
  FG: {
    label: 'Air-sea CO₂ flux',
    optionsTooltip: 'View the change in CO₂ flux, or the total flux value.',
    variables: [
      {
        variable: 'FG',
        delta: true,
        logScale: true,
        colorLimits: [0, -1e-2],
        logColorLimits: [-1e-5, -1],
        threshold: -1e-6,
        colormap: 'warm',
        label: 'Change',
        unit: 'mol/m²/yr',
        unitConversion: -315.36,
      },
      {
        variable: 'FG',
        delta: false,
        colorLimits: [-5, 5],
        colormap: 'orangeblue',
        flipColormap: true,
        label: 'Total',
        unit: 'mol/m²/yr',
        unitConversion: -315.36,
      },
    ],
  },
  DIC: {
    label: 'Integrated dissolved inorganic carbon',
    threshold: -0.00001,
    optionsTooltip:
      'View the change in integrated dissolved inorganic carbon, or the total integrated dissolved inorganic carbon value.',
    variables: [
      {
        variable: 'DIC',
        delta: true,
        logScale: true,
        colorLimits: [0, -0.01],
        logColorLimits: [-1e-4, -1],
        colormap: 'warm',
        label: 'Change',
        unit: 'mol/m²',
        unitConversion: 0.001,
      },
    ],
  },
  DIC_SURF: {
    label: 'Surface dissolved inorganic carbon',
    threshold: -0.00001,
    optionsTooltip:
      'View the change in DIC. Total values are not available for this variable.',
    variables: [
      {
        variable: 'DIC_SURF',
        delta: true,
        logScale: true,
        colorLimits: [0, -0.0001],
        logColorLimits: [-1e-5, -1],
        colormap: 'warm',
        label: 'Change',
        unit: 'mol/m²',
        unitConversion: 0.001,
      },
    ],
  },
  PH: {
    label: 'pH',
    threshold: 1e-8,
    optionsTooltip: 'View the change in pH, or the total pH value.',
    variables: [
      {
        variable: 'PH',
        delta: true,
        logScale: true,
        colorLimits: [0, 1e-4],
        logColorLimits: [1e-8, 0.1],
        colormap: 'warm',
        label: 'Change',
      },
      {
        variable: 'PH',
        delta: false,
        colorLimits: [7.8, 8.4],
        colormap: 'warm',
        label: 'Total',
      },
    ],
  },
}
