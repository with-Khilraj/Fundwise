import React, {useEffect} from 'react'
import FAQ from '../../components/FAQ/FAQ'

const FAQpage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
        <FAQ/>
    </div>
  )
}

export default FAQpage
