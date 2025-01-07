import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './UserList.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [userToEdit, setUserToEdit] = useState(null);
  const [editFirstName, setEditFirstName] = useState('');
  const [editLastName, setEditLastName] = useState('');
  const [editEmail, setEditEmail] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Token:', token); // Debugging: Log the token
      const response = await axios.get('http://localhost:5500/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Response:', response.data); // Debugging: Log the response data
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users', error.response ? error.response.data : error.message);
    }
  };

  const confirmDelete = (id) => {
    setUserToDelete(id);
    setShowDeletePopup(true);
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5500/api/admin/users/${userToDelete}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter((user) => user._id !== userToDelete));
      setShowDeletePopup(false);
      setUserToDelete(null);
      toast.success('User successfully deleted');
    } catch (error) {
      console.error('Error deleting user', error);
      setShowDeletePopup(false);
      setUserToDelete(null);
      toast.error('Error deleting user');
    }
  };

  const handleEdit = (user) => {
    setUserToEdit(user._id);
    setEditFirstName(user.firstName);
    setEditLastName(user.lastName);
    setEditEmail(user.email);
    setShowEditPopup(true);
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5500/api/admin/users/${userToEdit}`, {
        firstName: editFirstName,
        lastName: editLastName,
        email: editEmail
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.map((user) => (user._id === userToEdit ? { ...user, firstName: editFirstName, lastName: editLastName, email: editEmail } : user)));
      setShowEditPopup(false);
      setUserToEdit(null);
      toast.success('User successfully updated');
    } catch (error) {
      console.error('Error updating user', error);
      setShowEditPopup(false);
      setUserToEdit(null);
      toast.error('Error updating user');
    }
  };

  const closeDeletePopup = () => {
    setShowDeletePopup(false);
    setUserToDelete(null);
  };

  const closeEditPopup = () => {
    setShowEditPopup(false);
    setUserToEdit(null);
  };

  return (
    <div className="user-list">
      <h2>User List</h2>
      <ToastContainer />
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(users) ? (
            users.map((user) => (
              <tr key={user._id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>
                  <button className="edit-button" onClick={() => handleEdit(user)}>Edit</button>
                  <button className="delete-button" onClick={() => confirmDelete(user._id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No users found.</td>
            </tr>
          )}
        </tbody>
      </table>
      {showDeletePopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Are you sure you want to delete?</h3>
            <button className="popup-button delete-button" onClick={handleDelete}>Yes</button>
            <button className="popup-button cancel-button" onClick={closeDeletePopup}>No</button>
          </div>
        </div>
      )}
      {showEditPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Edit User</h3>
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                value={editFirstName}
                onChange={(e) => setEditFirstName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                value={editLastName}
                onChange={(e) => setEditLastName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
              />
            </div>
            <button className="popup-button update-button" onClick={handleUpdate}>Update</button>
            <button className="popup-button cancel-button" onClick={closeEditPopup}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
