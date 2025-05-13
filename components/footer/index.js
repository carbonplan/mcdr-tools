import StorageLoss from '../storage-loss'
import FooterWrapper from './footer-wrapper'
import InjectionMonth from './injection-month'
import TimeSlider from './time-slider'
import { useCurrentStore } from '../../store'

const Footer = () => {
  const useStore = useCurrentStore()
  const isDOR = useStore((s) => s.isDOR)
  return (
    <>
      <FooterWrapper bottom={[128, 128, 0, 0]}>
        <InjectionMonth />
      </FooterWrapper>
      <FooterWrapper bottom={[64, 64, 0, 0]}>
        <TimeSlider />
      </FooterWrapper>
      {isDOR && (
        <FooterWrapper>
          <StorageLoss />
        </FooterWrapper>
      )}
    </>
  )
}

export default Footer
