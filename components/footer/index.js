import StorageLoss from '../storage-loss'
import FooterWrapper from './footer-wrapper'
import InjectionMonth from './injection-month'
import TimeSlider from './time-slider'
import useStore from '../../store'

const Footer = () => {
  const isDOR = useStore((s) => s.isDOR)
  return (
    <>
      <FooterWrapper bottom={isDOR ? [128, 128, 0, 0] : [64, 64, 0, 0]}>
        <InjectionMonth />
      </FooterWrapper>
      <FooterWrapper bottom={isDOR ? [64, 64, 0, 0] : [0, 0, 0, 0]}>
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
