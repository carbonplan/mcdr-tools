import React, { useCallback, useMemo } from 'react'
import { Box, Flex } from 'theme-ui'
import { Column, Filter, Select, Row, Colorbar } from '@carbonplan/components'

import TooltipWrapper from './tooltip'
import { useCurrentStore, useVariables } from '../store'
import { Chart, TickLabels, Ticks } from '@carbonplan/charts'
import { generateLogTicks, useVariableColormap, formatValue } from '../utils'
import Checkbox from './checkbox'
import { useColormap } from '@carbonplan/colormaps'

// TODO: move split versions for dor and oae
const DESCRIPTIONS = {
  EFFICIENCY: {
    overview:
      'CO₂ removed from the atmosphere per unit of CO₂ extracted from the ocean. This metric accounts for both ocean re-uptake of atmospheric CO₂ and any losses from storage of the extracted CO₂. Higher values indicate more effective carbon removal. Select a region to view additional experimental outputs.',
    region:
      'Carbon removal efficiency of release as a function of region, injection month, and elapsed time.',
  },
  FG_CO2: {
    overview:
      'Percentage of cumulative CO₂ uptake taking place within the specified distance from the center of the injection region. Select a region to view additional experimental outputs.',
    region:
      'Percentage of cumulative CO₂ uptake taking place within the specified distance from the center of the injection region.',
  },
  ALK: {
    region:
      "Concentration of alkalinity in surface waters. Alkalinity increases the ocean's ability to absorb carbon.",
  },
  DIC: {
    region:
      'Dissolved inorganic carbon (DIC) is the sum of inorganic carbon in water. Full water column values shown here.',
  },
  DIC_SURF: {
    region:
      'Extracting CO₂ creates a dissolved inorganic carbon (DIC) deficit. A larger deficit means more potential for the ocean to absorb CO₂ from the atmosphere.',
  },
  FG: {
    region:
      'The movement of carbon dioxide between the atmosphere and the ocean. Negative values indicate ocean CO₂ uptake.',
  },
  Omega_arag: {
    region:
      'The saturation state of surface seawater with respect to aragonite . Aragonite is a type of calcium carbonate (CaCO₃) that is precipitated by many shell-forming marine organisms. A value of more than 1 indicates supersaturation, which supports the growth of calcifying organisms and indicates a higher likelihood of abiotic mineral precipitation.',
  },
  Omega_calc: {
    region:
      'The saturation state of surface seawater with respect to calcite, which is a type of calcium carbonate (CaCO₃). A value greater than 1 indicates supersaturation, which supports the growth of calcifying organisms and indicates a higher likelihood of abiotic mineral precipitation.',
  },
  PH: {
    region:
      'The measurement of acidity, or free hydrogen ions, in surface waters. The lower the pH value, the more acidic the seawater.',
  },
  pCO2SURF: {
    region:
      'The partial pressure of carbon dioxide (pCO₂) at the ocean surface, a measure of how much CO₂ is dissolved in seawater. Ocean carbon uptake happens when the surface ocean pCO₂ is lower than the partial pressure of CO₂ in the overlying atmosphere',
  },
}

