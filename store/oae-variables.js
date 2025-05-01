export const OAE_VARIABLES = {
  EFFICIENCY: {
    label: 'Efficiency',
    description: {
      overview:
        'CO₂ removed per unit of alkalinity added. Higher values indicate more efficient carbon removal. Select a region to view additional experimental outputs.',
      region:
        'Carbon removal efficiency of release as a function of region, injection month, and elapsed time.',
    },
    threshold: 0.001,
    overview: true,
    url: 'https://carbonplan-oae-efficiency.s3.us-west-2.amazonaws.com/v3/store1b.zarr',
    variables: [
      {
        variable: 'OAE_efficiency',
        colorLimits: [0, 1],
        colormap: 'cool',
        label: 'Efficiency ratio',
        unit: 'mole CO₂ / mole alkalinity',
        graphUnit: '',
      },
    ],
  },
  FG_CO2: {
    label: 'Spread of CO₂ uptake',
    description: {
      overview:
        'Percentage of cumulative CO₂ uptake taking place within the specified distance from the center of the injection region. Select a region to view additional experimental outputs.',
      region:
        'Percentage of cumulative CO₂ uptake taking place within the specified distance from the center of the injection region.',
    },
    threshold: 0.001,
    overview: true,
    url: 'https://carbonplan-oae-efficiency.s3.us-west-2.amazonaws.com/v2/cumulative_FG_CO2_percent.zarr',
    optionsTooltip:
      'View the percentage of cumulative CO₂ uptake taking place within 500 km, 1000 km, or 2000 km of the injection center.',
    variables: [
      {
        variable: 'FG_CO2_percent_cumulative',
        colorLimits: [0, 100],
        colormap: 'cool',
        optionIndex: 0,
        label: '500 km',
        graphLabel: 'Uptake percentage',
        unit: '%',
        graphUnit: '',
      },
      {
        variable: 'FG_CO2_percent_cumulative',
        colorLimits: [0, 100],
        colormap: 'cool',
        optionIndex: 1,
        label: '1000 km',
        graphLabel: 'Uptake percentage',
        unit: '%',
        graphUnit: '',
      },
      {
        variable: 'FG_CO2_percent_cumulative',
        colorLimits: [0, 100],
        colormap: 'cool',
        optionIndex: 2,
        label: '2000 km',
        graphLabel: 'Uptake percentage',
        unit: '%',
        graphUnit: '',
      },
    ],
  },
  ALK: {
    label: 'Surface alkalinity',
    description: {
      region:
        'Concentration of alkalinity in surface waters. Alkalinity increases the ocean’s ability to absorb carbon.',
    },
    threshold: 0.0001,
    optionsTooltip:
      'View the change in alkalinity, or the total alkalinity value.',
    variables: [
      {
        variable: 'ALK',
        delta: true,
        logScale: true,
        colorLimits: [0, 0.1],
        logColorLimits: [0.0001, 10],
        colormap: 'warm',
        label: 'Change',
        unit: 'mEq/m³',
      },
      {
        variable: 'ALK',
        delta: false,
        colorLimits: [2000, 2800],
        colormap: 'warm',
        label: 'Total',
        unit: 'mEq/m³',
      },
    ],
  },
  pCO2SURF: {
    label: 'Partial pressure of CO₂',
    description: {
      region:
        'The partial pressure of carbon dioxide (pCO₂) at the ocean surface, a measure of how much CO₂ is dissolved in seawater. Ocean carbon uptake happens when the surface ocean pCO₂ is lower than the partial pressure of CO₂ in the overlying atmosphere',
    },
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
    description: {
      region:
        'The movement of carbon dioxide between the atmosphere and the ocean. Negative values indicate ocean CO₂ uptake.',
    },
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
    label: 'Dissolved inorganic carbon',
    description: {
      region:
        'Dissolved inorganic carbon (DIC) is the sum of inorganic carbon in water. Full water column values shown here.',
    },
    threshold: 0.00001,
    optionsTooltip:
      'View the change in DIC. Total values are not available for this variable.',
    variables: [
      {
        variable: 'DIC',
        delta: true,
        logScale: true,
        colorLimits: [0, 0.0025],
        logColorLimits: [0.00001, 0.1],
        colormap: 'warm',
        label: 'Change',
        unit: 'mol/m²',
        unitConversion: 0.001,
      },
    ],
  },
  PH: {
    label: 'pH',
    description: {
      region:
        'The measurement of acidity, or free hydrogen ions, in surface waters. The lower the pH value, the more acidic the seawater.',
    },
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
