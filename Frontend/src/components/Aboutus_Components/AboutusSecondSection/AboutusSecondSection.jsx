import React from 'react';
import './AboutusSecondSection.css';

// Example image imports
import ActivistImage from '../../../assets/activist.png';
import LegislatorImage from '../../../assets/legislator.png';
import OrganizationImage from '../../../assets/organization.png';
import ReporterImage from '../../../assets/reporter.png';

function AboutusSecondSection() {
  const groups = [
    {
      title: "Activists",
      description: "Social activists can start social movements and connect supporters in their communities.",
      image: ActivistImage
    },
    {
      title: "Legislators",
      description: "Decision makers at the highest levels of government are engaging with their constituents.",
      image: LegislatorImage
    },
    {
      title: "Organizations",
      description: "Leading organizations are advancing their causes and mobilizing new supporters.",
      image: OrganizationImage
    },
    {
      title: "Reporters",
      description: "Journalists are sourcing powerful stories and covering campaigns hundreds of times a day.",
      image: ReporterImage
    }
  ];

  return (
    <div className="userGroupsContainer">
      <div className="textContent">
        <div className="headerText">
            <h3 className='whouse'>Who use platfrom?</h3>
            <p className='paragraph'>We firmly believe that when every individual raises their voice to address the pressing issues facing our society, and when we unite to take collective action, we pave the way toward a significantly better world. By engaging in open dialogues and collaborating on solutions, we can foster an environment where positive change is not just possible, but inevitable. It is through this shared commitment to improvement and understanding that we can transform our global community for the better</p>
           </div>
      </div>
      <div className="cardsContainer">
        {groups.map(group => (
          <div className="userCard" key={group.title}>
            <img src={group.image} alt={group.title} className="groupImage" />
            <h3 className="cardTitle">{group.title}</h3>
            <p className="cardDescription">{group.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AboutusSecondSection;
