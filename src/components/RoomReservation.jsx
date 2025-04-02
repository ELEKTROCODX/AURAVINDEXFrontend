import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import useFetch from "../hooks/useFetch";
const RoomReservation = ({
  setStartReservations,
  setEndReservations,
  room,
}) => {
  const [existingReservations, setExistingReservations] = useState([]);
  const [newReservations, setNewReservations] = useState([]);
  const {fetchData} = useFetch();
  const getWeekRange = () => {
    const today = new Date();
    const startOfWeek = new Date(today);
    const endOfWeek = new Date(today);
    const dayOfWeek = today.getDay();
    startOfWeek.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    return {
      start: startOfWeek.toISOString().split("T")[0], 
      end: endOfWeek.toISOString().split("T")[0], 
    };
  };
useEffect(()=>{
  if (room) {
    fetchData(`/reservation?filter_field=room&filter_value=${room}`)
      .then((reservations) => {
        console.log("Fetching reservations for room:", reservations);

        if (reservations && reservations.length > 0) {
          const formattedReservations = reservations.map((res) => ({
            id: res.id,
            title: "Reserva",
            start: res.start_date, 
            end: res.finish_date,
            backgroundColor: "#4caf50", 
            editable: false, 
          }));


          setExistingReservations(formattedReservations);
        } else {
          console.log("No hay reservas");
        }
      })
      .catch(console.error);
  }
  setExistingReservations([]);
  setNewReservations([]);
}, [room]);


  const handleDateSelect = (selectInfo) => {
    const newEvent = {
      id: Date.now(),
      title: "Reserva",
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      backgroundColor: "#2196f3", // Azul para nuevas reservas
    };
    setNewReservations((prev) => [...prev, newEvent]);
    setStartReservations(newEvent.start);
    setEndReservations(newEvent.end);
  };
  const handleEventClick = (clickInfo) => {
    const isExisting = clickInfo.event.extendedProps.isExisting;
    if (isExisting) {
      alert("No puedes eliminar reservas existentes.");
      return;
    }
    if (
      window.confirm(`¿Deseas eliminar la reserva '${clickInfo.event.title}'?`)
    ) {
      setNewReservations((prevReservations) =>
        prevReservations.filter(
          (event) => event.id !== parseInt(clickInfo.event.id)
        )
      );
    }
  };

  return (
    <div>
      <h1 className="title">Calendar</h1>
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        selectable={true}
        editable={true}
        events={[...existingReservations,...newReservations]}
        select={handleDateSelect}
        eventClick={handleEventClick}
        slotMinTime="08:00:00"
        slotMaxTime="20:00:00"
        timeZone="America/Mexico_City"
        dayHeaderFormat={{ weekday: "short" }}
        hiddenDays={[0]}
        allDaySlot={false}
        selectOverlap={false}
        eventOverlap={false}
        duration={{days: 6}}
        validRange={{start: new Date().toISOString().split("T")[0], // Deshabilita días anteriores al actual
          end: getWeekRange().end,}}
        
      />
    </div>
  );

  };


export default RoomReservation;