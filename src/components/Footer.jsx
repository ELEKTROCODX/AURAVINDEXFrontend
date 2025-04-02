import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faXing, faWhatsapp, faSnapchat, faDiscord, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import '../styles/Footer.css';

const Footer = () => {
    return (
        <footer className="">
            <div className='logo'>
                <img src="/img/logo-w.png" alt="" />
            </div>
            <div className='footer-things'>
                <div className="footer-left">
                    <p className='titles'>Legal Information</p>
                    <ul>
                        <li className='text'><a href="/alert">Legal notice and conditions</a></li>
                        <li className='text'><a href="/alert">Return conditions</a></li>
                        <li className='text'><a href="/alert">Quality policy</a></li>
                        <li className='text'><a href="/alert">Privacy Policy</a></li>
                        <li className='text'><a href="/alert">Cookies policy</a></li>
                    </ul>
                </div>
                <div className="footer-middle">
                    <p className='titles'>Contact Information</p>
                    <ul>
                        <li className='text'>Email: aura.vindex@company.com</li>
                        <li className='text'>Tel: +603-234-5619</li>
                        <li className='text'>Fax: 1997-3998</li>
                        <li className='text'>Address: 1234, street, main ave. North</li>
                    </ul>
                </div>
                <div className="footer-right">
                    <p className='titles'>Social Media</p>
                    <div className="social-media-icons" >
                        <a href="https://facebook.com" className="social-media-icon" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faFacebook} />
                        </a>
                        <a href="https://twitter.com" className="social-media-icon" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faTwitter} />
                        </a>
                        <a href="https://instagram.com" className="social-media-icon" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>
                        <a href="https://www.whatsapp.com" className="social-media-icon" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faWhatsapp} />
                        </a>
                        <a href="https://github.com" className="social-media-icon" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faGithub} />
                        </a>
                        <a href="https://linkedin.com" className="social-media-icon" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faLinkedin} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
