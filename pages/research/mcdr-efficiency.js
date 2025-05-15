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
      title='Marine CDR – CarbonPlan'
      nav={'research'}
    >
      <Heading>Marine Carbon Dioxide Removal</Heading>
      <Row>
        <Column start={[1, 1, 2, 2]} width={[6, 8, 10, 10]}>
          <Box sx={{ mb: [5, 6, 7, 8] }}>
            Below are two tools that map the efficiency of CDR in the oceans
            using two distinct methods - ocean alkalinity enhancement and direct
            ocean removal. Both tools allow users to explore how a marine CDR
            intervention taking place in a certain region and season leads to
            carbon removal over time.{' '}
            <Link href='/research/about-mcdr-efficiency-tools'>
              Read more about the tools
            </Link>
            .
          </Box>
        </Column>
      </Row>
      <Row>
        <Column start={[1, 1, 2, 2]} width={[6, 8, 4, 4]}>
          <Button
            href='/research/oae-efficiency'
            size={'lg'}
            suffix={<RotatingArrow sx={{ color: 'blue' }} />}
          >
            Ocean Alkalinity Enhancement
          </Button>
          <Box sx={{ mt: 3 }}>
            Adding alkalinity to the ocean and increasing its ability to absorb
            CO₂.
          </Box>
        </Column>
        <Column start={[1, 1, 7, 7]} width={[6, 8, 4, 4]}>
          <Button
            href='/research/dor-efficiency'
            size={'lg'}
            suffix={<RotatingArrow sx={{ color: 'blue' }} />}
          >
            Direct Ocean Removal
          </Button>
          <Box sx={{ mt: 3 }}>
            Extracting CO₂ from the ocean and creating space for the ocean to
            re-absorb CO₂.
          </Box>
        </Column>
      </Row>
    </Layout>
  )
}

export default Index
