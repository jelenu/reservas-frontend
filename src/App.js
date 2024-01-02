import React, { useState, useEffect } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Routes,Route } from 'react-router-dom'

import { Header } from './components/layout/Header'
import { UserContext } from './context/userContext'
import { VehiclesList } from './components/vehicles/VehiclesList';
import { BookingFilter } from './components/booking/BookingFilter';



function App() {
  let [ isAutenticated, setIsAutenticated] = useState(false);
  let [ authToken, setAuthToken] = useState("");
  let [ userName, setUserName] = useState("");

  useEffect(() => {
    const storedAuthToken = localStorage.getItem('authtoken');

    if (storedAuthToken) {
      setAuthToken(storedAuthToken);
      console.log(storedAuthToken)

      fetch('http://localhost:8000/api/authentication/user/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${storedAuthToken}`
        },
      })
        .then(response => response.json())
        .then(data => {
          setUserName(data.username);
          console.log(data.username)
        })
        .catch(error => {
          console.error('Error al llamar a la API:', error);
        });

    }
  }, [isAutenticated]);

  return (
    <UserContext.Provider value={{ isAutenticated, setIsAutenticated, authToken, setAuthToken, userName, setUserName }}>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<BookingFilter />} />
          <Route path="/vehicles" element={<VehiclesList />} />
        </Routes>
      </div>
    </UserContext.Provider>
    
    

  )
}

export default App
