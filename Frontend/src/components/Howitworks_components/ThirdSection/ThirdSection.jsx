import React from 'react';
import './ThirdSection.css';

function ThirdSection() {
  return (
    <div className="howItWorksContainer">
      <h2 className="sectionTitle">How it works</h2>
      <div className="stepsContainer">
        {[
          { number: "01", title: "Create your Campaign", text: "Write a clear, personal story, and choose a specific decision maker so more people will understand and support your goal." },
          { number: "02", title: "Share your campaign", text: "In order to gain more signatures, share your campaign with your social networks and others who care about your cause." },
          { number: "03", title: "Build momentum", text: "Learn who and what influences your Decision Maker or Legislator and ask your supporters to help persuade them by sign the campaigner." },
          { number: "04", title: "Reach out to media", text: "Use the power of mass media to reach more people and decision makers by telling story to journalists and other media outlets." },
          { number: "05", title: "Engage decision maker", text: "Contact your decision maker, deliver your campaigner, and negotiate for change. We'll teach you how to prepare." },
          { number: "06", title: "Declare victory!", text: "Use fundwise declare victory tool. Tell your supporters that they helped create change and learn what comes next." }
        ].map(step => (
          <div className="stepCard" key={step.number}>
            <div className="stepHeader">{step.number}</div>
            <h3 className="stepTitle">{step.title}</h3>
            <p className="stepDescription">{step.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ThirdSection;
