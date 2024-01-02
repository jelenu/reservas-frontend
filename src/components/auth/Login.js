import React, { useState, useContext } from 'react';
import './authStyle.css';
import { UserContext } from '../../context/userContext';
import { IoMdClose } from "react-icons/io";


function Login({ onLoginComplete }) {
  const { setIsAutenticated } = useContext(UserContext);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/api/authentication/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      localStorage.setItem('authtoken', data.key);
      setIsAutenticated(true);
      onLoginComplete();

    } catch (error) {
      console.error('Error al llamar a la API:', error);
    }
  };

  return (
    <div className="overlay">
      <div className="form-container">
      <button className='close-sign' onClick={onLoginComplete}><IoMdClose/></button>
        <form onSubmit={handleSubmit}>
          <h3>Login</h3>

          <div className="mb-3">
            <label>Username</label>
            <input type="text" className="form-control" placeholder="Enter Username" name="username" value={formData.username} onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input type="password" className="form-control" placeholder="Enter password" name="password" value={formData.password} onChange={handleChange} />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
