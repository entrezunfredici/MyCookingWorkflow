import { usersApiClient } from './api_client';

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

    changePassword: async (userId, passwordData) => {
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

    verifyEmail: async (datas) => {
        try {
            const response = await usersApiClient.post('/users/verify-email', datas);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    forgottenPassword: async (email) => {
        try {
            const response = await usersApiClient.post('/users/forgotten-password', { email });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    resetPassword: async (mail, code , newPassword) => {
        try {
            const response = await usersApiClient.post('/users/reset-password', { mail, code, newPassword});
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
};

export const Roles = {
    getAll: async () => {
        try {
            const response = await usersApiClient.get('/roles/all');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getRoleById: async (roleId) => {
        try {
            const response = await usersApiClient.get(`/roles/${roleId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    editRole: async (roleId, roleData) => {
        try {
            const response = await usersApiClient.put(`/roles/${roleId}`, roleData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    deleteRole: async (roleId) => {
        try {
            const response = await usersApiClient.delete(`/roles/${roleId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    createRole: async (roleData) => {
        try {
            const response = await usersApiClient.post('/roles', roleData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};

export const BlacklistedFood = {
    getAll: async () => {
        try {
            const response = await usersApiClient.get('/blacklisted-food/all');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getBlacklistedFoodById: async (foodId) => {
        try {
            const response = await usersApiClient.get(`/blacklisted-food/${foodId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    updateBlacklistedFood: async (foodId, foodData) => {
        try {
            const response = await usersApiClient.put(`/blacklisted-food/${foodId}`, foodData);
            return response.data;
        }
        catch (error) {
            throw error.response?.data || error.message;
        }
    },

    addBlacklistedFood: async (name) => {
        try {
            const response = await usersApiClient.post('/blacklisted-food/add', { name });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    deleteBlacklistedFood: async (foodId) => {
        try {
            const response = await usersApiClient.delete(`/blacklisted-food/${foodId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
}
