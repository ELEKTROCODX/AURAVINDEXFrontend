import React, { useEffect, useState } from 'react';
import '../styles/Rooms.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import Reservation from '../components/Reservation';


const Rooms = () => {
    

    return (
        <>
            <Nav />
            <Reservation></Reservation>
            <Footer></Footer>
        </>
    );
};

export default Rooms;
