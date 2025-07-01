import axios from 'axios';
import { getCookie, eraseCookie } from '../utils/cookieManager'; // Pour récupérer le token

const API_URLS = {
    users: 'http://mcw-users.localhost',
    food: 'http://mcw-food.localhost',
    tools: 'http://mcw-tools.localhost',
};

// Fonction générique pour créer une instance Axios avec intercepteur
const createApiClient = (baseURL) => {
    const client = axios.create({
        baseURL,
        headers: {
            'Content-Type': 'application/json',
        },
    });

  // Intercepteur pour ajouter le token d'authentification à chaque requête
    client.interceptors.request.use(config => {
        const token = getCookie('auth_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, error => {
        return Promise.reject(error);
    });

    client.interceptors.response.use(response => response, error => {
        if (error.response && error.response.status === 401) {
            // Gérer la déconnexion ou la redirection si le token est invalide/expiré
            eraseCookie('auth_token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    });

    return client;
};

// Crée des clients Axios pour chaque API
const usersApiClient = createApiClient(API_URLS.users);
const foodApiClient = createApiClient(API_URLS.food);
const toolsApiClient = createApiClient(API_URLS.tools);

export const userService = {
    login: async (credentials) => {
        try {
            const response = await usersApiClient.post('/users/login', credentials);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
    register: async (userData) => {
        try {
            const response = await usersApiClient.post('/users/register', userData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
};

export const foodService = {
    getRecipes: async () => {
        try {
            const response = await foodApiClient.get('');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
    addRecipe: async (recipeData) => {
        try {
            const response = await foodApiClient.post('', recipeData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
};

export const toolsService = {
    getTools: async () => {
        try {
            const response = await toolsApiClient.get('');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
};
