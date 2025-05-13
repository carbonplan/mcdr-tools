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
            Here we index tools we have released for analyzing and mapping the
            efficiency and dynamics of marine CDR.{' '}
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
        </Column>
        <Column start={[1, 1, 7, 7]} width={[6, 8, 4, 4]}>
          <Button
            href='/research/dor-efficiency'
            size={'lg'}
            suffix={<RotatingArrow sx={{ color: 'blue' }} />}
          >
            Direct Ocean Removal
          </Button>
        </Column>
      </Row>
    </Layout>
  )
}

export default Index
