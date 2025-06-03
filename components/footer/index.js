import StorageLoss from '../storage-loss'
import FooterWrapper from './footer-wrapper'
import InjectionMonth from './injection-month'
import TimeSlider from './time-slider'
import useStore from '../../store'
import { Flex } from 'theme-ui'

const Footer = () => {
  const isDOR = useStore((s) => s.isDOR)
  return (
    <Flex
      sx={{
        flexDirection: 'column',
        position: ['absolute', 'absolute', 'relative', 'relative'],
        bottom: [0, 0, 'auto', 'auto'],
        width: ['100%', '100%', 'auto', 'auto'],
      }}
    >
      <FooterWrapper>
        <InjectionMonth />
      </FooterWrapper>
      <FooterWrapper>
        <TimeSlider />
      </FooterWrapper>
      {isDOR && (
        <FooterWrapper>
          <StorageLoss />
        </FooterWrapper>
      )}
    </Flex>
  )
}

export default Footer
