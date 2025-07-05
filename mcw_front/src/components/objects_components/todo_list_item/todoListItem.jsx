// src/components/TodoListItem/TodoListItem.jsx

import React from 'react';
import { Link } from 'react-router-dom'; // Pour la navigation
import './TodoListItem.css';

/**
 * Composant représentant un todo dans la liste principale.
 * Permet d'accéder à la page de détail du todo.
 *
 * @param {object} props
 * @param {object} props.todo - L'objet todo: { id, name, description, datetime }
 */
const TodoListItem = ({ todo }) => {
    return (
        <Link
            to={`/todos/${todo.id}`}
            className="todo-list-item-card"
        >
            <h3>{todo.name}</h3>
            {todo.datetime && (
                <p style={{ fontSize: 12, color: '#888' }}>
                    {new Date(todo.datetime).toLocaleDateString()} à {new Date(todo.datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
            )}
            {todo.description && <p style={{ fontSize: 14 }}>{todo.description}</p>}
        </Link>
    );
};

export default TodoListItem;
