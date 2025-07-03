// src/components/Step/Step.jsx (Adapté à l'API)

import React from 'react';
import './Step.css'; // Importe le CSS spécifique à l'étape

/**
 * Composant représentant une seule étape au sein d'une tâche.
 *
 * @param {object} props - Les propriétés du composant.
 * @param {object} props.step - L'objet étape de l'API: { id, name, description, position }.
 * @param {boolean} props.isCompleted - L'état de complétion de l'étape (non fourni par l'API directement ici, on doit le suivre en front ou via une autre API).
 * @param {function} props.onToggleComplete - Fonction à appeler pour basculer l'état "complétée" de l'étape via l'API.
 * @param {function} props.onDelete - Fonction à appeler pour supprimer l'étape via l'API.
 */
const Step = ({ step, isCompleted, onToggleComplete, onDelete }) => {
    // Note: L'API ne renvoie pas 'completed' directement pour une étape.
    // Nous allons le gérer en passant 'isCompleted' comme prop depuis le parent (Todo).

    return (
        <li className="step-item">
            <span
                className={`step-item-text ${isCompleted ? 'completed' : ''}`}
                onClick={() => onToggleComplete(step.id, !isCompleted)}
                title={isCompleted ? 'Marquer comme non terminée' : 'Marquer comme terminée'}
            >
                {/* L'API a 'name' et 'description'. On va les combiner ou afficher le plus pertinent. */}
                <strong>{step.name}</strong>: {step.description}
            </span>
            <div className="step-actions">
                <button
                    className="step-complete-button"
                    onClick={() => onToggleComplete(step.id, !isCompleted)}
                    title={isCompleted ? 'Marquer comme non terminée' : 'Marquer comme terminée'}
                >
                    {isCompleted ? '↩️' : '✔️'}
                </button>
                <button
                    className="step-delete-button"
                    onClick={() => onDelete(step.id)}
                    title="Supprimer l'étape"
                >
                    🗑️
                </button>
            </div>
        </li>
    );
};

export default Step;
