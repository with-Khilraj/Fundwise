import React, {useEffect} from 'react'
import GuideComponent from '../../components/Howitworks_components/Howtouse/GuideComponent'
import SeconSection from '../../components/Howitworks_components/SecondSecontion/SeconSection'
import ThirdSection from '../../components/Howitworks_components/ThirdSection/ThirdSection'
import ForthSection from '../../components/Howitworks_components/ForthSection/ForthSection'

const Howitworkspage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
        <GuideComponent/>
        <SeconSection/>
        <ThirdSection/>
        <ForthSection/>
    </div>
  )
}

export default Howitworkspage
