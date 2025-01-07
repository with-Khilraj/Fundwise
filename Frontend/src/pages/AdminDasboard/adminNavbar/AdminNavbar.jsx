// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import './AdminNavbar.css';

// const AdminNavbar = ({ user }) => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('role');
//     navigate('/');
//   };

//   return (
//     <div className="top-navbar">
//       <div className="profile-section">
//         {user && (
//           <>
//             <span>{user.firstName}</span>
//             <Link to="/admin/profile" className="profile-link">Profile</Link>
//             <button onClick={handleLogout} className="logout-button">Logout</button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminNavbar;
