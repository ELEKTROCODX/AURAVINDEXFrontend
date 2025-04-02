import React from 'react';
import '../styles/Alert.css';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const Alert = () => {

    return (
        <>
            <Nav />
            <div className="alert-container">
                <div className='cont-i'>
                    <img src="/img/ISAAC.png" alt="" />
                    <p className="titles">HI! <br/> We are working here for you <br />
                    atte. Elektro Team</p>
                </div>
            </div>
            
            <Footer />
        </>
    );
};

export default Alert;
