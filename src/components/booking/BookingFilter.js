// Importa las bibliotecas necesarias y el archivo de estilos
import React, { useState, useEffect } from 'react';
import Autosuggest from 'react-autosuggest';
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicker";
import "./bookingStyle.css";
import { VehiclesFiltered } from './VehiclesFiltered';

// Componente funcional principal para filtrar reservas
export const BookingFilter = () => {
  // Estados para manejar las oficinas, los datos del formulario, las sugerencias y el estado de carga
  const [offices, setOffices] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    pickupOffice: '',
    pickupOfficeId: null,
    pickupDate: null,
  });
  
  // ...
  
  const handleChange = (name) => (event, { newValue }) => {
    setFormData({ ...formData, [name]: newValue });
    
  };

  // Funciones para manejar la obtención y limpieza de sugerencias
  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  // Función para filtrar sugerencias según el valor de entrada
  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : offices.filter(
          (office) =>
            office.name.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  // Efecto secundario para cargar datos de oficinas al montar el componente
  useEffect(() => {
    const fetchOffices = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/offices/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const result = await response.json();
        setOffices(result);
        setLoading(false);
        console.log('Datos obtenidos:', result);
      } catch (error) {
        console.error('Error al llamar a la API:', error);
      }
    };

    fetchOffices();
  }, []);

  // Función para obtener las propiedades de entrada para los campos del formulario
  const inputProps = (name) => ({
    placeholder: `Seleccione una oficina`,
    value: formData[name],
    onChange: handleChange(name),
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  // Función para manejar el envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault();

    // Validación básica de campos obligatorios
    if (!formData.pickupOffice || !formData.pickupDate) {
      alert('Todos los campos son obligatorios. Por favor, complete el formulario.');
      return;
    }

    // Resto del código para procesar el formulario
    setFormData({
      ...formData,
      pickupOfficeId: offices.find((office) => office.name === formData.pickupOffice)?.id || null,
    });
    setCalendarVisible(false);

    setFormSubmitted(true);
  };

  // Función para manejar cambios en las fechas
  const handleDateChange = (name) => ({ from, to }) => {
    setFormData({ ...formData, [name]: { from, to } });
  };

  // Obtén la fecha actual
  const currentDate = new Date();
  
  // Establece la fecha mínima usando la fecha actual
  const minimumDate = {
    year: currentDate.getFullYear(),
    month: currentDate.getMonth() + 1, // Los meses en JavaScript van de 0 a 11
    day: currentDate.getDate()
  };

  const [calendarVisible, setCalendarVisible] = useState(false);


  // Renderizado del componente
  return (
    <div >
      {loading ? (
        <p>esperando...</p>
      ) : (
        <div className='form-filter-container'>
          <form onSubmit={handleSubmit} className='form-filter'>
            <div>
              <label>Oficina de Recogida:</label>
              {/* Componente Autosuggest para el campo de oficina de recogida */}
              <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={(office) => office.name}
                renderSuggestion={(office) => <span>{office.name}</span>}
                inputProps={inputProps('pickupOffice')}
              />
            </div>


            <div className="custom-calendar-wrapper">
              <button type="button" className='dates-button' onClick={() => setCalendarVisible(!calendarVisible)}>
                  Selecciona las fechas
              </button>
              <div className={`custom-calendar-wrapper ${calendarVisible ? '' : 'hidden'}`}>
                {/* Componente Calendar para el campo de fecha de recogida y devolución */}
                <Calendar
                  value={formData.pickupDate}
                  onChange={handleDateChange('pickupDate')}
                  calendarClassName="custom-calendar"
                  colorPrimary="#009900" 
                  colorPrimaryLight="rgba(0, 153, 0, 0.4)" 
                  minimumDate={minimumDate}
                  shouldHighlightWeekends
                />
              </div>
            </div>

            <button type="submit" className='searchButton'>
              Buscar
            </button>
          </form>
        </div>
      )}
      {formSubmitted && <VehiclesFiltered formData={formData} />}
    </div>
  );
};