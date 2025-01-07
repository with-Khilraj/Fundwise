import React, {useEffect} from 'react'
import AboutusFirstSection from '../../components/Aboutus_Components/AboutusFirstSection/AboutusFirstSection'
import AboutusSecondSection from '../../components/Aboutus_Components/AboutusSecondSection/AboutusSecondSection'
import AboutusThirdSection from '../../components/Aboutus_Components/AboutusThirdSection/AboutusThirdSection'
import OurStorySection from '../../components/Aboutus_Components/AboutusForthSection/OurStorySection'

const Aboutuspage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
        <AboutusFirstSection/>
        <AboutusSecondSection/>
        <AboutusThirdSection/>
        <OurStorySection/>
      
    </div>
  )
}

export default Aboutuspage
