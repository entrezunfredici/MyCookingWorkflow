// src/utils/auth.js

/**
 * Lit la valeur d'un cookie donné.
 * @param {string} name Le nom du cookie à lire.
 * @returns {string | null} La valeur du cookie ou null si non trouvé.
 */
export const getCookie = (name) => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';'); // Divise tous les cookies en un tableau
  for(let i=0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length); // Supprime les espaces au début
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

/**
 * Définit un cookie.
 * @param {string} name Le nom du cookie.
 * @param {string} value La valeur du cookie.
 * @param {number} days Le nombre de jours avant l'expiration.
 */
export const setCookie = (name, value, days) => {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
};

/**
 * Supprime un cookie.
 * @param {string} name Le nom du cookie à supprimer.
 */
export const eraseCookie = (name) => {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

// Fonction pour vérifier si l'utilisateur est authentifié
export const isAuthenticated = () => {
  return getCookie('auth_token') !== null;
};

// Décoder un JWT pour extraire le payload (ex: userId)
export function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
}
