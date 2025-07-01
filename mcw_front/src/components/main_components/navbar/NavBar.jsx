// src/components/main_components/navbar/NavBar.jsx

import React from 'react';
import { Link } from 'react-router-dom'; // Assure-toi que Link est bien importé ici !
import { isAuthenticated, eraseCookie } from '../../../utils/cookieManager';
import { useNavigate } from 'react-router-dom';
import ThemeSwitcher from '../../../styles/theme_switcher/ThemeSwitcher.jsx';
import './NavBar.css';

const NavBar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        eraseCookie('auth_token');
        navigate('/login'); // Redirige vers la page de connexion après la déconnexion
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                {/* MODIFIE ICI : 'link' avec un 'l' minuscule devient 'Link' avec un 'L' majuscule */}
                <Link to="/">My Cooking Workflow</Link> 
            </div>

            <ul className="navbar-links">
                <li><Link to="/">Accueil</Link></li>
                <li><Link to="/calendar">calendrier</Link></li>
                <li><Link to="/todo">Todo</Link></li>
                <li><Link to="/shop">liste de courses</Link></li>
                <li><Link to="/profile">Profil</Link></li>
            </ul>

            <div className="navbar-actions">
                <ThemeSwitcher />
                {isAuthenticated() ? (
                    <button onClick={handleLogout} className="primary">Déconnexion</button>
                ) : (
                    <Link to="/login" className="primary">Se connecter</Link>
                )}
            </div>
        </nav>
    );
};

export default NavBar;
