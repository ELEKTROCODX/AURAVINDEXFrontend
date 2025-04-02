import React, { useState } from "react";
import Button from "../components/Button"; 
import "../styles/SetNewPassword.css";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import FloatingMessage from "../components/FloatingMessage";

const SetNewPasswordPage = () => {
    const {fetchData} = useFetch();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [floatingMessage, setFloatingMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!password || !confirmPassword) {
            setFloatingMessage("Write a password")
            return;
        }
        if (password !== confirmPassword) {
            setFloatingMessage("Pasword must be equal.");
            return;
        }

        const currentUrl = window.location.href;
        const url = new URL(currentUrl);
        const token = url.searchParams.get("token");
        console.log("token:",token);

        const dataToSend = {
            password: password,
            token: token,
        }
        
        try {
            await fetchData(`/auth/reset_password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                data: dataToSend,
            });
            console.log("Successfuly");
            setFloatingMessage("New password!")
            navigate('/signin');
        } catch (error) {
            console.error("Error guardando los datos:", error);
            setFloatingMessage("Error with data")
        }
    };

    return (
        <div className="set-new-password-container">
            <h2 className="titles">Type your new password</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="New password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                {error && <p className="error-message">{error}</p>}
                <center>
                <Button variant="hollowBtn" label={"Save"} type="submit" action={handleSubmit}/>
                </center>
            </form>
            {floatingMessage && (
        <FloatingMessage
          message={floatingMessage}
          onClose={() => setFloatingMessage(null)}
        />
      )}
        </div>
    );
};

export default SetNewPasswordPage;
