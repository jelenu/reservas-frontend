import React, { useState, useEffect } from 'react';
import { TbManualGearbox } from "react-icons/tb";
import { MdPeopleAlt } from "react-icons/md";
import { GiCarDoor } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";

import "./bookingStyle.css"
export const VehiclesFiltered = ({ formData }) => {
  const [data, setData] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);


  
  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/get_available_models/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            pickup_office_id: formData.pickupOfficeId,
            start_date: `${formData.pickupDate.from.year}-${formData.pickupDate.from.month}-${formData.pickupDate.from.day}`,
            end_date: `${formData.pickupDate.to.year}-${formData.pickupDate.to.month}-${formData.pickupDate.to.day}`,
          }),
        });

        const result = await response.json();
        setData(result);
        console.log('Datos obtenidos:', result);
      } catch (error) {
        console.error('Error al llamar a la API:', error);
      }
    };

    fetchData();
  // eslint-disable-next-line
  }, []); 

  const handleSelectClick = (vehicle) => {
    setSelectedCar(vehicle);
    setIsPopupOpen(true);
    console.log("open")
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div>
      {data && Array.isArray(data) ? (
        <div>
          {data.map((vehicle, index) => (
            <div key={index} className='container'>
                <div className="column image-column">
                  <img className='vehicle' src={vehicle.image} alt={`${vehicle.brand} ${vehicle.model}`} />
                </div>

                <div className="column info-column">
                  <h3> {vehicle.brand} {vehicle.model}</h3>
                  <p><GiCarDoor />  {vehicle.doors} <MdPeopleAlt />  {vehicle.seats} <TbManualGearbox />  {vehicle.transmission}</p>
                </div>

                <div className="column price-column">
                  <p>Desde</p>
                  <h4>25,50€ / día</h4>

                  <button className='selectButton' onClick={() => handleSelectClick(vehicle)}>Seleccionar</button>
                </div>      
            </div>
          ))}
        </div>
        
      ) : (
        <p>No hay datos disponibles</p>
      )}

      {isPopupOpen && (
        <div className='popup-background'>
          <div className="popup">
            {/* Contenido del popup */} 
            <div>
              <h3>{selectedCar.brand} {selectedCar.model}</h3>
              
              <div>
                <img className='vehicle' src={selectedCar.image} alt={`${selectedCar.brand} ${selectedCar.model}`} />
              </div>
              <p>
                <GiCarDoor /> {selectedCar.doors} <MdPeopleAlt /> {selectedCar.seats} <TbManualGearbox /> {selectedCar.transmission}
              </p>
            </div>
            {/* Botón de cerrar en la esquina superior derecha */}
            <button className="close-button" onClick={handleClosePopup}> <IoMdClose/> </button>
          </div>
        </div>
      )}

      
    </div>
  );
};
