import React from "react";
import '../styles/admin/AdminNav.css';

const AdminNav = () => {
    return (
        <nav className="admin-nav">
            <ul className="admin-nav-list">
                <li>Books</li>
                <li>Rooms</li>
                <li>Users</li>
                <li>Loans</li>
                <li>Reservations</li>
                <li>Audit Log</li>
            </ul>
        </nav>
    );
};

export default AdminNav;

