import { Navigate } from "react-router-dom";
import { AuthContext, useAuth } from "../contexts/AuthContext"
import { useContext } from "react";

const PrivateRoute =({children})=>{
    const {token} = useContext(AuthContext);

    return token ? children: <Navigate to="/SignIn"/>
}

export default PrivateRoute;