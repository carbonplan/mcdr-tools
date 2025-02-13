import StorageDurability from '../storage-durability'
import FooterWrapper from './footer-wrapper'
import InjectionMonth from './injection-month'
import TimeSlider from './time-slider'

const Footer = () => {
  return (
    <>
      <FooterWrapper bottom={[64, 64, 0, 0]}>
        <StorageDurability />
      </FooterWrapper>
      <FooterWrapper bottom={[64, 64, 0, 0]}>
        <InjectionMonth />
      </FooterWrapper>
      <FooterWrapper>
        <TimeSlider />
      </FooterWrapper>
    </>
  )
}

export default Footer
