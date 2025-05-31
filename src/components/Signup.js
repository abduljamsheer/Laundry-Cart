import React, { useState } from 'react';
import '../styles/signup.css'
import { Footer, LoginHeader } from './login';
import { useNavigate } from 'react-router-dom';
function Signup() {
   const URL='https://laundry-server-b7j6.onrender.com'||'http://localhost:8000';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    state: '',
    district: '',
    address: '',
    pincode: '',
    password: '',
    confirmPassword: '',
    terms: false
  });
  const [data,setData]=useState({})
  const navigate = useNavigate();

  const districtsByState = {
    'delhi': ['Central Delhi', 'East Delhi', 'New Delhi', 'North Delhi', 'South Delhi', 'West Delhi'],
    'maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Thane', 'Nashik'],
    'karnataka': ['Bangalore Urban', 'Bangalore Rural', 'Mysore', 'Mangalore', 'Hubli'],
    'tamilnadu': ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem'],
    'kerala': ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur', 'Kollam']
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (!formData.terms) {
      alert('Please agree to the terms and conditions');
      return;
    }

    fetch(`${URL}/api/v1/user/register`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify(formData)
    }).then((res)=>res.json()).
    then((data)=>{
      setData((prev)=>({
        ...prev,
        message:data.message,
      }));
      if(data.status=="Success"){
        setTimeout(()=>{
          navigate('/')

        },3000)
      }
    }).catch(err=>setData(err.message))
  };
  

  return (
    <div className="app">
      <LoginHeader />

      <main>
        <div className="container">
          <div className="registration-container">
            <div className="sidebar">
              <h1>Laundry Service</h1>
              <p>Doorstep Wash & Dryclean Service</p>
              <div className="already-account">
                <p>Already Have Account</p>
                <a href="/" className="mobile-signin-btn">Sign In</a>
              </div>
            </div>
            <div className="registration-form">
              <h2>REGISTER</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">

                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder='Name'
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">

                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder='Email'
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">

                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder='Phone'
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">

                    <div className="select-wrapper">
                      <select
                        id="state"
                        name="state"
                        placeholder='State'
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="" disabled>Select State</option>
                        <option value="delhi">Delhi</option>
                        <option value="maharashtra">Maharashtra</option>
                        <option value="karnataka">Karnataka</option>
                        <option value="tamilnadu">Tamil Nadu</option>
                        <option value="kerala">Kerala</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">

                    <div className="select-wrapper">
                      <select
                        id="district"
                        name="district"
                        placeholder='District'
                        value={formData.district}
                        onChange={handleInputChange}
                        required
                        disabled={!formData.state}
                      >
                        <option value="" disabled>Select District</option>
                        {formData.state && districtsByState[formData.state].map(district => (
                          <option
                            key={district}
                            value={district.toLowerCase().replace(/\s+/g, '-')}
                          >
                            {district}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="form-group">

                    <input
                      type="text"
                      id="address"
                      name="address"
                      placeholder='Address'
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">

                    <input
                      type="text"
                      id="pincode"
                      name="pincode"
                      placeholder='Pincode'
                      value={formData.pincode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">

                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder='Password'
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">

                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder='Confirm Password'
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group empty-group"></div>
                </div>
                <div className="terms-container">

                  <div className="terms-checkbox">
                    <input
                      type="checkbox"
                      id="terms"
                      name="terms"
                      checked={formData.terms}
                      onChange={handleInputChange}
                      required
                    />
                    <label htmlFor="terms" className='terms'>
                      I agree to <a href="/terms">Terms & Condition</a>, receiving marketing and promotional materials
                    </label>
                  </div>
                </div>
                <div className="register-btn-container">
                  <button type="submit" className="register-btn">Register</button>
                </div>
                {data&&<p>{data.message}</p>}
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      
    </div>
  );
}

export default Signup;
