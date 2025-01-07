// import React from "react";
// import "./Card.css";

// const Card = ({ date, title, description, donations, imageUrl }) => {
//   return (
//     <div className="card">
//       <img src={imageUrl} alt={title} className="card-image" />
//       <div className="card-content">
//         <p className="card-date">{date}</p>
//         <h3 className="card-title">{title}</h3>
//         <p className="card-description">{description}</p>
//         <p className="card-donations">{donations} donations</p>
//         <button className="card-button">Donate now</button>
//       </div>
//     </div>
//   );
// };

// export default Card;

// import React from "react";
// import "./Card.css";
// import { Link } from "react-router-dom";

// const Card = ({ id, date, title, description, donations, imageUrl }) => {
//   return (
//     <Link to={`/campaign/${id}`} state={{ campaign: { id, date, title, description, donations, imageUrl, raised: 23000, goal: 55000, daysLeft: 55, donators: ["Bipin Thapa", "Aakash Chaudhary", "Bishal Khadka", "Siddharth Gurung", "Samir Sherchan"] } }} className="card-link">
//       <div className="card">
//         <img src={imageUrl} alt={title} className="card-image" />
//         <div className="card-content">
//           <p className="card-date">{date}</p>
//           <h3 className="card-title">{title}</h3>
//           <p className="card-description">{description.slice(0, 60)}...</p> {/* Trimming the description to fit in two lines */}
//           <p className="card-donations">{donations} donations</p>
//           <button className="card-button">Donate now</button>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default Card;

import React from "react";
import "./Card.css";
import { Link } from "react-router-dom";

const truncateText = (text, limit) => {
  if (text.length > limit) {
    return text.substring(0, limit) + "...";
  }
  return text;
};

const Card = ({ id, date, title, description, donations, imageUrl }) => {
  const truncatedDescription = truncateText(description, 100); // Truncate description to 100 characters

  return (
    <Link to={`/campaign/${id}`} state={{ campaign: { id, date, title, description, donations, imageUrl, raised: 23000, goal: 55000, daysLeft: 55, donators: ["Bipin Thapa", "Aakash Chaudhary", "Bishal Khadka", "Siddharth Gurung", "Samir Sherchan"] } }} className="card-link">
      <div className="card">
        <img src={imageUrl} alt={title} className="card-image" />
        <div className="card-content">
          <p className="card-date">{date}</p>
          <h3 className="card-title">{title}</h3>
          <p className="card-description">{truncatedDescription}</p>
          <p className="card-donations">{donations} donations</p>
          <button className="card-button">Donate now</button>
        </div>
      </div>
    </Link>
  );
};

export default Card;
