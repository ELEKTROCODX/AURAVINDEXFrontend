import React from "react";
import '../styles/Button.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Button = ({ label, action, variant, icon }) => {
    const getButtonClass = () => {
        switch (variant) {
            case "filledBtn":
                return "filledBtn";
            case "hollowBtn":
                return "hollowBtn";
            case "iconBtn":
                return "iconBtn"; 
            case "symbolOnlyBtn":
                return "symbolOnlyBtn"; 
            default:
                return "defaultBtn"; 
        }
    };

    return (
        <button type="button" className={getButtonClass()} onClick={action}>
            {icon && <FontAwesomeIcon icon={icon} className="button-icon" />}
            {label && <span className="button-label">{label}</span>}
        </button>
    );
};

export default Button;
