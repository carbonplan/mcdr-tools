import { Box } from 'theme-ui'
import {
  Layout,
  Heading,
  Row,
  Column,
  Button,
  Link,
} from '@carbonplan/components'
import { RotatingArrow } from '@carbonplan/icons'

const Index = () => {
  return (
    <Layout
      description={
        'Index of tools visualizing marine CDR efficiency and dynamics.'
      }
      title='Mapping Marine CDR – CarbonPlan'
      nav={'research'}
    >
      <Heading>Mapping Marine CDR</Heading>
      <Row>
        <Column start={[1, 1, 2, 2]} width={[6, 6, 6, 6]}>
          <Box sx={{ mb: [5, 6, 7, 8] }}>
            We created tools to map the efficiency of two different methods of
            ocean-based CDR — ocean alkalinity enhancement and direct ocean
            removal. Both tools allow users to explore how differences in
            location and season affect how much carbon a marine CDR intervention
            is able to remove from the atmosphere over time.{' '}
            <Link href='/research/mcdr-tools-about'>
              Read more about the tools
            </Link>
            .
          </Box>
        </Column>
      </Row>
      <Row>
        <Column
          start={[1, 1, 2, 2]}
          width={[6, 8, 4, 4]}
          sx={{ mt: [5, 5, 0, 0] }}
        >
          <Button
            href='/research/oae-efficiency'
            size={'lg'}
            suffix={<RotatingArrow sx={{ color: 'blue' }} />}
          >
            Ocean Alkalinity{' '}
            <Box as='br' sx={{ display: ['none', 'none', 'block'] }} />
            Enhancement
          </Button>
          <Box sx={{ mt: 3 }}>
            Adding alkalinity to the ocean, increasing its ability to absorb
            CO₂.
          </Box>
        </Column>
        <Column
          start={[1, 1, 7, 7]}
          width={[6, 8, 4, 4]}
          sx={{ mt: [5, 5, 0, 0] }}
        >
          <Button
            href='/research/dor-efficiency'
            size={'lg'}
            suffix={<RotatingArrow sx={{ color: 'blue' }} />}
          >
            Direct Ocean{' '}
            <Box as='br' sx={{ display: ['none', 'none', 'block'] }} /> Removal
          </Button>
          <Box sx={{ mt: 3 }}>
            Extracting CO₂ from the ocean, creating space for it to re-absorb
            CO₂.
          </Box>
        </Column>
      </Row>
    </Layout>
  )
}

export default Index
