import React, { useState } from "react";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import SearchBar from "../../components/SearchBar";
import "../../styles/Home.css";

const HomePage = () => {
    const galleryImages = [
        'https://www.comunidadbaratz.com/wp-content/uploads/La-biblioteca-es-inclusion-social-e-igualdad-de-oportunidades.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZmnCYLv6qUQqwqOAnduBIbl2_YoteFdEiYJ2Lp9T6sU8-DzsrRTy9xbVVgARLmg5xLNI&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-T-jKTOee7CAvQqb3t0LLxjZakCc4muYw5A&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXAmtAQ1sFL_CuYRl35o1eJ7GnBZJ4V0dfePtDQ2aMBc6eQNXB9kLG-ns9S4RE4D6LZAo&usqp=CAU',
        'https://noticias.uca.edu.sv/uploads/texto_5751/image/5.jpg',
        'https://i.ytimg.com/vi/tbZIES03jUQ/maxresdefault.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR54vCL6CHEZxmh5E85bOQd5eFIclW42Q3TzA&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm0znhXjxVVBUz0d3hZvT5EEgrUmEIJBGeCQ&s',
        'https://saposyprincesas.elmundo.es/assets/2020/10/Bibliotecas-700.jpg'
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(null);

    const openImage = (index) => {
        setCurrentImageIndex(index);
    };

    const closeImage = () => {
        setCurrentImageIndex(null);
    };

    const nextImage = (e) => {
        e.stopPropagation();
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
    };

    const prevImage = (e) => {
        e.stopPropagation();
        setCurrentImageIndex((prevIndex) =>
            (prevIndex - 1 + galleryImages.length) % galleryImages.length
        );
    };

    return (
        <>
            <Nav />
            <div className="home-container">
                <h2 className="titles">WELCOME BACK!</h2>
                <SearchBar />
                <h2 className="titles">Statistics</h2>
                <section className="statistics-section">
                    <div className="stat-card">
                        <h3 className="stat-titles">Total Books</h3>
                        <p className="stat-value">1500</p>
                    </div>
                    <div className="stat-card">
                        <h3 className="stat-titles">Users Aprovement</h3>
                        <p className="stat-value">95%</p>
                    </div>
                    <div className="stat-card">
                        <h3 className="stat-titles">Reviews</h3>
                        <p className="stat-value">987</p>
                    </div>
                </section>
                <h2 className="titles">Gallery</h2>
                <section className="gallery-section">
                    {galleryImages.map((src, index) => (
                        <div
                            className="gallery-item"
                            key={index}
                            onClick={() => openImage(index)}
                        >
                            <img
                                src={src}
                                alt={`Gallery item ${index + 1}`}
                                className="gallery-image"
                            />
                        </div>
                    ))}
                </section>
                {currentImageIndex !== null && (
                    <div className="lightbox" onClick={closeImage}>
                        <button
                            className="lightbox-prev"
                            onClick={prevImage}
                        >
                            ‹
                        </button>
                        <img
                            src={galleryImages[currentImageIndex]}
                            alt={`Gallery item ${currentImageIndex + 1}`}
                            className="lightbox-image"
                        />
                        <button
                            className="lightbox-next"
                            onClick={nextImage}
                        >
                            ›
                        </button>
                        <button
                            className="lightbox-close"
                            onClick={(e) => {
                                e.stopPropagation();
                                closeImage();
                            }}
                        >
                            ×
                        </button>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default HomePage;
