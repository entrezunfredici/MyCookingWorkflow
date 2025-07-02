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
    getUserById: async (userId) => {
        try {
            const response = await usersApiClient.get(`/users/${userId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
    updateUser: async (userId, userData) => {
        try {
            const response = await usersApiClient.put(`/users/${userId}`, userData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
    deleteUser: async (userId) => {
        try {
            await usersApiClient.delete(`/users/${userId}`);
            return { message: 'User deleted successfully' };
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
    changePAssword: async (userId, passwordData) => {
        try {
            const response = await usersApiClient.put(`/users/${userId}/change-password`, passwordData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
    addRole: async (userId, roleData) => {
        try {
            const response = await usersApiClient.post(`/users/${userId}/role`, roleData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
    removeRole: async (userId, roleId) => {
        try {
            const response = await usersApiClient.delete(`/users/${userId}/role/${roleId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
    updateRole: async (userId, roleId, roleData) => {
        try {
            const response = await usersApiClient.put(`/users/${userId}/role`, roleData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
};
