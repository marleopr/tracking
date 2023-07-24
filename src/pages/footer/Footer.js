import React from 'react';
import { FaGithub, FaLinkedin, FaGlobe, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
    return (
        <div style={{ marginBottom: "20px" }} >
            <div style={{ margin: "20px" }}className="social-buttons">
                <a
                    href="https://github.com/marleopr"
                    className="social-button github"
                    alt="GitHub"
                    title="GitHub"
                    target="_blank"
                    rel="noopener noreferrer">
                    <FaGithub />
                </a>
                <a
                    href="https://www.linkedin.com/in/marleopiber/"
                    className="social-button linkedin"
                    alt="Linkedin"
                    title="Linkedin"
                    target="_blank"
                    rel="noopener noreferrer">
                    <FaLinkedin />
                </a>
                <a
                    href="https://marleo-portfolio.vercel.app/"
                    className="social-button portfolio"
                    alt="Portfólio"
                    title="Portfólio"
                    target="_blank"
                    rel="noopener noreferrer">
                    <FaGlobe />
                </a>
                <a
                    href="https://whats.link/marleopr"
                    className="social-button whatsapp"
                    alt="WhatsApp"
                    title="WhatsApp"
                    target="_blank"
                    rel="noopener noreferrer">
                    <FaWhatsapp />
                </a>
            </div>
            Márleo Piber | Full Stack Developer © 2023
        </div>
    );
};

export default Footer;
