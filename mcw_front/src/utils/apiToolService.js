import { toolsApiClient } from "./api_client";

export const stepService = {
    getAllSteps: async () => {
        try {
            const response = await toolsApiClient.get(`/steps/all`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
    getStepById: async (stepId) => {
        try {
            const response = await toolsApiClient.get(`/steps/${stepId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
    editStep: async (stepId, stepData) => {
        try {
            const response = await toolsApiClient.put(`/steps/${stepId}`, stepData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
    deleteStep: async (stepId) => {
        try {
            const response = await toolsApiClient.delete(`/steps/${stepId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
    createStep: async (stepData) => {
        try {
            const response = await toolsApiClient.post(`/steps/add`, stepData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};

export const todoService = {
    getAllTodos: async () => {
        try {
            const response = await toolsApiClient.get(`/todos/all`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
    getTodoById: async (todoId) => {
        try {
            const response = await toolsApiClient.get(`/todos/${todoId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
    editTodo: async (todoId, todoData) => {
        try {
            const response = await toolsApiClient.put(`/todos/${todoId}`, todoData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
    deleteTodo: async (todoId) => {
        try {
            const response = await toolsApiClient.delete(`/todos/${todoId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
    createTodo: async (todoData) => {
        try {
            const response = await toolsApiClient.post(`/todos/add`, todoData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};

export const TodoList = {
    getAll: async () => {
        try {
            const response = await toolsApiClient.get('/todolist/all');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
    getTodoListById: async (listId) => {
        try {
            const response = await toolsApiClient.get(`/todolist/${listId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
    updateTodoList: async (listId, listData) => {
        try {
            const response = await toolsApiClient.put(`/todolist/${listId}`, listData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
    addTodoList: async (name) => {
        try {
            const response = await toolsApiClient.post('/todolist/add', { name });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
    deleteTodoList: async (listId) => {
        try {
            const response = await toolsApiClient.delete(`/todolist/${listId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};
