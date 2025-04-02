import Footer from "../components/Footer";
import Nav from "../components/Nav";
import useFetch from "../hooks/useFetch";
import "../styles/user-designs/Reservations.css";
import { AuthContext } from "../contexts/AuthContext";
import Button from "../components/Button";
import { convertUTCToLocal } from "../utils/functions";
import { useContext, useEffect, useState } from "react";



const Reservations = () => {
  const { user, token } = useContext(AuthContext);
  const { data, fetchData, pagination } = useFetch();
  const [currentPage, setCurrentPage] = useState(1);
  const {fetchData: deleteData} = useFetch();
  const reservationsPerPage = 3;

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        await fetchData(`/reservation/?user=${user}&page=${currentPage}&limit=${reservationsPerPage}`);
      } catch (err) {
        console.error("Error al obtener las reservas:", err);
      }
    };
    fetchReservations();
  }, [currentPage]);

  const handleNextPage = () => {
    if (pagination && currentPage < pagination.totalPages) {
        setCurrentPage(currentPage + 1);
        console.log("Página actual (prev):", currentPage - 1);
    }else {
        console.log("NEXT disable")
    }
};

const handlePrevPage = () => {
    if (pagination && currentPage > 1) {
        setCurrentPage(currentPage - 1);
    }
};

  const deleteReservation= async (reservationId)=>{
        try{
            await deleteData(`/reservation/${reservationId}`, {
                method: 'DELETE',
                headers: {
                'Authorization': `Bearer ${token}`,
                }
            })
        }catch(err){
            console.log(err);
        }
  }

  return (
    <>
      <Nav />
      <h1>RESERVATIONS</h1>
      <div className="Reservation-lists">
        {Array.isArray(data) &&
          data.map((reservation) => (
            <div className="Reservation-item" key={reservation._id}>
              <img
                src={reservation.image || "https://via.placeholder.com/150"}
                alt={`Room ${reservation.room}`}
              />
              <div className="Reservation-info">
                <h2>ROOM: {reservation.room.name}</h2>
                <p>
                  Shift: {convertUTCToLocal(reservation.start_date)} - {convertUTCToLocal(reservation.finish_date)}
                </p>
                <p>Equipments: {reservation.equipments}</p>
              </div>
              <Button label="CANCEL" action={()=>deleteReservation(reservation._id)}></Button>
                </div>
                ))}
            </div>
            <div className="pagination-controls">
                    <button onClick={handlePrevPage} disabled={currentPage === 1}>Anterior</button>
                    <span>Página {currentPage} de {pagination ? pagination.totalPages : 1}</span>
                    <button onClick={handleNextPage} >Siguiente</button>
              </div>
            <Footer/> 
        </>
    );
}

export default Reservations;