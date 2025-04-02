import React from "react";
import "../styles/AdminNav.css";

const AdminNav = () => {
    return (
        <nav className="admin-nav" >
            <h2 className="admin-nav-title" > Administrator </h2>
            < ul className="admin-nav-list" >
                <li>Books </li>
                <li>Authors</li>
                <li>Editorial</li>
                <li>Floor</li>
                <li>Rooms</li>
                <li>Users</li>
                <li>Loans</li>
                <li> Reservations </li>
                <li> Audit Log </li>
            </ul>
        </nav>
    );
};

export default AdminNav;
