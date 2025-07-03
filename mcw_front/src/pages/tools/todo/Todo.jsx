// src/components/Todo/Todo.jsx (Adapté à l'API et à ListContainer)

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Pour récupérer l'ID de l'URL
import ListContainer from '../../../containers/list/ListContainer.jsx';
import Step from '../../../components/objects_components/step/Step.jsx';
import { todoService, stepService } from '../../../utils/apiToolService.js'; // Importe les services API
import './Todo.css';

const Todo = () => {
    const { id } = useParams(); // Récupère l'ID du ToDo depuis l'URL
    const navigate = useNavigate();
    const [todo, setTodo] = useState(null);
    const [steps, setSteps] = useState([]);
    const [newStepName, setNewStepName] = useState('');
    const [newStepDescription, setNewStepDescription] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isTodoCompleted, setIsTodoCompleted] = useState(false); // État de complétion du ToDo

    // Charger les détails du ToDo et ses étapes
    useEffect(() => {
        const fetchTodoAndSteps = async () => {
            try {
                setLoading(true);
                // 1. Charger les détails du ToDo
                const fetchedTodo = await todoService.getTodoById(id);
                setTodo(fetchedTodo);
                // Simule la complétion si ton API ne la fournit pas directement avec le GET /todos/{id}
                // Tu devras ajuster ceci si ton API renvoie 'completed' ou non.
                setIsTodoCompleted(false); // Ou fetchedTodo.completed si ton API le fournit

                // 2. Charger toutes les étapes et filtrer celles qui appartiennent à ce ToDo
                // Ceci est une solution temporaire. Idéalement, ton API aurait un endpoint
                // comme GET /todos/{id}/steps.
                const allSteps = await stepService.getAllSteps();
                const relevantSteps = allSteps.filter(step => step.todoListId === fetchedTodo.id); // Assuming todoListId on steps
                setSteps(relevantSteps.map(step => ({ ...step, completed: false }))); // Ajouter un champ 'completed'

                setError(null);
            } catch (err) {
                console.error("Erreur lors du chargement des détails du ToDo ou des étapes:", err);
                setError("Impossible de charger les détails de la tâche. Veuillez vérifier l'ID.");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchTodoAndSteps();
        }
    }, [id]); // Re-exécuter si l'ID du ToDo change

    const handleToggleTodoComplete = async () => {
        const newStatus = !isTodoCompleted;
        try {
            await todoService.markTodoCompleted(todo.id, newStatus);
            setIsTodoCompleted(newStatus);
            // Tu pourrais aussi vouloir déclencher une mise à jour visuelle des étapes si toutes les étapes sont complétées, etc.
        } catch (err) {
            console.error("Erreur lors de la mise à jour du statut du ToDo:", err);
            setError("Impossible de mettre à jour le statut de la tâche.");
        }
    };

    const handleAddStep = async () => {
        if (newStepName.trim() === '') {
            alert('Veuillez saisir le nom de l\'étape !');
            return;
        }
        const newStepData = {
            name: newStepName.trim(),
            description: newStepDescription.trim(),
            position: steps.length + 1, // Simple positionnement
            todoListId: todo.id, // Lier l'étape à la tâche actuelle
        };
        try {
            const addedStep = await stepService.createStep(newStepData); // Utilise createStep du stepService
            setSteps([...steps, { ...addedStep, completed: false }]);
            setNewStepName('');
            setNewStepDescription('');
        } catch (err) {
            console.error("Erreur lors de l'ajout de l'étape:", err);
            setError("Impossible d'ajouter l'étape.");
        }
    };

    const handleToggleStepComplete = async (stepId, currentStatus) => {
        try {
            await stepService.markStepCompleted(stepId, currentStatus); // Utilise markStepCompleted du stepService
            setSteps(
                steps.map((step) =>
                    step.id === stepId ? { ...step, completed: currentStatus } : step
                )
            );
        } catch (err) {
            console.error("Erreur lors de la mise à jour du statut de l'étape:", err);
            setError("Impossible de mettre à jour le statut de l'étape.");
        }
    };

    const handleDeleteStep = async (stepId) => {
        try {
            await stepService.deleteStep(stepId); // Utilise deleteStep du stepService
            setSteps(steps.filter((step) => step.id !== stepId));
        } catch (err) {
            console.error("Erreur lors de la suppression de l'étape:", err);
            setError("Impossible de supprimer l'étape.");
        }
    };

    if (loading) {
        return <p style={{ textAlign: 'center' }}>Chargement de la tâche...</p>;
    }

    if (error) {
        return <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>;
    }

    if (!todo) {
        return <p style={{ textAlign: 'center' }}>Tâche non trouvée.</p>;
    }

    return (
        <div className="todo-detail-container">
            <h1 className="todo-detail-header">Détails de la Tâche</h1>

            <div className="todo-detail-info">
                <h2>{todo.name}</h2>
                <p>{todo.description}</p>
                {todo.datetime && (
                    <small>Créé le: {new Date(todo.datetime).toLocaleDateString()} à {new Date(todo.datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</small>
                )}
                <br/>
                <button
                    className={`todo-status-toggle ${isTodoCompleted ? 'completed' : ''}`}
                    onClick={handleToggleTodoComplete}
                >
                    {isTodoCompleted ? 'Marquer non terminée' : 'Marquer terminée'}
                </button>
            </div>

            <div className="steps-section">
                <h3>Étapes:</h3>
                <div className="step-input-group">
                    <input
                        type="text"
                        className="step-input"
                        value={newStepName}
                        onChange={(e) => setNewStepName(e.target.value)}
                        placeholder="Nom de l'étape..."
                    />
                    <input
                        type="text"
                        className="step-input"
                        value={newStepDescription}
                        onChange={(e) => setNewStepDescription(e.target.value)}
                        placeholder="Description de l'étape..."
                    />
                    <button className="step-add-button" onClick={handleAddStep}>
                        Ajouter Étape
                    </button>
                </div>

                {steps.length === 0 ? (
                    <p className="no-steps-message">Aucune étape pour cette tâche.</p>
                ) : (
                    <ListContainer listClassName="steps-list-container"> {/* Applique un style au ListContainer lui-même */}
                        {steps.sort((a, b) => a.position - b.position).map((step) => (
                            <Step
                                key={step.id}
                                step={step}
                                isCompleted={step.completed}
                                onToggleComplete={handleToggleStepComplete}
                                onDelete={handleDeleteStep}
                            />
                        ))}
                    </ListContainer>
                )}
            </div>
        </div>
    );
};

export default Todo;
