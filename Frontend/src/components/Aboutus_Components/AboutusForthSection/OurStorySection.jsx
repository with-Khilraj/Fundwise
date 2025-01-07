import React from 'react';
import './OurStorySection.css';
import OurStoryImage1 from '../../../assets/OurStoryImage1.png';
import OurStoryImage2 from '../../../assets/OurStoryImage2.png';
import OurStoryImage3 from '../../../assets/OurStoryImage3.png';
import OurStoryImage4 from '../../../assets/OurStoryImage4.png';

function OurStorySection() {
  return (
    <div className="storyContainer">
      <div className="textContent">
        <h1 className='OurStoryheading'>Our story</h1>
        <p className='OurStorytext1'>Our journey began with a simple belief: that collective action powered by technology can reshape the world. At fundwise, we're dedicated to providing a powerful crowdfunding platform where visions become realities. Whether you're an innovator, activist, or dreamer, our platform is a space where you can raise the necessary funds and find support from a community that shares your passion.</p>
        <p className='OurStorytext2'>From small personal projects to large-scale humanitarian efforts, we empower users to create change at every level. Launched in 2024, our platform has since been at the forefront of facilitating meaningful projects around the globe—transforming thousands of ideas into successful campaigns.</p>
        <p className='OurStorytext3'>Beyond just funding, Fundwise fosters a thriving community of forward-thinkers and change-makers. Each project brings together people from various walks of life, building connections that last well beyond the campaign. We are committed to nurturing a supportive ecosystem that not only funds but also celebrates and propagates shared success.".</p>
      </div>
      <div className="imagesContainer">
        <img src={OurStoryImage1} alt="Office Environment" />
        <img className='OurImage2' src={OurStoryImage2} alt="Team Meeting" />
        <img className='OurImage3' src={OurStoryImage3} alt="Discussion" />
        <img className='OurImage4' src={OurStoryImage4} alt="Casual Work" />
      </div>
    </div>
  );
}

export default OurStorySection;
