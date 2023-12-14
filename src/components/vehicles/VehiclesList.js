import React, { useEffect, useState } from 'react';
import './vehiclesStyle.css'
import { TbManualGearbox } from "react-icons/tb";
import { MdPeopleAlt } from "react-icons/md";
import { GiCarDoor } from "react-icons/gi";




export const VehiclesList = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/vehicles/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const result = await response.json();
        setData(result);
        console.log('Datos obtenidos:', result);
      } catch (error) {
        console.error('Error al llamar a la API:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {data && Array.isArray(data) ? (
        <div className='list'>
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

                  <button className='selectButton'>Seleccionar</button>
                </div>


              
            </div>
          ))}
        </div>
      ) : (
        <p>No hay datos disponibles</p>
      )}
    </div>
  );
};
