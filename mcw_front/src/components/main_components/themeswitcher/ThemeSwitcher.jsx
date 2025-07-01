// src/components/ThemeSwitcher.jsx
import React from 'react';
import { useTheme } from '../../themeProvider.jsx'; // Assurez-vous du bon chemin

function ThemeSwitcher() {
  // Utilisez le hook useTheme pour accéder au thème actuel et à la fonction de bascule
    const { theme, toggleTheme } = useTheme();

    return (
        <button onClick={toggleTheme} id="switch_theme">
            {/* Affiche le texte approprié en fonction du thème actuel */}
            {theme === 'light' ? 'Passer au mode sombre' : 'Passer au mode clair'}
        </button>
    );
}

export default ThemeSwitcher;
