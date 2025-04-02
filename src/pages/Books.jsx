import React, { useEffect, useState } from 'react';
import '../styles/Books.css';
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import SearchBar from '../components/SearchBar';
import useFetch from '../hooks/useFetch';
import { Link } from 'react-router-dom';
import { API_IMG_URL } from '../config';

const Books = () => {
    const [booksToSearch,setBooksToSearch] = useState("");
    const [filtertoSearch, setFilterToSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const {data: books, fetchData, loading, error, pagination} = useFetch();
    const booksPerPage = 8;

    const loadBooks = async () => {
        if(!booksToSearch){
                console.log("No hay nada")
        }else{
            fetchData(`/book/?filter_field=${filtertoSearch}&filter_value=${booksToSearch}&page=${currentPage}&limit=${booksPerPage}`)
            console.log("PAGINATION:" ,pagination)
        }
        
    };

    useEffect(() => {
            loadBooks();
    }, [booksToSearch,currentPage]);

    const handleNextPage = () => {
        if (pagination && currentPage < pagination.totalPages) {
            setCurrentPage(currentPage + 1);
            console.log("Página actual (prev):", currentPage - 1);
        }else {
            console.log("NEXT disable")
        }
    };

    const handlePrevPage = () => {
        if (pagination && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="books-page">
            <Nav />
            <main className="books-main">
                <h1 className="titles">BOOKS</h1>
                <SearchBar setBooks={setBooksToSearch} setFilter={setFilterToSearch}/>
                <section className="books-grid">
                    {loading ? (
                        <p>Empieza a buscar</p>
                    ) : error ? (
                        <p className="error-message">{error}</p>
                    ) : books.length > 0 ? (
                        books.map((book) => (
                            <Link key={book.id} to={`/Book/${book._id}`}>
                                <div className="book-card">
                                    <img
                                        src={`${API_IMG_URL}${book.book_img}` || 'https://m.media-amazon.com/images/I/81sXr36Il8L._AC_UF894,1000_QL80_.jpg'}
                                        alt={book.title}
                                        className="book-cover"
                                    />
                                    <p className="titles card-text">{book.title}</p>
                                    <p className="text">#{book.isbn}</p>
                                    <p className="titles card-text">{book.author}</p>
                                    <p className='text'>{book.summary}</p>

                                  </div>
                            </Link>
                        ))
                    ) : (
                        <p>No hay libros disponibles.</p>
                    )}
                </section>
                <div className="pagination-controls">
                    <button onClick={handlePrevPage} disabled={currentPage === 1}>Anterior</button>
                    <span>Página {currentPage} de {pagination ? pagination.totalPages : 1}</span>
                    <button onClick={handleNextPage} >Siguiente</button>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Books;