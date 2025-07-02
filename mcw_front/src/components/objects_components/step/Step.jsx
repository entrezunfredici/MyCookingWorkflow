// src/components/Step/Step.jsx

import React from 'react';
import './Step.css'; // Importe le CSS spécifique à l'étape

/**
 * Composant représentant une seule étape au sein d'une tâche.
 *
 * @param {object} props - Les propriétés du composant.
 * @param {object} props.step - L'objet étape contenant { id, text, completed }.
 * @param {function} props.onToggleComplete - Fonction à appeler pour basculer l'état "complétée" de l'étape.
 * @param {function} props.onDelete - Fonction à appeler pour supprimer l'étape.
 */
const Step = ({ step, onToggleComplete, onDelete }) => {
    return (
        <li className="step-item">
            <span
                className={`step-item-text ${step.completed ? 'completed' : ''}`}
                onClick={() => onToggleComplete(step.id)} // Le texte est cliquable pour changer l'état
                title={step.completed ? 'Marquer comme non terminée' : 'Marquer comme terminée'}
            >
                {step.text}
            </span>
            <div className="step-actions">
                <button
                    className="step-complete-button"
                    onClick={() => onToggleComplete(step.id)}
                    title={step.completed ? 'Marquer comme non terminée' : 'Marquer comme terminée'}
                >
                    {step.completed ? '↩️' : '✔️'} 
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
