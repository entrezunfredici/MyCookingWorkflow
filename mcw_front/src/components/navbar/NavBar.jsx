import React from 'react'; // React is implicitly imported by bundlers like Vite/Next.js but it's good practice to keep it.
import ThemeSwitcher from '../themeswitcher/ThemeSwitcher.jsx';
import './navBar.css'

const NavBar = () => {
  // Components return JSX (JavaScript XML), which looks like HTML
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <a href="/">My Cooking Workflow</a>
            </div>

            <ul className="navbar-links">
                <li><a href="/"></a></li>
                <li><a href="/"></a></li>
                <li><a href="/"></a></li>
                <li><a href="/profile">Profil</a></li>
            </ul>

            <div className="navbar-actions">
                {/* Votre bouton de changement de thème */}
                <ThemeSwitcher />
                <button className="primary">Se connecter</button> {/* Exemple de bouton */}
            </div>
        </nav>
    );
}

// Don't forget to export your component so it can be used elsewhere!
export default NavBar;
