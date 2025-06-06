import React, { useState } from 'react'
import { Box, Spinner } from 'theme-ui'
import {
  AxisLabel,
  Chart,
  Circle,
  Grid,
  Line,
  Plot,
  Point,
  Rect,
  TickLabels,
  Ticks,
} from '@carbonplan/charts'
import { Badge } from '@carbonplan/components'

import useStore, { useVariables } from '../store'
import { formatValue, useVariableColormap } from '../utils'
import { getColorForValue, createCombinedColormap } from '../utils/color'
import { useThemedColormap } from '@carbonplan/colormaps'

const renderPoint = (point) => {
  const { x, y, color } = point
  if (x === undefined || y === undefined || color === undefined) return null
  return (
    <Circle
      x={x}
      y={y}
      size={10}
      color={color}
      sx={{ pointerEvents: 'none' }}
    />
  )
}

const renderDataBadge = (point) => {
  if (!point || !point.text) return null
  const { x, y, color, text } = point
  return (
    <Point x={x} y={y} align={'center'} width={2}>
      <Badge
        sx={{
          fontSize: 1,
          height: '20px',
          mt: 2,
          bg: color,
        }}
      >
        {text}
      </Badge>
    </Point>
  )
}

const ColormapGradient = ({ colormap, opacity = 1 }) => {
  const storageLoss = useStore((s) => s.storageLoss)
  const showStorageLoss = useStore((s) => s.showStorageLoss)

  const negativeColormap = useThemedColormap('reds', {
    format: 'hex',
    count: colormap.length,
  })
  const adjustedColormap = createCombinedColormap(
    colormap,
    negativeColormap,
    showStorageLoss ? storageLoss : 0
  )
  return (
    <defs>
      <linearGradient
        id='colormapGradient'
        x1='0%'
        y1='100%'
        x2='0%'
        y2='0%'
        gradientUnits='userSpaceOnUse'
      >
        {adjustedColormap.map((hex, index) => {
          const offset = Number(
            (index / (adjustedColormap.length - 1)).toFixed(2)
          )
          return (
            <stop
              key={index}
              offset={`${offset * 100}%`}
              stopColor={hex}
              stopOpacity={opacity}
            />
          )
        })}
      </linearGradient>
    </defs>
  )
}

const RenderLines = ({
  linesObject = {},
  additionalStyles = {},
  handleClick,
  handleHover,
  gradient = false,
}) => {
  const lineCount = Object.keys(linesObject).length
  const interactive = handleClick || handleHover
  return Object.values(linesObject).map(({ id, data, color, strokeWidth }) => (
    <Line
      key={id}
      data={data}
      id={id}
      width={strokeWidth}
      color={gradient ? 'url(#colormapGradient)' : color}
      sx={{
        pointerEvents: 'visiblePainted',
        '&:hover': {
          cursor: interactive ? 'pointer' : 'default',
        },
        shapeRendering: lineCount > 100 ? 'optimizeSpeed' : 'auto',
        ...additionalStyles,
      }}
      onClick={handleClick}
      onMouseOver={handleHover ? () => handleHover(id) : undefined}
      onMouseLeave={handleHover ? () => handleHover(null) : undefined}
    />
  ))
}

const ActiveLine = ({ selectedLines }) => {
  const hoveredRegion = useStore((s) => s.hoveredRegion)
  const selectedRegion = useStore((s) => s.selectedRegion)
  const overviewElapsedTime = useStore((s) => s.overviewElapsedTime)

  const activeRegion = hoveredRegion ?? selectedRegion
  const activeLineData =
    activeRegion !== null ? selectedLines[activeRegion] : null

  if (!activeLineData || !activeLineData.data) {
    return null
  }

  const { activeColor, color } = activeLineData
  const x = activeLineData.data[overviewElapsedTime][0]
  const y = activeLineData.data[overviewElapsedTime][1]
  return (
    <>
      <Line
        sx={{
          stroke: activeColor ? activeColor : color,
          strokeWidth: 2,
          pointerEvents: 'none',
          '&:hover': {
            cursor: 'pointer',
          },
        }}
        data={activeLineData.data}
      />
      <Circle
        x={x}
        y={y}
        size={10}
        color={activeColor ? activeColor : color}
        sx={{ pointerEvents: 'none' }}
      />
    </>
  )
}

