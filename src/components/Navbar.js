
import React, { useEffect, useState } from 'react'

import { 
   User } from 'lucide-react'
import '../styles/navbar.css'
import { useNavigate } from 'react-router-dom';
import { getToken, removeToken } from '../AuthOPration';
import {Edit} from 'lucide-react'

const NavBar = () => {
  const navigate=useNavigate()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [edit,setEdit]=useState(false)
  const [name, setName] = useState(getToken('username') || '');
  const handleToggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };
useEffect(() => {
    const name=getToken('username')
    console.log(name);
    
  }, []);
const HandleName=(e)=>{
  e.stopPropagation()
  setEdit(true)
}
const handleSave = (e) => {
  e.stopPropagation();
  setEdit(false);
  localStorage.setItem('username', name); // or use your setName('username', name)
};
const handleCancel = (e) => {
  e.stopPropagation();
  setEdit(false); 
};
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
          {name||"User Name"}

          {isDropdownOpen && (
            <div className="dropdown-panel">
              <div className="user-info">
                <span className="user-name">{name||"User Name"}</span>
                <span className="edit-icon" 
                onClick={HandleName}
                ><Edit color="black" /></span>
              </div>
              {edit&&<div><input type='text' value={name} onChange={(e) => setName(e.target.value)} onClick={(e)=>  e.stopPropagation()}/>
              <button onClick={handleSave}>Save</button>
              <button onClick={handleCancel}>Cancel</button></div>
              }
              <button className="logout-button" onClick={() => {
                removeToken('token')
                navigate('/')
              }}>Logout</button>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default NavBar