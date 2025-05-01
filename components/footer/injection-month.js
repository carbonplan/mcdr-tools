import { Filter } from '@carbonplan/components'
import { Box, Flex } from 'theme-ui'

import { useCurrentStore } from '../../store'

const sx = {
  label: {
    fontFamily: 'mono',
    letterSpacing: 'mono',
    textTransform: 'uppercase',
    color: 'secondary',
    fontSize: [1, 1, 1, 2],
  },
}

const InjectionMonth = () => {
  const useStore = useCurrentStore()
  const injectionSeason = useStore((state) => state.injectionSeason)
  const setInjectionSeason = useStore((state) => state.setInjectionSeason)

  return (
    <Flex sx={{ gap: [3, 4, 4, 5], mt: -2, mb: -2 }}>
      <Box sx={{ ...sx.label, pt: '2px' }}>Intervention month</Box>

      <Filter
        values={injectionSeason}
        setValues={(val) => setInjectionSeason(val)}
        sx={{ '[role="checkbox"]': { fontSize: [1, 1, 1, 2] } }}
      />
    </Flex>
  )
}

export default InjectionMonth
