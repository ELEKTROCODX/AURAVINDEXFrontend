import React, { useState } from "react";
import Button from "../components/Button";
import "../styles/SetNewPassword.css";
import useFetch from "../hooks/useFetch";
import FloatingMessage from "../components/FloatingMessage";

const ResetPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const {fetchData} = useFetch();
    const [floatingMessage, setFloatingMessage] = useState(null);

    const handleSubmit = async (e) => {
        if(!email){
            setFloatingMessage("Write an email");
            return;
        }
        e.preventDefault();
        try {
            await fetchData(`/auth/reset`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                data: {email},
            });
            console.log("Email:", email);
            setFloatingMessage("Check your email!")
        } catch (error) {
            setFloatingMessage("Not correct data");
            console.error("Error guardando los datos:", error);
        }
    };

    return (
        <div className="reset-password-container">
            <h2 className="titles">Introduce your Email</h2>
            <form>
                <input
                    type="email"
                    placeholder="Example@recover.net"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                {error && <p className="error-message">{error}</p>}
                <center>
                    <Button variant="hollowBtn" type="submit" label={"Send"} action={handleSubmit}/>
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

export default ResetPasswordPage;
