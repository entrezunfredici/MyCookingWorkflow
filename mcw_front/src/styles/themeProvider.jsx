// src/context/ThemeContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';

// Crée un contexte qui sera utilisé pour partager le thème
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Initialise le thème en essayant de le récupérer depuis le localStorage.
  // Si rien n'est trouvé, 'light' est le thème par défaut.
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme ? savedTheme : 'light';
    });

  // Met à jour la classe du <body> et le localStorage à chaque changement de thème
    useEffect(() => {
        // Applique la classe 'dark-mode' ou 'light-mode' au <body> du document
        document.body.className = theme === 'dark' ? 'dark-mode' : 'light-mode';
        // Sauvegarde le thème actuel pour qu'il persiste au rechargement
        localStorage.setItem('theme', theme);
    }, [theme]); // Cet effet se déclenche chaque fois que 'theme' change

    // Fonction pour basculer le thème entre 'light' et 'dark'
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        // Fournit le thème actuel et la fonction pour le changer à tous les composants enfants
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Hook personnalisé pour permettre aux composants d'accéder facilement au thème
export const useTheme = () => {
  // Vérifie si le hook est utilisé à l'intérieur d'un ThemeProvider
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
