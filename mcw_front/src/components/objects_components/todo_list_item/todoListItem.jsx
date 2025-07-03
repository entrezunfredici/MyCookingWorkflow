// src/components/TodoListItem/TodoListItem.jsx

import React from 'react';
import { Link } from 'react-router-dom'; // Pour la navigation
import './TodoListItem.css';

/**
 * Composant représentant une tâche dans la liste principale (TodoListPage).
 * Agit comme un bouton/lien vers la page de détails de la tâche.
 *
 * @param {object} props
 * @param {object} props.todo - L'objet tâche de l'API: { id, name, description, datetime, todoListId }.
 */
const TodoListItem = ({ todo }) => {
    // Note: L'API ne renvoie pas 'completed' directement dans le GET /todos/all.
    // Pour cet exemple, nous allons simuler un état 'completed' pour la card.
    // En réalité, tu devrais le récupérer de ton API si tu stockes la complétion d'un ToDo principal.
    const isCompleted = false; // Par défaut, non complété pour la démo. Ajuste selon ton API.

    return (
        <Link 
            to={`/todo/${todo.id}`} // Navigue vers la page de détails du ToDo
            className={`todo-list-item-card ${isCompleted ? 'completed' : ''}`}
        >
            <h3>{todo.name}</h3>
            {todo.datetime && (
                <p>Créé le: {new Date(todo.datetime).toLocaleDateString()} à {new Date(todo.datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            )}
        </Link>
    );
};

export default TodoListItem;
