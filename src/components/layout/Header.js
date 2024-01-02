import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/userContext';
import  Login  from '../auth/Login';
import  Signup  from '../auth/Singup';
import "./Layout.css"

export const Header = () => {
  const { authToken, setAuthToken, userName } = useContext(UserContext);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  // eslint-disable-next-line
  const [loginCompleted, setLoginCompleted] = useState(false);
    // eslint-disable-next-line
    const [signupCompleted, setSignupCompleted] = useState(false);


  const handleLogout = () => {
    localStorage.removeItem('authtoken');
    setAuthToken('');
    setLoginCompleted(false);
  };

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowSignup(false);
  };

  const handleSignupClick = () => {
    setShowSignup(true);
    setShowLogin(false);
  };

  const handleLoginComplete = () => {
    setShowLogin(false);
    setLoginCompleted(true);
  };

  const handleSignupComplete = () => {
    setShowSignup(false);
    setSignupCompleted(true);
  };

  return (
    <div className="Header">
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container ">
          {authToken !== '' ? (
            <div className="d-flex ">
              <p className="mr-3">Bienvenido {userName}</p>
              <button className="btn btn-dark" onClick={handleLogout}>
                Cerrar sesión
              </button>
            </div>
          ) : (
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <button className="nav-link" onClick={handleLoginClick}>
                    Login
                  </button>
                </li>
                <li className="nav-item">
                  <button className="nav-link" onClick={handleSignupClick}>
                    Sign up
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
      {showLogin && <Login onLoginComplete={handleLoginComplete} />}
      {showSignup && <Signup onSignupComplete={handleSignupComplete} />}
    </div>
  );
};
