import React, { useEffect, useState } from "react";
import Button from "./Button";
import '../styles/Nav.css';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from "../contexts/AuthContext";
import useFetch from "../hooks/useFetch";
import { API_IMG_URL } from "../config";

const NavUser = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { user,token, logout } = useAuth();
    const {data,fetchData} = useFetch();
    const [userName,setUserName] = useState("");
    const [img,setImg] = useState("");

    const toggleMenu = () => setMenuOpen(!menuOpen);

    const signInHandler = () => {
        navigate('/signin');
    };

    const signUpHandler = () => {
        navigate('/signup');
    };

    useEffect(()=>{
        const loadUserData = async () =>{
            if(!user || !token) return;

            try{
                const userData = await fetchData(`/user/${user}`,{
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUserName(userData.name);
                setImg(userData.user_img);
                console.log("IMG",userData.user_img);
            }catch(error){
                console.error("Error cargando datos del usuario:", error);
            }
        };

        loadUserData();
    },[])

    return (
        <nav className="navUser">
            <button className="hamburger" onClick={toggleMenu}>
                <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
            </button>
            <section className={`header-nav ${menuOpen ? 'open' : ''}`}>
                {!token ? (
                    <>
                        <div className="logo">
                            <a href="/">
                                <img src="/img/logo-b.png" alt="Logo" />
                            </a>
                        </div>
                        <ul className="userNav-options">
                            <li><a href="/">Home</a></li>
                            <li><a href="/AboutUs">About</a></li>
                            <li><a href="/Rooms">Rooms</a></li>
                            <li><a href="/Books">Books</a></li>
                            <li><a className="Hmenu" href="/signin">Login</a></li>
                            <li><a className="Hmenu" href="/signup">Register</a></li>
                        </ul>
                        <div className="loginBtn">
                            {!token ? (
                                <>
                                    <Button variant="filledBtn" label="Sign in" action={signInHandler} />
                                    <Button variant="hollowBtn" label="Sign up" action={signUpHandler} />
                                </>
                            ) : (
                                null
                            )}
                        </div>
                    </>
                ) : (
                    <>
                        <div className="logo">
                            <a href="/dashboard">
                                <img src="/img/logo-b.png" alt="Logo" />
                            </a>
                        </div>
                        <ul className="userNav-options">
                            <li><a href="/dashboard">Dashboard</a></li>
                            <li><a href="/books">Books</a></li>
                            <li><a href="/rooms">Rooms</a></li>
                            <li><a href="/loans">Loans</a></li>
                            <li><a href="/reservations">Reservations</a></li>
                            <li><a href="/mylists">Lists</a></li>
                            <li><a className="Hmenu" href="" onClick={logout}>Logout</a></li>
                        </ul>
                        <div className="users-options">
                            <a href="/profile" className="link-user">
                                <p className="user-name">{userName}</p>
                            </a>
                            <a className="user-link" href="/profile"><img src={`${API_IMG_URL}${img}`} alt="" className="user-photo" /></a>
                            <Button variant={"symbolOnlyBtn"} action={logout} label={<FontAwesomeIcon icon={faArrowRightFromBracket} />}></Button>
                        </div>
                    </>
                )}
            </section>
        </nav>
    );
}

export default NavUser;
