import React, { useState, useEffect } from 'react';
import '../styles/profile.css';
import { getToken } from '../AuthOPration';

const ProfileComponent = () => {
  const URL = 'https://laundry-server-b7j6.onrender.com'||'http://localhost:8000';
  const [user, setUser] = useState({
    email: '',
    oldPassword: '',
    newPassword: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = getToken('token');
        const response = await fetch(`${URL}/api/v1/user`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error('Failed to fetch user data');
        const data = await response.json();
        setUser((prev) => ({ ...prev, email: data.email, }));
      } catch (err) {
        setError('Error fetching user data');
      }
    };
    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const token = getToken('token');
      const response = await fetch(`${URL}/api/v1/user/update-profile`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: user.email,
          oldPassword: user.oldPassword,
          newPassword: user.newPassword,
        }),
      });

      const data = await response.json();
      console.log(data.message);


      if (!response.ok) throw new Error(data.message || 'Update failed');

      setSuccess('Profile updated successfully');
      setIsEditing(false);
      setUser((prev) => ({ ...prev, oldPassword: '', newPassword: '' }));
    } catch (err) {
      setError(err.message || 'Error updating profile');
    }
  };

  const toggleEdit = (e) => {
    e.stopPropagation();
    setIsEditing(!isEditing);
    setError('');
    setSuccess('');
  };

  return (
    <div className="profile-container" onClick={(e) => e.stopPropagation()}>
      <h3 className="profile-title">User Profile</h3>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      {isEditing ? (
        <form onSubmit={handleSubmit} className="profile-form" onClick={(e) => e.stopPropagation()}>
          <div>
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>

          <div>
            <label className="form-label">Current Password</label>
            <input
              type="password"
              name="oldPassword"
              value={user.oldPassword}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>

          <div>
            <label className="form-label">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={user.newPassword}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter new password"
            />
          </div>

          <div className="form-buttons">
            <button type="button" onClick={toggleEdit} className="cancel-button">
              Cancel
            </button>
            <button type="submit" className="save-button">
              Save
            </button>
          </div>
        </form>
      ) : (
        <div className="profile-details">
          <div>
            <p className="detail-label">Email</p>
            <p className="detail-value">{user.email || 'Loading...'}</p>
          </div>
          <div>
            <p className="detail-label">Password</p>
            <p className="detail-value">********</p>
          </div>
          <div className="edit-button-container">
            <button onClick={toggleEdit} className="edit-button">
              Edit Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileComponent;
