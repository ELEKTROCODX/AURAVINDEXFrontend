import React from 'react';
import '../styles/AboutUs.css';
import Nav from '../components/Nav';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AboutUs = () => {
    const teamMembers = [
        {
            name: "César Isaac Tovar Jovel",
            image: "/img/ISAAC.png",
            role: "UI/UX Designer & React Developer",
            bio: "Isaac is the designer and main person responsible for React development. Passionate about programming, design, and art, he leads with creativity and innovation.",
        },
        {
            name: "Alexander Efraín Morales Pineda",
            image: "/img/EFRAIN.png",
            role: "API & Backend Developer",
            bio: "Alexander ensures the functionality of databases and APIs. Passionate about technology and coffee, he stands out for his ability to solve complex problems.",
        },
        {
            name: "Diego Alejandro Iraheta Monterrosa",
            image: "/img/DIEGO.png",
            role: "API Integration & Functionality Developer",
            bio: "Diego enjoys integrating technologies and creating seamless user experiences. A music lover and anime fan, he combines creativity and technique in his work.",
        },
    ];

    return (
        <>
            <Nav />
            <div className="about-us-container">
                <h1 className="titles">About Us</h1>
                <section className="mission-vision">
                    <h2 className="titles">Our Mission</h2>
                    <p className='text'>Our mission is to design and develop innovative, accessible, and user-centered web solutions that address real-world challenges. We strive to deliver exceptional user experiences by leveraging cutting-edge technologies, creative design principles, and robust back-end systems. Through continuous learning and collaboration, we aim to inspire trust, foster inclusivity, and empower individuals and businesses to thrive in the digital age.</p>
                    <h2 className="titles">Our Vision</h2>
                    <p className='text'>Our vision is to become a global leader in the web development industry, recognized for our dedication to quality, innovation, and user satisfaction. We envision a future where technology bridges gaps and transforms ideas into impactful solutions. By cultivating a culture of creativity, adaptability, and sustainability, we aim to create a lasting legacy that drives positive change and inspires the next generation of developers.</p>
                </section>

                <section className="history">
                    <h2 className="titles">Our Story</h2>
                    <p className='text'>
                    This project was born as a collaborative effort during a Web Programming class. It represents the passion and dedication of three developers with the aim of creating impactful solutions, with the aim of showing the knowledge that the team members acquired on the subject.                    </p>
                </section>

                <section className="team">                    {teamMembers.map((member, index) => (
                        <div className="team-member" key={index}>
                            <img src={member.image} alt={member.name} />
                            <div className="content">
                                <h3 className="titles">{member.name}</h3>
                                <h4>{member.role}</h4>
                                <p>{member.bio}</p>
                            </div>
                        </div>
                    ))}
                </section>
            </div>
            <Footer />
        </>
    );
};

export default AboutUs;
