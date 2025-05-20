import React, { useState } from 'react';
import '../styles/navbar.css';  

const NavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleToggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  return (
    <div className="create-navbar">
      <div className="navbar-left">
        <div className="logo">LAUNDRY</div>
      </div>
      <div className="navbar-right">
        <a href="#">Pricing</a>
        <a href="#">Career</a>

        <div className="user-profile" onClick={handleToggleDropdown}>
          User Name

          {isDropdownOpen && (
            <div className="dropdown-panel">
              <div className="user-info">
                <span className="user-name">John Doe</span>
                <span className="edit-icon">✏️</span>
              </div>
              <button className="logout-button">Logout</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
