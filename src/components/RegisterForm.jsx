import React, { useContext, useState, useEffect } from "react";
import Button from "./Button";
import '../styles/Register.css';
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth";
import useFetch from "../hooks/useFetch";

const RegisterForm = () => {
    const [maxDate, setMaxDate] = useState("");
    const [minDate,setMinDate] = useState("");

    useEffect(() => {
        // Calcular la fecha actual en formato MM/DD/YYYY
        const today = new Date();
        const maxDateObj = new Date();
        maxDateObj.setFullYear(today.getFullYear() - 10);
        const formattedMaxDate = formatDateToMMDDYYYY(maxDateObj);
        setMaxDate(formattedMaxDate);


        const minYear = new Date("1954-01-01");
        const formattedMinYear = formatDateToMMDDYYYY(minYear);
        setMinDate(formattedMinYear);
    }, []);

    const formatDateToMMDDYYYY = (date) => {
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    };

    const handleDateChange = (e) => {
        const inputDate = e.target.value;
        const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/; // Validar formato MM/DD/YYYY

        if (inputDate === "" || dateRegex.test(inputDate)) {
            setBirthdate(inputDate);
        }
        
        if (inputDate && inputDate >= '1954-01-01' && inputDate <= maxDate) {
            setBirthdate(inputDate);
        } else {
            // Mostrar un mensaje de error si la fecha es inválida
            console.error("Fecha inválida, debe estar entre 1954 y la fecha actual.");
        }
    };

    const parseToISODate = (dateStr) => {
        const [month, day, year] = dateStr.split("/");
        return `${year}-${month}-${day}`;
    };

    const parseToMMDDYYYY = (isoDate) => {
        const [year, month, day] = isoDate.split("-");
        return `${month}/${day}/${year}`;
    };

    const {fetchData, data} = useFetch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [last_name, setLast_name] = useState('');
    const [username, setUsername] = useState(() =>
        Math.floor(10000000 + Math.random() * 90000000).toString()
    );
    const [gender, setGender] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [user_img,setUser_img] = useState("");


    useEffect(()=>{
        fetchData('/gender');
    },[]);

    useEffect(()=>{
        console.log("Genero:", data);
    },[data]);

    const validateFields = () => {
        const errors = {};
        if (!name.trim()) errors.name = "Name is required.";
        if (!last_name.trim()) errors.last_name = "Last name is required.";
        if (!email.trim()) errors.email = "Email is required.";
        if (!password.trim()) errors.password = "Password is required.";
        if (!birthdate.trim()){
             errors.birthdate = "Birthdate is required.";
        }else{
            const birthDateObj = new Date(birthdate);
            const minDateObj = new Date("1954-01-01");
            if (birthDateObj < minDateObj) {
                errors.birthdate = "Birthdate cannot be earlier than 1954.";
            }
        }
        if (!gender.trim()) errors.gender = "Gender is required.";

        setFormErrors(errors); 
        return Object.keys(errors).length === 0; 
    };

    const handleSubmit = async e => {
        e.preventDefault();
        if (!validateFields()) return;
        const formData = new FormData(form);
        console.log('datos: ', formData);
        try {
            await registerUser(formData);
            navigate('/signin', { state: { registrationSuccess: true } });

        } catch (err) {
            if (err.response) {
                console.error('Response data:', err.response.data); 
                console.error('Response status:', err.response.status); 
                console.error('Response headers:', err.response.headers); 
                setError(err.response.data.message || 'Error al registrar el usuario');
            } else if (err.request) {
                console.error('Request error:', err.request);
                setError('No se recibió respuesta del servidor');
            } else {
                console.error('Axios error:', err.message);
                setError('Error desconocido al registrar el usuario');
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="register-container">
            <div className="register-card">
                <h1 className="register-title">Sign Up</h1>
                <h3 className="register-subtitle">Welcome, please sign up to continue</h3>
                <form id="form" className="register-form">
                    <div className="input-group">
                        <label htmlFor="name">Name:</label>
                        <input className="input" type="text" id="name" name="name" placeholder="Name" required value={name} onChange={e => setName(e.target.value)} />
                        {formErrors.name && <p className="error-message">{formErrors.name}</p>}
                    </div>
                    <div className="input-group">
                        <label htmlFor="last_name">Lastname:</label>
                        <input className="input" type="text" id="last_name" name="last_name" placeholder="Lastname" required value={last_name} onChange={e => setLast_name(e.target.value)} />
                        {formErrors.last_name && <p className="error-message">{formErrors.last_name}</p>}
                    </div>
                    <div className="input-group">
                        <label htmlFor="birthdate">Birth Date:</label>
                        <input className="input" type="date" id="birthdate" name="birthdate" min="01-01-1954" max={maxDate} value={birthdate} onChange={e => setBirthdate(e.target.value)} defaultValue={minDate}/>
                        {formErrors.birthdate && <p className="error-message">{formErrors.birthdate}</p>}
                    </div>
                    <div className="input-group">
                        <label htmlFor="gender">Gender:</label>
                        <select id="gender" className="input" name="gender" value={gender} onChange={e => {setGender(e.target.value); console.log("Genero",e.target)}}>
                            <option value="">Select an Option</option>
                            {
                                data && data.map(gender=>(
                                    <option key={gender._id} value= {gender._id}> {gender.name}</option>
                                ))
                            }
                        </select>
                        {formErrors.gender && <p className="error-message">{formErrors.gender}</p>}
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email:</label>
                        <input className="input" type="email" id="email" name="email" placeholder="Email" required value={email} onChange={e => setEmail(e.target.value)} />
                        {formErrors.email && <p className="error-message">{formErrors.email}</p>}
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password:</label>
                        <input className="input" type="password" id="password" name="password" placeholder="Password" required onChange={e => setPassword(e.target.value)} />
                        {formErrors.password && <p className="error-message">{formErrors.password}</p>}
                    </div>
                    <div className="input-group">
                        <label for="imageFile">Selecciona foto de perfil:</label>
                        <input type="file" name="user_img" id="user_img" accept="image/*" onChange={e => setUser_img(e.target.value)}/>
                    </div>
                    <input type="text" name="username"  value={username} hidden/>
                    <center>
                        <Button variant="filledBtn" label="Register" action={handleSubmit} />
                    </center>
                </form>
                <div className="register-links">
                    <a href="/SignIn">You have an account?</a>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;