import React from 'react';
import './Todo.css'; // Importe le CSS spécifique à la tâche

/**
 * Composant représentant une seule tâche dans une liste de tâches.
 *
 * @param {object} props - Les propriétés du composant.
 * @param {object} props.todo - L'objet tâche contenant { id, text, completed }.
 * @param {function} props.onToggleComplete - Fonction à appeler pour basculer l'état "complétée".
 * @param {function} props.onDelete - Fonction à appeler pour supprimer la tâche.
 */
const Todo = ({ todo, onToggleComplete, onDelete }) => {
    return (
        <li className="todo-item">
            <span
                className={`todo-item-text ${todo.completed ? 'completed' : ''}`}
                onClick={() => onToggleComplete(todo.id)} // Le texte est cliquable pour changer l'état
                title={todo.completed ? 'Marquer comme non terminée' : 'Marquer comme terminée'}
            >
                {todo.text}
            </span>
            <div className="todo-actions">
                <button
                    className="todo-complete-button"
                    onClick={() => onToggleComplete(todo.id)}
                    title={todo.completed ? 'Marquer comme non terminée' : 'Marquer comme terminée'}
                >
                    {/* Tu peux utiliser des icônes ici, par exemple : '✔️' pour terminé, '↩️' pour non terminé */}
                    {todo.completed ? '↩️' : '✔️'}
                </button>
                <button
                    className="todo-delete-button"
                    onClick={() => onDelete(todo.id)}
                    title="Supprimer la tâche"
                >
                    🗑️
                </button>
            </div>
        </li>
    );
};

export default Todo;
