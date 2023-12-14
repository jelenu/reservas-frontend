import React, { useState, useContext } from 'react';
import './authStyle.css';
import { UserContext } from '../../context/userContext'
import { useNavigate } from 'react-router-dom';


function Signup() {
  const navigate = useNavigate();

  const { setIsAutenticated } = useContext(UserContext);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password1: '',
    password2: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const responseSignup = await fetch('http://127.0.0.1:8000/api/registration/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      console.log('Respuesta completa de la API (Signup):', responseSignup);

      const formDataLogin = {
        username: formData.username,
        password: formData.password1,
      };

      const responseLogin = await fetch('http://127.0.0.1:8000/api/authentication/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataLogin),
      });

      const dataLogin = await responseLogin.json();
      console.log('Respuesta de la API (Login):', dataLogin);

      localStorage.setItem('authtoken', dataLogin.key);
      setIsAutenticated(true);

      navigate('/');


    } catch (error) {
      console.error('Error al llamar a la API:', error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h3>Sign Up</h3>

        <div className="mb-3">
          <label>Username</label>
          <input type="text" className="form-control" placeholder="Enter username" name="username" value={formData.username} onChange={handleChange}/>
        </div>

        <div className="mb-3">
          <label>Email address</label>
          <input type="email" className="form-control" placeholder="Enter email" name="email" value={formData.email} onChange={handleChange}/>
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input type="password" className="form-control" placeholder="Enter password" name="password1" value={formData.password1} onChange={handleChange}/>
        </div>

        <div className="mb-3">
          <label>Confirm Password</label>
          <input type="password" className="form-control" placeholder="Confirm password" name="password2" value={formData.password2} onChange={handleChange}/>
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
