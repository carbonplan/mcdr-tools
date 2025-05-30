export const DOR_VARIABLES = {
  EFFICIENCY: {
    label: 'Efficiency',
    description: {
      overview:
        'CO₂ absorbed from the atmosphere compared to the removal potential induced by extracting CO2. This metric accounts for both ocean uptake of atmospheric CO2 after the DOR intervention and any losses from storage of the extracted CO₂. Higher values indicate more effective carbon removal. Select a region to view additional experimental outputs.',
      region:
        'CO₂ absorbed from the atmosphere compared to the removal potential induced by extracting CO2. This metric accounts for both ocean uptake of atmospheric CO2 after the DOR intervention and any losses from storage of the extracted CO₂. Higher values indicate more effective carbon removal.',
    },
    threshold: 0.001,
    overview: true,
    url: 'https://carbonplan-dor-efficiency.s3.amazonaws.com/v3/store1b.zarr',
    variables: [
      {
        variable: 'DOR_efficiency',
        colorLimits: [0, 1],
        colormap: 'cool',
        unit: 'CO₂ absorbed / potential removal',
        graphLabel: 'Net efficiency',
        graphUnit: '',
      },
    ],
  },

  // FG_CO2: {
  //   label: 'Spread of CO₂ uptake',
  //   description: {
  //     overview:
  //       'Percentage of cumulative CO₂ uptake taking place within the specified distance from the center of the intervention region. Select a region to view additional experimental outputs.',
  //     region:
  //       'Percentage of cumulative CO₂ uptake taking place within the specified distance from the center of the intervention region.',
  //   },
  //   threshold: 0.001,
  //   overview: true,
  //   url: 'https://carbonplan-dor-efficiency.s3.amazonaws.com/v3/cumulative_FG_CO2_percent.zarr',
  //   optionsTooltip:
  //     'View the percentage of cumulative CO₂ re-uptake taking place within 500 km, 1000 km, or 2000 km of the intervention center.',
  //   variables: [
  //     {
  //       variable: 'FG_CO2_percent_cumulative',
  //       colorLimits: [0, 100],
  //       colormap: 'cool',
  //       optionIndex: 0,
  //       label: '500 km',
  //       graphLabel: 'Uptake percentage',
  //       unit: '%',
  //       graphUnit: '',
  //     },
  //     {
  //       variable: 'FG_CO2_percent_cumulative',
  //       colorLimits: [0, 100],
  //       colormap: 'cool',
  //       optionIndex: 1,
  //       label: '1000 km',
  //       graphLabel: 'Uptake percentage',
  //       unit: '%',
  //       graphUnit: '',
  //     },
  //     {
  //       variable: 'FG_CO2_percent_cumulative',
  //       colorLimits: [0, 100],
  //       colormap: 'cool',
  //       optionIndex: 2,
  //       label: '2000 km',
  //       graphLabel: 'Uptake percentage',
  //       unit: '%',
  //       graphUnit: '',
  //     },
  //   ],
  // },
  DIC_SURF: {
    label: 'Surface dissolved inorganic carbon',
    description: {
      region:
        'Extracting CO2 from the surface ocean creates a dissolved inorganic carbon (DIC) deficit. A larger deficit means more potential for the ocean to absorb CO2 from the atmosphere.',
    },
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
        unit: 'mol/m³',
        unitConversion: 0.001,
      },
    ],
  },
  DIC: {
    label: 'Integrated dissolved inorganic carbon',
    description: {
      region:
        'Dissolved inorganic carbon (DIC) is the sum of inorganic carbon in water. Full water column values shown here.',
    },
    threshold: -0.00001,
    optionsTooltip:
      'View the change in integrated dissolved inorganic carbon, or the total integrated dissolved inorganic carbon value.',
    variables: [
      {
        variable: 'DIC',
        delta: true,
        logScale: true,
        colorLimits: [0, -0.1],
        logColorLimits: [-1e-4, -1],
        colormap: 'warm',
        label: 'Change',
        unit: 'mol/m³',
        unitConversion: 0.001,
      },
    ],
  },

  pCO2SURF: {
    label: 'Partial pressure of CO₂',
    description: {
      region:
        'The partial pressure of carbon dioxide at the ocean surface is a measure of how much CO₂ is dissolved in seawater. Ocean carbon uptake happens when the surface ocean pCO₂ is lower than the partial pressure of CO₂ in the overlying atmosphere.',
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
