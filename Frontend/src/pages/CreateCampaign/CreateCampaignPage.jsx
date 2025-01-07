import React, {useEffect} from 'react'
import CreateCampaign from '../../components/Campaign_Component/CreateCampaign'

const CreateCampaignPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
        <CreateCampaign/>
    </div>
  )
}

export default CreateCampaignPage
