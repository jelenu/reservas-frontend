import React, { useContext }from 'react'
import { Link } from "react-router-dom";
import { UserContext } from '../../context/userContext'

export const Header = () => {
  const { authToken, userName } = useContext(UserContext);

  return (
    <div className="Header">
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">

          {authToken !== "" ? (
            <p>Bienvenido {userName}</p>
          ) : (

            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-in'}> Login </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-up'}> Sign up</Link>
                </li>
              </ul>
            </div>

          )}

        </div>
      </nav>
    </div>
  );
};
