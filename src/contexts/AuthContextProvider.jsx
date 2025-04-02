import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import PropTypes from "prop-types";
import useFetch from "../hooks/useFetch";

const AuthContextProvider = ({ children, }) => {
  const [user, setUser] = useState(localStorage.getItem("user") || "");
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [role, setRole] = useState(localStorage.getItem("role")||"");
  
  useEffect(()=>{
    if(user){
      localStorage.setItem("user",user);
    }
  },[user])

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  useEffect(()=>{
    if(role){
      localStorage.setItem("role",role);
    }else{
      localStorage.removeItem("role");
    }
  })

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("user");  
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login,role,setRole, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContextProvider;
