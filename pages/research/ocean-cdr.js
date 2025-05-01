import { Box } from 'theme-ui'
import { Layout, Heading, Row, Column, Button } from '@carbonplan/components'
import { RotatingArrow } from '@carbonplan/icons'

const Index = () => {
  return (
    <Layout
      description={
        'Index of tools visualizing ocean CDR efficiency and dynamics.'
      }
      title='Ocean CDR – CarbonPlan'
      nav={'research'}
    >
      <Heading>Ocean Carbon Dioxide Removal</Heading>
      <Row>
        <Column start={[1, 1, 2, 2]} width={[6, 8, 10, 10]}>
          <Box sx={{ mb: [5, 6, 7, 8] }}>
            Here we index tools we have released for analyzing and mapping ocean
            CDR.
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
          <Box sx={{ mt: [1, 2, 3, 4], mb: [5, 6, 7, 8] }}>
            Mapping the efficiency of ocean alkalinity enhancement.
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
          <Box sx={{ mt: [1, 2, 3, 4], mb: [5, 6, 7, 8] }}>
            Mapping the efficiency of direct ocean removal.
          </Box>
        </Column>
      </Row>
    </Layout>
  )
}

export default Index