const DisplaySection = ({ sx }) => {
  const useStore = useCurrentStore()
  const variables = useVariables()

  const hasSelectedRegion = useStore(
    (state) => typeof state.selectedRegion === 'number'
  )
  const currentVariable = useStore((s) => s.currentVariable)
  const setCurrentVariable = useStore((s) => s.setCurrentVariable)
  const variableFamily = useStore((s) => s.variableFamily)
  const setVariableFamily = useStore((s) => s.setVariableFamily)
  const logScale = useStore((s) => s.logScale && s.currentVariable.logScale)
  const setLogScale = useStore((s) => s.setLogScale)

  const isEfficiency = variableFamily === 'EFFICIENCY'
  const efficiencyLowerBound = -0.2

  const min = logScale
    ? currentVariable.logColorLimits[0]
    : isEfficiency
    ? efficiencyLowerBound
    : currentVariable.colorLimits[0]
  const max = logScale
    ? currentVariable.logColorLimits[1]
    : currentVariable.colorLimits[1]

  const logLabels = logScale ? generateLogTicks(min, max) : null
  const colormap = useVariableColormap()

  const negativeColorMap = [
    ...useColormap('reds', { count: Math.ceil(colormap.length / 5) }),
  ].reverse()

  const efficiencyColorMap = useMemo(() => {
    return [...negativeColorMap, ...colormap]
  }, [colormap, negativeColorMap, isEfficiency])

  const filterValues = useMemo(() => {
    return variables[variableFamily].variables.reduce(
      (acc, variable) => ({
        ...acc,
        [variable.label]: currentVariable.label === variable.label,
      }),
      {}
    )
  }, [variableFamily, currentVariable])

  const handleFamilySelection = useCallback(
    (e) => {
      setVariableFamily(e.target.value)
      setCurrentVariable(variables[e.target.value].variables[0])
    },
    [setVariableFamily, setCurrentVariable, variables]
  )

  const handleVariableSelection = useCallback(
    (updatedValues) => {
      const selectedLabel = Object.keys(updatedValues).find(
        (label) => updatedValues[label]
      )
      if (selectedLabel) {
        const selectedVariable = variables[variableFamily].variables.find(
          (variable) => variable.label === selectedLabel
        )
        if (selectedVariable) {
          setCurrentVariable(selectedVariable)
        }
      }
    },
    [variableFamily, setCurrentVariable]
  )
  return (
    <>
      <Box sx={sx.heading}>Display</Box>
      <Row columns={[6, 8, 4, 4]} sx={{ mt: 3 }}>
        <Column start={1} width={[2, 2, 1, 1]} sx={sx.label}>
          Variable
        </Column>
        <Column start={[3, 3, 2, 2]} width={[4, 6, 3, 3]}>
          <Box sx={{ mt: ['-2px', '-2px', '-2px', '0px'] }}>
            <Select
              onChange={handleFamilySelection}
              value={variableFamily}
              size='xs'
              sx={{
                width: '100%',
                mb: 1,
              }}
              sxSelect={{
                fontFamily: 'mono',
                letterSpacing: 'mono',
                fontSize: [1, 1, 1, 2],
                width: '100%',
              }}
            >
              <optgroup label='Overview'>
                {Object.keys(variables).map((variable) =>
                  variables[variable].overview ? (
                    <option key={variable} value={variable}>
                      {variables[variable].label.toUpperCase()}
                    </option>
                  ) : null
                )}
              </optgroup>
              <optgroup label='Region-specific' disabled={!hasSelectedRegion}>
                {Object.keys(variables).map((variable) =>
                  !variables[variable].overview ? (
                    <option key={variable} value={variable}>
                      {variable === 'PH'
                        ? variables[variable].label
                        : variables[variable].label.toUpperCase()}
                    </option>
                  ) : null
                )}
              </optgroup>
            </Select>
          </Box>
          <Box
            id='description'
            sx={{
              fontSize: [1, 1, 1, 2],
              color: 'secondary',
              transition: 'all 0.2s',
            }}
          >
            {
              DESCRIPTIONS[variableFamily][
                hasSelectedRegion ? 'region' : 'overview'
              ]
            }
          </Box>
          <Box sx={{ mt: 3 }}>
            {Object.keys(filterValues).length &&
              variables[variableFamily].optionsTooltip && (
                <TooltipWrapper
                  sx={{ justifyContent: 'flex-start', gap: 2 }}
                  tooltip={variables[variableFamily].optionsTooltip}
                >
                  <Filter
                    key={variableFamily}
                    values={filterValues}
                    setValues={handleVariableSelection}
                  />
                </TooltipWrapper>
              )}
          </Box>
        </Column>

        <Column start={1} width={[6, 8, 4, 4]} sx={{ ...sx.label, mt: 4 }}>
          <Flex sx={{ justifyContent: 'space-between', height: 25 }}>
            <Box>
              Color range{' '}
              {currentVariable.unit && (
                <>
                  (
                  <Box as='span' sx={{ textTransform: 'none' }}>
                    {currentVariable.unit}
                  </Box>
                  )
                </>
              )}
            </Box>
            <Box>
              {currentVariable.logScale && (
                <Checkbox
                  label='Log scale'
                  checked={logScale}
                  onChange={(e) => setLogScale(e.target.checked)}
                />
              )}
            </Box>
          </Flex>
        </Column>
        <Column start={[1]} width={[6, 8, 4, 4]} sx={{ mb: 2 }}>
          <Colorbar
            colormap={isEfficiency ? efficiencyColorMap : colormap}
            discrete={logScale}
            horizontal
            width={'100%'}
            sx={{ mt: 2 }}
          />
        </Column>
      </Row>
      <Row columns={[6, 8, 4, 4]} sx={{ mt: '9px' }}>
        <Column
          start={1}
          width={[6, 8, 4, 4]}
          sx={{ ...sx.label, mt: 5, mb: currentVariable.unit ? 4 : 0 }}
        >
          <Chart
            logx={logScale}
            x={[min, max]}
            y={[0, 0]}
            padding={{ left: 1 }}
          >
            <Ticks
              values={logScale ? logLabels : null}
              bottom
              sx={{
                '&:first-of-type': { ml: '-1px' },
              }}
            />
            <TickLabels
              values={logScale ? logLabels : null}
              format={(d) => {
                if (isEfficiency && d === efficiencyLowerBound) {
                  return '-1.0'
                }
                return formatValue(d, { 0.001: '.0e' })
              }}
              sx={{ textTransform: 'none' }}
              bottom
            />

            {isEfficiency && (
              <>
                <Ticks
                  bottom
                  values={[
                    efficiencyLowerBound / 2 - 0.01,
                    efficiencyLowerBound / 2 + 0.01,
                  ]}
                  sx={{
                    transform: 'rotate(30deg)',
                    mt: '-18px',
                    height: 22,
                  }}
                />
                <TickLabels
                  bottom
                  values={[efficiencyLowerBound]}
                  format={() => '-1.0'}
                />
              </>
            )}
          </Chart>
        </Column>
      </Row>
    </>
  )
}

export default DisplaySection
