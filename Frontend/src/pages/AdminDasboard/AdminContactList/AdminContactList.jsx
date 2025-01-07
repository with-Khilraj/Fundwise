import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './AdminContactList.css';

const AdminContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get('http://localhost:5500/api/contacts', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const confirmDelete = (id) => {
    setContactToDelete(id);
    setShowPopup(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5500/api/contacts/${contactToDelete}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setContacts(contacts.filter(contact => contact._id !== contactToDelete));
      setShowPopup(false);
      setContactToDelete(null);
      toast.success('Contact deleted successfully');
    } catch (error) {
      console.error('Error deleting contact:', error.response ? error.response.data : error.message);
      setShowPopup(false);
      setContactToDelete(null);
      toast.error('Error deleting contact');
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setContactToDelete(null);
  };

  return (
    <div className="contact-list">
      <h2>Contact List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Subject</th>
            <th>Message</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(contact => (
            <tr key={contact._id}>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.subject}</td>
              <td>{contact.message}</td>
              <td>{new Date(contact.date).toLocaleString()}</td>
              <td>
                <button
                  className="delete-button"
                  onClick={() => confirmDelete(contact._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Are you sure you want to delete?</h3>
            <button className="popup-button delete-button" onClick={handleDelete}>Yes</button>
            <button className="popup-button cancel-button" onClick={closePopup}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminContactList;