const OverviewBadge = ({ selectedLines }) => {
  const hoveredRegion = useStore((s) => s.hoveredRegion)
  const selectedRegion = useStore((s) => s.selectedRegion)
  const overviewElapsedTime = useStore((s) => s.overviewElapsedTime)
  const currentVariable = useStore((s) => s.currentVariable)
  const storageLoss = useStore((s) => s.storageLoss)
  const showStorageLoss = useStore((s) => s.showStorageLoss)
  const colormap = useVariableColormap()
  const negativeColormap = useThemedColormap('reds', {
    format: 'hex',
    count: colormap.length,
  })
  const combinedColormap = createCombinedColormap(
    colormap,
    negativeColormap,
    showStorageLoss ? storageLoss : 0
  )

  const activeRegion = hoveredRegion ?? selectedRegion
  const activeLineData =
    activeRegion !== null ? selectedLines[activeRegion] : null

  if (!activeLineData || !activeLineData.data) {
    return null
  }
  const data = activeLineData.data[overviewElapsedTime]
  const color = getColorForValue(data[1], combinedColormap, currentVariable)
  const x = data[0]
  const y = data[1]
  const point = {
    x,
    y,
    color,
    text: formatValue(y - (showStorageLoss ? storageLoss : 0)),
  }
  return renderDataBadge(point)
}

const TimeIndicator = ({ yLimits, isOverview = false }) => {
  const overviewElapsedTime = useStore((s) => s.overviewElapsedTime)
  const detailElapsedTime = useStore((s) => s.detailElapsedTime)
  const elapsedYears = isOverview
    ? (overviewElapsedTime + 1) / 12
    : (detailElapsedTime + 1) / 12

  if (elapsedYears === undefined) return null
  return (
    <Line
      data={[
        [elapsedYears, yLimits[0]],
        [elapsedYears, yLimits[1]],
      ]}
      color='primary'
      style={{ strokeDasharray: '2 4' }}
    />
  )
}

const AxisChart = ({ xLimits, yLimits }) => {
  const storageLoss = useStore((s) => s.storageLoss)
  const showStorageLoss = useStore((s) => s.showStorageLoss)
  const adjustedStorageLoss = showStorageLoss ? storageLoss : 0
  const adjustedYLimits = showStorageLoss
    ? [yLimits[0] - adjustedStorageLoss, 1 - adjustedStorageLoss]
    : yLimits

  return (
    <>
      <Chart
        x={xLimits}
        y={adjustedYLimits}
        padding={{ top: 30 }}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <Grid vertical />
        <Grid horizontal />
        <Ticks left />
        {showStorageLoss && (
          <Ticks left sx={{ borderColor: 'primary' }} values={[0]} />
        )}
        <Ticks bottom values={Array.from({ length: 16 }, (_, i) => i)} />
        <TickLabels left />
        {showStorageLoss && (
          <TickLabels
            left
            sx={{ color: 'primary', fontSize: 2 }}
            values={[0]}
          />
        )}
        <TickLabels bottom values={[0, 5, 10, 15]} />
      </Chart>
    </>
  )
}

const ZeroLine = ({ xLimits }) => {
  const storageLoss = useStore((s) => s.storageLoss)
  const showStorageLoss = useStore((s) => s.showStorageLoss)
  if (!showStorageLoss) return null

  return (
    <Line
      data={[
        [xLimits[0], storageLoss],
        [xLimits[1], storageLoss],
      ]}
      color='primary'
    />
  )
}

