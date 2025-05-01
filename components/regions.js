import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useCurrentStore, useVariables } from '../store'
import { useMapbox } from '@carbonplan/maps'
import { useThemeUI } from 'theme-ui'
import { useThemedColormap } from '@carbonplan/colormaps'
import { centerOfMass } from '@turf/turf'
import { createCombinedColormap } from '../utils/color'

const Regions = () => {
  const { map } = useMapbox()
  const { theme } = useThemeUI()
  const useStore = useCurrentStore()
  const variables = useVariables()

  const hoveredRegion = useStore((s) => s.hoveredRegion)
  const setHoveredRegion = useStore((s) => s.setHoveredRegion)
  const selectedRegion = useStore((s) => s.selectedRegion)
  const setSelectedRegion = useStore((s) => s.setSelectedRegion)
  const selectedRegionCenter = useStore((s) => s.selectedRegionCenter)
  const setSelectedRegionCenter = useStore((s) => s.setSelectedRegionCenter)
  const filterToRegionsInView = useStore((s) => s.filterToRegionsInView)
  const setRegionsInView = useStore((s) => s.setRegionsInView)
  const currentVariable = useStore((s) => s.currentVariable)
  const overviewLineData = useStore((s) => s.overviewLineData)
  const regionGeojson = useStore((s) => s.regionGeojson)
  const setRegionGeojson = useStore((s) => s.setRegionGeojson)
  const overviewElapsedTime = useStore((s) => s.overviewElapsedTime)
  const variableFamily = useStore((s) => s.variableFamily)
  const selectedRegionGeojson = useStore((s) => s.selectedRegionGeojson)
  const storageLoss = useStore((s) => s.storageLoss)
  const isDOR = useStore((s) => s.isDOR)

  const isDOREfficiency = variableFamily === 'EFFICIENCY' && isDOR

  const colormap = useThemedColormap(currentVariable.colormap, {
    format: 'hex',
    count: 100,
  })
  const negativeColormap = useThemedColormap('reds', {
    format: 'hex',
    count: colormap.length,
  })
  const combinedColormap = useMemo(
    () =>
      createCombinedColormap(
        colormap,
        negativeColormap,
        isDOREfficiency ? storageLoss : 0
      ),
    [colormap, negativeColormap, storageLoss, isDOREfficiency]
  )

  const colorLimits = currentVariable.colorLimits

  const hoveredRegionRef = useRef(hoveredRegion)
  const previouslySelectedRegionRef = useRef(null)

  //reused colors
  const transparent = 'rgba(0, 0, 0, 0)'
  const lineColor = theme.rawColors?.hinted
  const lineHighlightColor = [
    'case',
    ['boolean', ['feature-state', 'hover'], false],
    theme.rawColors?.primary,
    transparent,
  ]

  const colorExpression = useMemo(() => {
    if (!variables[variableFamily].overview) {
      return
    }

    const adjustedLower = colorLimits[0] - (isDOREfficiency ? storageLoss : 0)
    const adjustedUpper = colorLimits[1] - (isDOREfficiency ? storageLoss : 0)
    const totalRange = adjustedUpper - adjustedLower
    const fillColor = [
      'case',
      ['!=', ['feature-state', 'currentValue'], null],
      ['step', ['feature-state', 'currentValue'], combinedColormap[0]],
      transparent,
    ]
    const stepSize = totalRange / (combinedColormap.length - 1)
    for (let i = 1; i < combinedColormap.length; i++) {
      const t = adjustedLower + stepSize * i
      fillColor[2].push(t, combinedColormap[i])
    }
    return fillColor
  }, [
    combinedColormap,
    colorLimits,
    transparent,
    storageLoss,
    theme,
    isDOREfficiency,
  ])

  useEffect(() => {
    if (!regionGeojson || !map?.getSource('regions') || !overviewLineData) {
      return
    }

    regionGeojson.features.forEach((feature) => {
      const polygonId = feature.properties.polygon_id
      const rawValue =
        overviewLineData?.[polygonId]?.data?.[overviewElapsedTime][1] ?? 0
      const currentValue = rawValue - (isDOREfficiency ? storageLoss : 0)

      map.setFeatureState(
        {
          source: 'regions',
          id: polygonId,
        },
        {
          currentValue,
        }
      )
    })
    if (selectedRegion !== null) {
      map.setPaintProperty(
        'selected-region-fill',
        'fill-color',
        colorExpression
      )
    } else {
      map.setPaintProperty('regions-fill', 'fill-color', colorExpression)
    }
  }, [
    map,
    overviewLineData,
    regionGeojson,
    currentVariable,
    overviewElapsedTime,
    storageLoss,
    isDOREfficiency,
  ])

  const handleMouseMove = (e) => {
    map.getCanvas().style.cursor = 'pointer'
    if (e.features.length > 0) {
      const polygonId = e.features[0].properties.polygon_id
      if (polygonId !== hoveredRegionRef.current) {
        setHoveredRegion(polygonId)
      }
    }
  }

  const handleMouseLeave = () => {
    map.getCanvas().style.cursor = ''
    setHoveredRegion(null)
  }

  const handleClick = (e) => {
    if (e.features.length > 0) {
      const feature = e.features[0]
      const polygonId = feature.properties.polygon_id
      const center = [e.lngLat.lng, e.lngLat.lat]
      setSelectedRegion(polygonId)
      setSelectedRegionCenter(center)
    }
  }

  const addRegions = async () => {
    fetch(
      'https://carbonplan-oae-efficiency.s3.us-west-2.amazonaws.com/regions.geojson'
    )
      .then((response) => response.json())
      .then((data) => {
        setRegionGeojson(data)
        try {
          if (!map.getSource('regions')) {
            map.addSource('regions', {
              type: 'geojson',
              data: data,
              promoteId: 'polygon_id',
              maxzoom: 0,
            })
          }

          map.addLayer({
            id: 'regions-fill',
            type: 'fill',
            source: 'regions',
            paint: {
              'fill-color': colorExpression,
              'fill-outline-color': transparent,
            },
          })

          map.addLayer({
            id: 'regions-line',
            type: 'line',
            source: 'regions',
            paint: {
              'line-color': lineColor,
              'line-width': 1,
            },
          })

          map.addLayer({
            id: 'regions-hover',
            type: 'line',
            source: 'regions',
            paint: {
              'line-color': lineHighlightColor,
              'line-width': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                2, // Width when hovered
                0, // Default width
              ],
            },
          })

          map.addLayer({
            id: 'selected-region-fill',
            type: 'fill',
            source: 'regions',
            paint: {
              'fill-color': colorExpression,
              'fill-outline-color': transparent,
              'fill-opacity': [
                'case',
                [
                  'all',
                  ['boolean', ['feature-state', 'selected'], false],
                  ['boolean', ['feature-state', 'overview'], false],
                ],
                1, // Opacity when an overview var is selected is active
                0, // Default opacity
              ],
            },
          })
          map.addLayer({
            id: 'regions-selected',
            type: 'line',
            source: 'regions',
            paint: {
              'line-color': theme.rawColors.primary,
              'line-width': [
                'case',
                ['boolean', ['feature-state', 'selected'], false],
                2, // Width when hovered
                0, // Default width
              ],
            },
          })

          map.on('mousemove', 'regions-fill', handleMouseMove)
          map.on('mouseleave', 'regions-fill', handleMouseLeave)
          map.on('click', 'regions-fill', handleClick)
        } catch (error) {
          console.error('Error fetching or adding regions:', error)
        }
      })
  }

  useEffect(() => {
    addRegions()
  }, [])

  useEffect(() => {
    if (map && map.getSource('regions')) {
      if (hoveredRegion !== hoveredRegionRef.current) {
        if (hoveredRegionRef.current !== null) {
          map.setFeatureState(
            {
              source: 'regions',
              id: hoveredRegionRef.current,
            },
            { hover: false }
          )
        }

        if (hoveredRegion !== null) {
          map.setFeatureState(
            {
              source: 'regions',
              id: hoveredRegion,
            },
            { hover: true }
          )
        }

        hoveredRegionRef.current = hoveredRegion
      }
    }
  }, [map, hoveredRegion])

  const handleRegionsInView = useCallback(() => {
    if (selectedRegion !== null) return
    if (map.getLayer('regions-fill')) {
      const features = map.queryRenderedFeatures({
        layers: ['regions-fill'],
      })
      const ids = features.map((f) => f.properties.polygon_id)
      setRegionsInView(ids)
    }
  }, [map, setRegionsInView])

  const toggleLayerVisibilities = useCallback(
    (visible) => {
      if (!map) return
      const visibility = visible ? 'visible' : 'none'
      map.setLayoutProperty('regions-line', 'visibility', visibility)
      map.setLayoutProperty('regions-hover', 'visibility', visibility)
      map.setLayoutProperty('regions-fill', 'visibility', visibility)
    },
    [map]
  )

  useEffect(() => {
    if (!map || !map.getSource('regions')) return

    if (previouslySelectedRegionRef.current !== null) {
      map.removeFeatureState(
        { source: 'regions', id: previouslySelectedRegionRef.current },
        'selected'
      )
    }

    previouslySelectedRegionRef.current = selectedRegion

    if (selectedRegion !== null) {
      map.setFeatureState(
        {
          source: 'regions',
          id: selectedRegion,
        },
        { selected: true }
      )
      map.setFeatureState(
        {
          source: 'regions',
          id: selectedRegion,
        },
        { overview: variables[variableFamily].overview }
      )
      toggleLayerVisibilities(false)
    } else {
      toggleLayerVisibilities(true)
    }
  }, [selectedRegion, map, variableFamily])

  useEffect(() => {
    if (!filterToRegionsInView) {
      map.off('moveend', handleRegionsInView)
      setRegionsInView(null)
    } else {
      map.on('moveend', handleRegionsInView)
      handleRegionsInView()
    }
    return () => {
      map.off('moveend', handleRegionsInView)
    }
  }, [map, handleRegionsInView, filterToRegionsInView])

  useEffect(() => {
    // get center and fly to selected region when selected via time series
    if (typeof selectedRegion === 'number' && !selectedRegionCenter) {
      const center = centerOfMass(selectedRegionGeojson).geometry.coordinates
      setSelectedRegionCenter(center)
      const bounds = map.getBounds()
      if (!bounds.contains(center)) {
        setTimeout(() => {
          // timeout prevents warnings with flushSync during react render
          map.jumpTo({ center }) // flyTo is choppy in this case
        }, 0)
      }
    }
  }, [
    selectedRegion,
    selectedRegionCenter,
    regionGeojson,
    map,
    setSelectedRegionCenter,
  ])

  useEffect(() => {
    if (map && map.getSource('regions') && map.getLayer('regions-line')) {
      map.setPaintProperty('regions-line', 'line-color', lineColor)
      map.setPaintProperty('regions-hover', 'line-color', lineHighlightColor)
      map.setPaintProperty(
        'regions-selected',
        'line-color',
        theme.rawColors?.primary
      )
      // Update fill colors when theme changes
      map.setPaintProperty('regions-fill', 'fill-color', colorExpression)
      map.setPaintProperty(
        'selected-region-fill',
        'fill-color',
        colorExpression
      )
    }
  }, [map, theme, colorExpression])

  return null
}

export default Regions
