import StorageLoss from '../storage-loss'
import FooterWrapper from './footer-wrapper'
import InjectionMonth from './injection-month'
import TimeSlider from './time-slider'
import { useRouter } from 'next/router'

const Footer = () => {
  const router = useRouter()
  const isDORRoute = router.pathname.includes('dor-efficiency')

  return (
    <>
      <FooterWrapper bottom={[64, 64, 0, 0]}>
        <InjectionMonth />
      </FooterWrapper>
      <FooterWrapper>
        <TimeSlider />
      </FooterWrapper>
      {isDORRoute && (
        <FooterWrapper bottom={[64, 64, 0, 0]}>
          <StorageLoss />
        </FooterWrapper>
      )}
    </>
  )
}

export default Footer
