import React from 'react';
import '../styles/Header.css';
import { useNavigate } from 'react-router-dom';
import Button from './Button'

const Header = () => {
    const Navigate = useNavigate();
    const NavLogin = () =>{
        Navigate('/SignUp')
    }
    return (
        <header className="header">
            <div className="header-content">
                <h1>Your story starts with the right book!</h1>
                <center>                
                    <p className='text-2'>Aura Vindex is the place where everything can turn real, because every book is a universe.</p>
                </center>
                <center>
                <Button href="/SignUp" variant="filledBtn" label="Register Now!" action={NavLogin}></Button>
                </center>
            </div>
        </header>
    );
};

export default Header;