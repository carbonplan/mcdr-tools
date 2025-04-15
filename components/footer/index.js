import StorageLoss from '../storage-loss'
import FooterWrapper from './footer-wrapper'
import InjectionMonth from './injection-month'
import TimeSlider from './time-slider'

const Footer = () => {
  return (
    <>
      <FooterWrapper bottom={[64, 64, 0, 0]}>
        <InjectionMonth />
      </FooterWrapper>
      <FooterWrapper bottom={[64, 64, 0, 0]}>
        <StorageLoss />
      </FooterWrapper>
      <FooterWrapper>
        <TimeSlider />
      </FooterWrapper>
    </>
  )
}

export default Footer
