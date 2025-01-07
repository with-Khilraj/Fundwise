import React from 'react';
import './Content.css';

const Content = ({ title }) => {
  return (
    <div className="content">
      <h1>{title}</h1>
      <p>This is the {title.toLowerCase()} page content.</p>
    </div>
  );
};

export default Content;
