
import React, { useEffect, useState } from 'react'

import { User } from 'lucide-react'
import '../styles/navbar.css'
import { useNavigate } from 'react-router-dom';
import { getToken, removeToken } from '../AuthOPration';
import { Edit, LogOut } from 'lucide-react'
import ProfileComponent from './Profile';

const NavBar = () => {
  const URL=process.env.REACT_APP_API_URL;
  const navigate = useNavigate()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [edit, setEdit] = useState(false)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleToggleDropdown = (e) => {
    e.stopPropagation()
    setIsDropdownOpen(prev => !prev);
  };
  useEffect(() => {
    const token = getToken('token')
    fetch(`${URL}/api/v1/user`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },

    }).then((res) => res.json()).
      then((data) => {
        setName(data.data.name);
        setEmail(data.data.email)
      })

  }, []);

  const HandleProfile = (e) => {
    e.stopPropagation()
    setEdit(prev => !prev)
  }
  useEffect(() => {
    const handleClickOutside = () => {
      setIsDropdownOpen(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  return (
    <div className="create-navbar">
      <div className="navbar-left">
        <div className="logo">LAUNDRY</div>

      </div>
      <div className="navbar-right">
        <a href="#">Pricing</a>
        <a href="#">Career</a>

        <div className="user-profile" onClick={handleToggleDropdown} >

          <User />
          {name || "User Name"}

          {isDropdownOpen && (
            <div className="dropdown-panel">
              <div className="user-info" onClick={HandleProfile}>
                <div className='profile' > <User size={30} color='black' />Profile</div>
              </div>
              {
                edit && <ProfileComponent />
              }
              <button className="logout-button" onClick={() => {
                removeToken('token')
                navigate('/')
              }}>
                <LogOut className='Logout-svg' size={20} />Logout</button>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default NavBar