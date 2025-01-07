import React, {useEffect} from 'react'
import CampaignDetail from '../../components/DonationNow_component/CampaignDetail'

const CampaignDetailPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
        <CampaignDetail/>
    </div>
  )
}

export default CampaignDetailPage
