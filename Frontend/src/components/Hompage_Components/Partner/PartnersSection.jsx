import React from 'react';
import './PartnersSection.css';

import microsoftLogo from '../../../assets/Microsoft.png';
import saveTheChildrenLogo from '../../../assets/SaveChildern.png';
import conservationInternationalLogo from '../../../assets/Conservation.png';
import unicefLogo from '../../../assets/unicef.png';
import riverIslandLogo from '../../../assets/RiverIsland.png';
import helloWalletLogo from '../../../assets/HelloWalet.png';
import americanRedCrossLogo from '../../../assets/RedCross.png';
import palangMerahIndonesiaLogo from '../../../assets/Palang.png';

const partners = [
  { name: 'Microsoft', logo: microsoftLogo, url: 'https://www.microsoft.com/en-us/nonprofits/engage-donors-constituents' },
  { name: 'Save the Children', logo: saveTheChildrenLogo, url: 'https://www.savethechildren.org' },
  { name: 'Conservation International', logo: conservationInternationalLogo, url: 'https://www.conservation.org' },
  { name: 'UNICEF', logo: unicefLogo, url: 'https://www.unicef.org' },
  { name: 'River Island', logo: riverIslandLogo, url: 'https://www.riverisland.com' },
  { name: 'HelloWallet', logo: helloWalletLogo, url: 'https://www.hellowallet.com' },
  { name: 'American Red Cross', logo: americanRedCrossLogo, url: 'https://www.redcross.org' },
  { name: 'Palang Merah Indonesia', logo: palangMerahIndonesiaLogo, url: 'https://www.palangmerah.or.id' },
];

const PartnersSection = () => {
  return (
    <div className="partners-section">
        <p className='ourpartner'>OUR PARTNER</p>
      <h1>More than 50 <span>Companies</span> and <span>Institutions</span> that trust us over the years</h1>
      <div className="partners-logos">
      {partners.map((partner, index) => (
          <a key={index} href={partner.url} target="_blank" rel="noopener noreferrer">
            <img src={partner.logo} alt={partner.name} />
          </a>
        ))}
      </div>
    </div>
  );
};

export default PartnersSection;