const Timeseries = ({
  xLimits,
  yLimits,
  yLabels,
  selectedLines,
  handleClick,
  handleHover,
  point,
  colormap,
  opacity,
  showActive = false,
  xSelector = false,
  handleXSelectorClick = () => {},
  logy = false,
  logLabels = [],
}) => {
  const variables = useVariables()

  const regionDataLoading = useStore((s) => s.regionDataLoading)
  const [mousePosition, setMousePosition] = useState(null)
  const [xSelectorValue, setXSelectorValue] = useState(null)
  const [isHovering, setIsHovering] = useState(false)
  const currentVariable = useStore((s) => s.currentVariable)
  const variableFamily = useStore((s) => s.variableFamily)
  const isOverview = variables[variableFamily].overview

  const xYearsMonth = (x) => {
    const years = Math.floor(x)
    const months = Math.round((x - years) * 12)
    return `${years.toString().padStart(2, '0')}y${months
      .toString()
      .padStart(2, '0')}m`
  }

  const handleXSelectorMouseMove = (e) => {
    const { left, width } = e.currentTarget.getBoundingClientRect()
    const clickX = Math.max(e.clientX - left, 0)
    const months = Math.round((clickX / width) * 180)
    const years = months / 12
    setMousePosition(years)
    setXSelectorValue(selectedLines[0]?.data?.[months - 1]?.[1])
  }

  const handleXSelectorMouseEnter = () => {
    setIsHovering(true)
  }

  const handleXSelectorMouseLeave = () => {
    setIsHovering(false)
    setMousePosition(null)
    setXSelectorValue(null)
  }

  const xSelectorHandlers = xSelector
    ? {
        onMouseMove: handleXSelectorMouseMove,
        onMouseEnter: handleXSelectorMouseEnter,
        onMouseLeave: handleXSelectorMouseLeave,
        onClick: handleXSelectorClick,
      }
    : {}

  const renderXSelector = (x) => {
    if (!isHovering || !xSelector) return null
    const year = Math.floor(x)
    return (
      <>
        <Rect
          id='x-selector'
          x={[year, year + 1]}
          y={[yLimits[0], yLimits[1]]}
          color={'secondary'}
          opacity={0.1}
        />
        <Line
          data={[
            [x, yLimits[0]],
            [x, yLimits[1]],
          ]}
          color='secondary'
          style={{ strokeDasharray: '2 4' }}
        />
      </>
    )
  }

  const renderTimeAndData = () => {
    if (!xSelector) return null
    const yValue = xSelectorValue ?? point?.y
    const xValue = mousePosition ?? point?.x
    if (yValue === undefined || xValue === undefined) return null
    return (
      <Box
        sx={{
          position: 'absolute',
          right: 0,
          top: 0,
          fontFamily: 'mono',
          fontSize: [0, 0, 0, 1],
          letterSpacing: 'mono',
          color: 'secondary',
          pointerEvents: 'none',
        }}
      >
        ({xYearsMonth(xValue)}, {formatValue(yValue)}
        <Box as='span'>{currentVariable.unit}</Box>)
      </Box>
    )
  }

  return (
    <Box
      sx={{
        zIndex: 0,
        position: 'relative',
        width: '100%',
        height: '300px',
        pointerEvents: 'none',
      }}
    >
      {renderTimeAndData()}
      <Chart x={xLimits} y={yLimits} logy={logy} padding={{ top: 30 }}>
        {isOverview ? (
          <AxisChart xLimits={xLimits} yLimits={yLimits} />
        ) : (
          <>
            <Grid vertical />
            <Grid horizontal values={logy && logLabels} />
            <Ticks left values={logy && logLabels} />
            <Ticks bottom values={Array.from({ length: 16 }, (_, i) => i)} />
            <TickLabels
              left
              values={logy && logLabels}
              format={(d) => {
                if (logy) {
                  return formatValue(d, { 0.001: '.0e' })
                } else if (Math.abs(d) < 0.01) {
                  return <Box sx={{ mr: -2 }}>{d}</Box>
                } else {
                  return d
                }
              }}
            />
            <TickLabels bottom values={[0, 5, 10, 15]} />
          </>
        )}
        <AxisLabel units={yLabels.units} left>
          {yLabels.title}
        </AxisLabel>
        <AxisLabel units='years' bottom>
          Time
        </AxisLabel>
        <Plot
          sx={{
            pointerEvents: 'auto',
            cursor:
              (handleClick || handleHover) && xSelector && mousePosition
                ? 'pointer'
                : 'auto',
          }}
          {...xSelectorHandlers}
        >
          {colormap && (
            <ColormapGradient colormap={colormap} opacity={opacity} />
          )}
          <RenderLines
            linesObject={selectedLines}
            handleHover={handleHover}
            handleClick={handleClick}
            gradient={colormap ? true : false}
          />
          {isOverview && <ZeroLine xLimits={xLimits} />}
          {Object.keys(selectedLines).length && (
            <>
              {showActive && <ActiveLine selectedLines={selectedLines} />}
              {xSelector && mousePosition && renderXSelector(mousePosition)}
              <TimeIndicator yLimits={yLimits} isOverview={isOverview} />
              {xSelector &&
                isHovering &&
                renderPoint({
                  x: mousePosition,
                  y: xSelectorValue,
                  color: 'secondary',
                })}
              {point && renderPoint(point)}
            </>
          )}
        </Plot>
        {!xSelector && renderDataBadge()}
        {showActive && <OverviewBadge selectedLines={selectedLines} />}
        {regionDataLoading && (
          <Box
            sx={{
              position: 'absolute',
              top: '45%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              ml: 5,
            }}
          >
            <Spinner size={28} />
          </Box>
        )}
      </Chart>
    </Box>
  )
}

export default Timeseries
