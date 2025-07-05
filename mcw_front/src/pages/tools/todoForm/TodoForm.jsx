import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { todoService, stepService, todoStepService, todoListService } from '../../../utils/apiToolService.js';
import './TodoForm.css'; // Pour le style

function TodoForm(props) {
    const navigate = useNavigate();
    const location = useLocation();
    // Récupère les valeurs passées via navigation ou props
    const passedTodoListId = location.state?.todoListId || props.todoListId || '';
    const passedDatetime = location.state?.datetime || props.datetime || '';
    const [todoData, setTodoData] = useState({
        name: '',
        description: '',
        datetime: passedDatetime,
        todoListId: passedTodoListId
    });
    const [steps, setSteps] = useState([{ name: '', description: '', position: 1 }]);
    const [todoLists, setTodoLists] = useState([]); // Pour la sélection de la TodoList
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        const fetchTodoLists = async () => {
            try {
                const lists = await todoListService.getAll();
                setTodoLists(lists);
                // Si un todoListId est passé, on le garde, sinon on pré-sélectionne la première
                if (passedTodoListId) {
                    setTodoData(prev => ({ ...prev, todoListId: passedTodoListId }));
                } else if (lists.length > 0) {
                    setTodoData(prev => ({ ...prev, todoListId: lists[0].id }));
                }
            } catch (err) {
                setError("Erreur lors du chargement des listes de tâches.");
                console.error("Failed to fetch todo lists:", err);
            }
        };
        fetchTodoLists();
        // eslint-disable-next-line
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTodoData(prev => ({ ...prev, [name]: value }));
    };

    const handleStepChange = (index, e) => {
        const { name, value } = e.target;
        const newSteps = steps.map((step, i) => {
            if (i === index) {
                return { ...step, [name]: value };
            }
            return step;
        });
        setSteps(newSteps);
    };

    const handleAddStep = () => {
        setSteps(prev => [...prev, { name: '', description: '', position: prev.length + 1 }]);
    };

    const handleRemoveStep = (index) => {
        setSteps(prev => prev.filter((_, i) => i !== index).map((step, i) => ({ ...step, position: i + 1 })));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        // Validation simple
        if (!todoData.name || !todoData.description || !todoData.datetime || !todoData.todoListId) {
            setError("Veuillez remplir tous les champs obligatoires de la tâche principale.");
            setLoading(false);
            return;
        }

        try {
            // 1. Créer la Tâche principale
            // Convertir datetime au format ISO 8601 (ex: "2023-10-01T12:00:00Z")
            const formattedDatetime = new Date(todoData.datetime).toISOString();

            const createdTodo = await todoService.createTodo({
                name: todoData.name,
                description: todoData.description,
                datetime: formattedDatetime,
                todoListId: parseInt(todoData.todoListId, 10) // S'assurer que c'est un nombre
            });

            const todoId = createdTodo.id;
            const createdStepIds = [];

            // 2. Créer chaque Étape et les lier à la Tâche
            for (const step of steps) {
                // Validation simple pour chaque étape
                if (!step.name || !step.description) {
                    setError("Veuillez remplir tous les champs 'Nom' et 'Description' pour chaque étape.");
                    setLoading(false);
                    return;
                }
                const createdStep = await stepService.createStep({
                    name: step.name,
                    description: step.description,
                    position: step.position
                });
                createdStepIds.push(createdStep.id);
                await todoStepService.createTodoStep(todoId, createdStep.id);
            }

            setSuccess("Tâche et ses étapes créées avec succès !");
            setLoading(false);
            setTimeout(() => {
                navigate('/todos');
            }, 1500);

        } catch (err) {
            setError(`Échec de la création : ${err.message || JSON.stringify(err)}`);
            console.error("Erreur lors de la création de la tâche et des étapes :", err);
            setLoading(false);
        }
    };

    return (
        <div className="add-todo-page flex-container" style={{ flexDirection: 'column', maxWidth: 600, margin: '0 auto', background: 'var(--color-bg-secondary-light)', borderRadius: 12, boxShadow: '0 2px 8px var(--color-shadow-light)' }}>
            <h2 style={{ textAlign: 'center', color: 'var(--color-accent-primary)', marginBottom: 20 }}>Créer une nouvelle tâche</h2>
            <form onSubmit={handleSubmit} className="add-todo-form" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {error && <p className="error-message" style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                {success && <p className="success-message" style={{ color: 'green', textAlign: 'center' }}>{success}</p>}

                {/* Section principale */}
                <fieldset className="todo-main-section item" style={{ border: '1px solid var(--color-border-light)', borderRadius: 8, padding: 20, background: 'var(--color-bg-primary-light)' }}>
                    <legend style={{ color: 'var(--color-accent-primary)', fontWeight: 600 }}>Détails de la tâche</legend>
                    <div className="form-group" style={{ marginBottom: 16 }}>
                        <label htmlFor="name">Nom de la tâche</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={todoData.name}
                            onChange={handleChange}
                            required
                            placeholder="Ex : Courses, Réunion, ..."
                            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid var(--color-border-light)', background: 'var(--color-input-bg-light)' }}
                        />
                    </div>
                    <div className="form-group" style={{ marginBottom: 16 }}>
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={todoData.description}
                            onChange={handleChange}
                            required
                            placeholder="Décris ta tâche..."
                            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid var(--color-border-light)', background: 'var(--color-input-bg-light)', minHeight: 60 }}
                        ></textarea>
                    </div>
                    <div className="form-group" style={{ marginBottom: 16 }}>
                        <label htmlFor="datetime">Date et heure</label>
                        <input
                            type="datetime-local"
                            id="datetime"
                            name="datetime"
                            value={todoData.datetime}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid var(--color-border-light)', background: 'var(--color-input-bg-light)' }}
                        />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                        <label htmlFor="todoListId">Liste de tâches</label>
                        <select
                            id="todoListId"
                            name="todoListId"
                            value={todoData.todoListId}
                            onChange={handleChange}
                            required
                            disabled={!!passedTodoListId || todoLists.length === 0}
                            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid var(--color-border-light)', background: 'var(--color-input-bg-light)' }}
                        >
                            {todoLists.length === 0 ? (
                                <option value="">Chargement des listes...</option>
                            ) : (
                                <>
                                    <option value="">Sélectionner une liste</option>
                                    {todoLists.map(list => (
                                        <option key={list.id} value={list.id}>{list.name}</option>
                                    ))}
                                </>
                            )}
                        </select>
                        {todoLists.length === 0 && !loading && (
                            <p className="info-message" style={{ color: 'var(--color-accent-secondary)', marginTop: 8 }}>Aucune liste trouvée. Créez-en une d'abord.</p>
                        )}
                    </div>
                </fieldset>

                {/* Étapes dynamiques */}
                <fieldset className="todo-steps-section item" style={{ border: '1px solid var(--color-border-light)', borderRadius: 8, padding: 20, background: 'var(--color-bg-primary-light)' }}>
                    <legend style={{ color: 'var(--color-accent-primary)', fontWeight: 600 }}>Étapes (optionnel)</legend>
                    {steps.map((step, index) => (
                        <div key={index} className="step-item flex-container" style={{ flexDirection: 'column', gap: 8, marginBottom: 16, background: 'var(--color-bg-secondary-light)', borderRadius: 6, padding: 12, border: '1px solid var(--color-border-light)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h4 style={{ margin: 0, color: 'var(--color-accent-primary)' }}>Étape {index + 1}</h4>
                                {steps.length > 1 && (
                                    <button type="button" onClick={() => handleRemoveStep(index)} className="remove-step-button" style={{ background: 'var(--color-accent-secondary)', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 10px', cursor: 'pointer' }}>
                                        Supprimer
                                    </button>
                                )}
                            </div>
                            <div className="form-group">
                                <label htmlFor={`step-name-${index}`}>Nom de l'étape</label>
                                <input
                                    type="text"
                                    id={`step-name-${index}`}
                                    name="name"
                                    value={step.name}
                                    onChange={(e) => handleStepChange(index, e)}
                                    required
                                    placeholder="Ex : Préparer les ingrédients"
                                    style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid var(--color-border-light)', background: 'var(--color-input-bg-light)' }}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor={`step-description-${index}`}>Description</label>
                                <textarea
                                    id={`step-description-${index}`}
                                    name="description"
                                    value={step.description}
                                    onChange={(e) => handleStepChange(index, e)}
                                    required
                                    placeholder="Décris cette étape..."
                                    style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid var(--color-border-light)', background: 'var(--color-input-bg-light)', minHeight: 40 }}
                                ></textarea>
                            </div>
                        </div>
                    ))}
                    <button type="button" onClick={handleAddStep} className="add-step-button" style={{ background: 'var(--color-accent-primary)', color: '#fff', border: 'none', borderRadius: 4, padding: '8px 16px', fontWeight: 600, cursor: 'pointer', marginTop: 8 }}>
                        + Ajouter une étape
                    </button>
                </fieldset>

                <button type="submit" disabled={loading} className="submit-button" style={{ background: 'var(--color-accent-primary)', color: '#fff', border: 'none', borderRadius: 6, padding: '12px 0', fontWeight: 700, fontSize: 18, marginTop: 10, cursor: 'pointer', boxShadow: '0 1px 4px var(--color-shadow-light)' }}>
                    {loading ? 'Création en cours...' : 'Créer la tâche'}
                </button>
            </form>
        </div>
    );
}

export default TodoForm;