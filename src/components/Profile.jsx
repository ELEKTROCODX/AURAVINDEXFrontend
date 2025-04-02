import { useState, useContext, useEffect } from "react";
import Button from "./Button";
import "../styles/Profile.css";
import useFetch from "../hooks/useFetch";
import { AuthContext } from "../contexts/AuthContext";
import { convertUTCToLocalv2 } from "../utils/functions";
import { API_IMG_URL } from "../config";

const Profile = () => {
    const { fetchData: putData } = useFetch();
    const { fetchData } = useFetch();
    const {fetchData: genderFetch, data: genderFetchData} = useFetch();
    const { user, token } = useContext(AuthContext);
    const [editMode, setEditMode] = useState(false);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [gender, setGender] = useState([]);
    const [img, setImg] = useState("");

    const [userInfo, setUserInfo] = useState({
        name: "",
        last_name: "",
        email: "",
        gender: "",
        password: "",
        birthdate: "",
        biography: "",
        username: "",
    });

    useEffect(() => {
        const loadUserData = async () => {
            if (!user || !token || isDataLoaded) return;

            try {
                const userData = await fetchData(`/user/${user}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setUserInfo({
                    name: userData.name || "",
                    last_name: userData.last_name || "",
                    username: userData.username || "",
                    email: userData.email || "",
                    gender: userData.gender?.name || "",
                    birthdate: userData.birthdate || "",
                    biography: userData.biography || "",
                });

                setImg(userData.user_img);
                console.log("IMG:", userData.user_img);

                setIsDataLoaded(true);
            } catch (error) {
                console.error("Error cargando datos del usuario:", error);
            }

            try {
                const genderResponse = await fetchData("/gender");
                setGender(genderResponse);
            } catch (error) {
                console.error("Error cargando géneros:", error);
            }
        };

        loadUserData();
    }, [user, token, fetchData, isDataLoaded]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const toggleEditMode = () => {
        setEditMode((prev) => !prev);
    };

    const handleSave = async () => {
        if (!user || !token) return;

        try {
            const updatedUserData = await putData(`/user/${user}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                data: userInfo,
            });

            setUserInfo(updatedUserData);
            toggleEditMode();
            console.log("Datos guardados:", userInfo);
            window.location.reload();
        } catch (error) {
            console.error("Error guardando los datos:", error);
        }
    };

    return (
        <>
            {editMode ? (
                <div className="profile-container">
                    <h1>Edit Profile</h1>
                    <div className="profile-info">
                        <div className="input-group">
                            <label htmlFor="name">Name:</label>
                            <input
                                className="input"
                                type="text"
                                id="name"
                                name="name"
                                value={userInfo.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="lastname">Lastname:</label>
                            <input
                                className="input"
                                type="text"
                                id="lastname"
                                name="lastname"
                                value={userInfo.last_name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                className="input"
                                type="email"
                                id="email"
                                name="email"
                                value={userInfo.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="input-group">

                        <label htmlFor="gender">Gender:</label>
                        <select id="gender" className="input" name="gender" value={userInfo.gender} onChange={e => 
                            
                            {setUserInfo(prevState => ({
                                ...prevState,
                                gender: e.target.value
                              }));
                              console.log("Genero: ",e.target.value);
                              }}>
                            <option value="">Select an option</option>
                            {
                                genderFetchData && genderFetchData.map(gender=>(
                                    <option key={gender._id} value= {gender._id}> {gender.name}</option>
                                ))
                            }
                        </select>
                    </div>
                        <div className="input-group">
                            <label htmlFor="password">Password:</label>
                            <input
                                className="input"
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Password"
                                value={userInfo.password}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="input-group">

                            <label htmlFor="biography">Biography:</label>
                            <textarea
                                className="input"
                                id="biography"
                                name="biography"
                                rows="4"
                                value={userInfo.biography}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <center><Button variant={"hollowBtn"} label="Save" action={handleSave}></Button></center>
                </div>
            ) : (
                <div className="profile-container">
                    <img
                        src={`${API_IMG_URL}${img}`}
                        alt="User profile"
                        className="user-photo"
                    />
                    <h2>{userInfo.name}</h2>
                    <h3>{userInfo.username}</h3>
                    <div className="profile-info">
                        <p>Email: {userInfo.email || "No disponible"}</p>
                        <p>Gender: {userInfo.gender || "No disponible"}</p>
                        <p>Birth Date: {convertUTCToLocalv2(userInfo.birthdate) || "No disponible"}</p>
                        <p>Biography: {userInfo.biography || "No disponible"}</p>
                    </div>
                    <Button label="Edit profile" action={toggleEditMode}></Button>
                </div>
            )}
        </>
    );
};

export default Profile;
