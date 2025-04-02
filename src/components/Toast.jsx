import React, {useEffect } from "react";
import "../styles/Toast.css";

const Toast = ({ message, duration = 3000, position = "top-right", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`toast ${position}`}>
      {message}
    </div>
  );
};

export default Toast;