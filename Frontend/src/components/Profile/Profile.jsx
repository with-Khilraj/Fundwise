import React, { useState, useEffect } from 'react';
import { useUser } from '../Context/UserContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Profile.css';

const Profile = () => {
  const { user, setUser } = useUser();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ ...user });
  const [profileImage, setProfileImage] = useState(null);
  const [initials, setInitials] = useState('');

  useEffect(() => {
    setFormData({ ...user });
    if (user) {
      const nameInitials = user.firstName.charAt(0) + user.lastName.charAt(0);
      setInitials(nameInitials);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const formDataToSend = new FormData();
      formDataToSend.append('firstName', formData.firstName);
      formDataToSend.append('lastName', formData.lastName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('address', formData.address);
      formDataToSend.append('nation', formData.nation);
      formDataToSend.append('gender', formData.gender);
      formDataToSend.append('dob', formData.dob);
      if (profileImage) {
        formDataToSend.append('profileImage', profileImage);
      }

      const response = await axios.put('http://localhost:5500/api/auth/update-profile', formDataToSend, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.success) {
        setUser(response.data.user);
        setEditMode(false);
        toast.success('Profile updated successfully!');
      } else {
        toast.error('Failed to update profile.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Error updating profile.');
    }
  };

  const handleCancel = () => {
    setFormData({ ...user });
    setEditMode(false);
  };

  return (
    <div className="profile-container">
      <h1 className="profile-title">My Profile</h1>
      <div className="profile-content">
        <div className="profile-left">
          {profileImage ? (
            <img src={URL.createObjectURL(profileImage)} alt="Profile" className="profile-image" />
          ) : (
            <div className="profile-initials">{initials}</div>
          )}
          {editMode && (
            <input className = "input-profile"type="file" name="profileImage" onChange={handleImageChange} />
          )}
        </div>
        <div className="profile-right">
          <div className="profile-fields">
            <div className="profile-field">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                disabled={!editMode}
              />
            </div>
            <div className="profile-field">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                disabled={!editMode}
              />
            </div>
            <div className="profile-field">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!editMode}
              />
            </div>
            <div className="profile-field">
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!editMode}
              />
            </div>
            <div className="profile-field">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                disabled={!editMode}
              />
            </div>
            <div className="profile-field">
              <label>Nation</label>
              <input
                type="text"
                name="nation"
                value={formData.nation}
                onChange={handleChange}
                disabled={!editMode}
              />
            </div>
            <div className="profile-field">
              <label>Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                disabled={!editMode}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="profile-field">
              <label>Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob ? formData.dob.split('T')[0] : ''}
                onChange={handleChange}
                disabled={!editMode}
              />
            </div>
          </div>
          <div className="profile-buttons">
            {editMode ? (
              <>
                <button className="save-button" onClick={handleSave}>Save</button>
                <button className="cancel-button" onClick={handleCancel}>Cancel</button>
              </>
            ) : (
              <button className="edit-button" onClick={() => setEditMode(true)}>Edit Profile</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
