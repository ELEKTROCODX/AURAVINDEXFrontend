import React,{useEffect} from "react";
import "../styles/FloatingMessage.css"; 

const FloatingMessage = ({ message, type="succes",onClose, duration = 3000 }) => {
  
    useEffect(() => {
        
        const timer = setTimeout(() => {
          if (onClose) onClose();
        }, duration);
    
        
        return () => clearTimeout(timer);
      }, [onClose, duration]);
  
    return (
    <div className="floating-message">
      <span>{message}</span>
    </div>
  );
};

export default FloatingMessage;
