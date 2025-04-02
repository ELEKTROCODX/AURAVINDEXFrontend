import React, { useEffect, useState } from "react";
import NavAdmin from "../../components/NavAdmin";
import "../../styles/admin/AdminDashboard.css";
import SearchBar from "../../components/SearchBar";
import Footer from "../../components/Footer";
import Nav from "../../components/Nav";
import Button from "../../components/Button";

const AdminDashboard = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch("https://api.auravindex.me/books");
                if (!response.ok) {
                    throw new Error(`Error fetching data: ${response.statusText}`);
                }
                const data = await response.json();
                setBooks(Array.isArray(data.books) ? data.books : []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    return (
        <>
            <div className="admin-dashboard">
                <Nav />
                <NavAdmin />
                <div className="main-content">
                    <h1 className="titles">BOOKS</h1>
                    <header className="header2">
                        <SearchBar />
                    </header>
                    <div className="table-container">
                        <Button variant="hollowBtn" onClick={() => console.log("Añadir nuevo libro")} label={"New Book"} />
                        {loading ? (
                            <p>Loading...</p>
                        ) : error ? (
                            <p>Error: {error}</p>
                        ) : (
                            <table className="books-table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Author(s)</th>
                                        <th>Genre</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {books.map((book, index) => (
                                        <tr key={book.id || index}>
                                            <td>{index + 1}</td>
                                            <td>{book.id}</td>
                                            <td>{book.name}</td>
                                            <td>{book.authors?.join(", ") || "N/A"}</td>
                                            <td>{book.genre || "Unknown"}</td>
                                            <td className="btn">
                                                <button className="action-btn edit">✏️</button>
                                                <button className="action-btn delete">🗑️</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AdminDashboard;