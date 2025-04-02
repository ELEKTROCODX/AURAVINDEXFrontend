import React, { useContext, useEffect, useState } from 'react';
import '../styles/Rooms.css';
import RoomReservation from '../components/RoomReservation';
import Button from '../components/Button';
import useFetch from '../hooks/useFetch';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import FloatingMessage from './FloatingMessage';

const Reservation = () => {
  const { fetchData } = useFetch();
  const navigate = useNavigate();
  const { user, token } = useContext(AuthContext);
  const { data: locations, fetchData: fetchLocations } = useFetch();
  const { data: rooms, fetchData: fetchRooms } = useFetch();
  const { data: equipments, fetchData: fetchEquipments } = useFetch();
  const [location, setLocation] = useState('');
  const [room, setRoom] = useState(null);
  const [capacity, setCapacity] = useState('');
  const [roomReservations, setRoomReservations] = useState([]);
  const [startDateReservation, setStartDateReservation] = useState('');
  const [endDateReservation, setEndDateReservation] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [floatingMessage, setFloatingMessage] = useState(null);


  //location fetch
  useEffect(() => {
    fetchLocations('/room_location');
  }, []);

  //room fetch
  useEffect(() => {
    if (location === '') {
      setRoom('');
    } else {
      fetchRooms(`/room/?filter_field=room_location&filter_value=${location}`);
    }
  }, [location]);

  //equipment fetch
  useEffect(() => {
    fetchEquipments('/equipment');
  }, []);



  //capacity data
  const selectedRoom = rooms ? rooms.find(r => r.id === room?.id) : null;
  const minCapacity = selectedRoom ? selectedRoom.min_people : 0;
  const maxCapacity = selectedRoom ? selectedRoom.max_people : 0;


  const capacityOptions = [];
  if (minCapacity && maxCapacity) {
    for (let i = minCapacity; i <= maxCapacity; i++) {
      capacityOptions.push(i);
    }
  }

  const handleCheckboxChange = e => {
    const { value, checked } = e.target;

    setSelectedOptions(prevOptions => {
      if (checked) {
        return [...prevOptions, value];
      }
      return prevOptions.filter(option => option !== value);
    });
  };

  const validateFields = () =>{
    if (!startDateReservation || !endDateReservation) {
      setFloatingMessage('Please select the time.');
      return;
    }
    if(!location){
      setFloatingMessage('Please select a location');
      return;
    }
    if(!room){
      setFloatingMessage('Please select a room');
      return;
    }
    if(!capacity){
      setCapacity('Please select a capacity');
      return;
    }

    return true;
  }

  const handleSubmit = async (e) => {
    if (!token) {
      navigate('/signin');
    } else {
      e.preventDefault();
      if(!validateFields()) return;
      const reservationData = {
        user: user,
        room: room,
        people: parseInt(capacity),
        start_date: format(new Date(startDateReservation),"yyyy-MM-dd HH:mm"),
        finish_date: format(new Date(endDateReservation),"yyyy-MM-dd HH:mm"),
        equipments: selectedOptions,
      };

      console.log('Datos a enviar:', reservationData);

      try {
        await fetchData('/reservation', {
          method: 'POST',
          data: reservationData,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Reserva creada');
        setFloatingMessage('Reservation created successfully!');
      } catch (err) {
        if (err.response) {
          console.error('Error del servidor:', err.response.data);
          console.error('Código de estado:', err.response.status);
          setFloatingMessage(
            `Error: ${err.response.data.message || 'An unexpected error occurred.'}`
          );
        } else if (err.request) {
          console.error('Sin respuesta del servidor:', err.request);
          setFloatingMessage('No response from server.');
        } else {
          console.error('Error desconocido:', err.message);
          setFloatingMessage('An unknown error occurred.');
        }
      }
    }

  };

  return (
    <>
      <main className="rooms-page">
        <section className="rooms-header">
          <h2 className="titles">Rooms</h2>
        </section>
        <section className="rooms-details">
          <div className="take-a-look-form">
            <h3 className='titles'>Reserve Now!</h3>
            <form onSubmit={handleSubmit}>
              <label htmlFor="room-select">Floor:</label>
              <select
                id="location"
                name="location"
                value={location}
                onChange={e => setLocation(e.target.value)}
              >
                <option value="">Select an option</option>
                {locations &&
                  locations.map(location => (
                    <option key={location._id} value={location._id}>
                      {location.location}
                    </option>
                  ))}
              </select>
              <label htmlFor="room-select">Room:</label>
              <select
                id="room-select"
                name="room"
                value={room}
                onChange={e => {
                  setRoom(e.target.value);
                }}
              >
                <option value="">Select an option</option>
                {rooms &&
                  rooms.map(room => (
                    <option
                      disabled={location === ''}
                      key={room.id}
                      value={room._id}
                    >
                      {room.name}
                    </option>
                  ))}
              </select>
              <label htmlFor="room-select">Estimated People:</label>
              <select
                id="capacity-select"
                name="capacity"
                value={capacity}
                onChange={e => setCapacity(e.target.value)}
                disabled={!room}
              >
                <option value="">Select an option</option>
                {capacityOptions.map(cap => (
                  <option key={cap} value={cap}>
                    {cap}
                  </option>
                ))}
              </select>

              <div className="container-opt">
              <fieldset>
                <legend>Extra Equipment:</legend>
                {equipments &&
                  equipments.map(equip => (
                    <label key={equip.id}>
                      <input
                        type="checkbox"
                        name={equip.name}
                        value={equip._id}
                        onChange={handleCheckboxChange}
                      ></input>
                      {equip.name}
                    </label>
                  ))}
              </fieldset>
              </div>

              <div className="img-room">
                <img src="https://static8.depositphotos.com/1321174/799/i/450/depositphotos_7996448-stock-photo-modern-study-room.jpg" alt="" />
              </div>
              <center>
                <Button
                  type="submit"
                  variant="filledBtn"
                  label="Reserve"
                  action={handleSubmit}
                ></Button>
              </center>
            </form>
          </div>

          <div className="view-your-rooms">
            <h3 className="titles">View Reservations</h3>
            <div className="room-preview">
              <RoomReservation
                setStartReservations={setStartDateReservation}
                setEndReservations={setEndDateReservation}
                room={room}
              ></RoomReservation>
            </div>
          </div>
        </section>
      </main>
      {floatingMessage && (
    <FloatingMessage
    message={floatingMessage}
    onClose={() => setFloatingMessage(null)} 
  />
)}
    </>
  );

  
};

export default Reservation;