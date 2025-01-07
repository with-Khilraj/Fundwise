import React from 'react'
import Title from '../../components/Allcampaign_Component/Title/Title'
// import CampaignFilter from '../../components/Allcampaign_Component/ShowCompaign/CampaignFilter'
// import CampaignCard from '../../components/Allcampaign_Component/CampaignCard/CampaignCard'
import CampaignPage from '../../components/Allcampaign_Component/CampaignPage/CampaignPage'

const Allcampaign = () => {
  return (
    <div>
        {/* <CampaignFilter/>
        <CampaignCard/> */}
        <Title/>
        <CampaignPage/>
        
    </div>
  )
}

export default Allcampaign
