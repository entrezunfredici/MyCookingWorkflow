import { useState, useEffect } from 'react';
import ListContainer from '../../../containers/list/ListContainer.jsx';
import TodoListItem from '../../../components/objects_components/todo_list_item/TodoListItem.jsx'; // Le nouveau composant
import { todoService } from '../../../utils/apiToolService.js';
import './TodoList.css';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [newTodoName, setNewTodoName] = useState('');
    const [newTodoDescription, setNewTodoDescription] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Charger toutes les tâches au montage
    useEffect(() => {
        const fetchTodos = async () => {
            try {
                setLoading(true);
                const fetchedTodos = await todoService.getAllTodos();
                // Tri par date ou par un champ 'position' si l'API le fournit
                // Ici, on trie par datetime du plus récent au plus ancien
                const sortedTodos = fetchedTodos.sort((a, b) => new Date(b.datetime) - new Date(a.datetime));
                setTodos(sortedTodos);
                setError(null);
            } catch (err) {
                console.error("Erreur lors du chargement des tâches:", err);
                setError("Impossible de charger les tâches. Veuillez réessayer.");
            } finally {
                setLoading(false);
            }
        };
        fetchTodos();
    }, []);

    const handleAddTodo = async () => {
        if (newTodoName.trim() === '') {
            alert('Veuillez saisir le nom de la tâche !');
            return;
        }
        const newTodoData = {
            name: newTodoName.trim(),
            description: newTodoDescription.trim(),
            datetime: new Date().toISOString(), // Date actuelle au format ISO
            todoListId: 1, // Assumes a default todoListId (adjust as needed for your app logic)
        };
        try {
            const addedTodo = await todoService.createTodo(newTodoData);
            // Ajoute la nouvelle tâche au début de la liste (pour qu'elle apparaisse en haut)
            setTodos([addedTodo, ...todos]);
            setNewTodoName('');
            setNewTodoDescription('');
        } catch (err) {
            console.error("Erreur lors de l'ajout de la tâche:", err);
            setError("Impossible d'ajouter la tâche. Veuillez réessayer.");
        }
    };

    // La suppression sera gérée indirectement si tu ajoutes une suppression sur la page de détail,
    // ou tu peux ajouter un bouton de suppression ici si tu veux supprimer directement depuis la liste.
    // Pour l'instant, la suppression se fera depuis la page de détail (TodoPage).

    return (
        <div className="todolist-page-container">
            <h1 className="todolist-page-header">Mes Listes de Tâches</h1>

            <div className="add-todo-form">
                <input
                    type="text"
                    value={newTodoName}
                    onChange={(e) => setNewTodoName(e.target.value)}
                    placeholder="Nom de la nouvelle tâche..."
                />
                <textarea
                    value={newTodoDescription}
                    onChange={(e) => setNewTodoDescription(e.target.value)}
                    placeholder="Description de la nouvelle tâche..."
                    rows="3"
                ></textarea>
                <button className="add-todo-button" onClick={handleAddTodo}>
                    Ajouter Tâche
                </button>
            </div>

            {loading && <p style={{ textAlign: 'center' }}>Chargement des tâches...</p>}
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
            
            {!loading && !error && todos.length === 0 ? (
                <p className="no-todos-message">
                    Aucune tâche pour le moment. Ajoutez-en une !
                </p>
            ) : (
                <ListContainer title="Toutes les tâches" listClassName="main-todos-list-container">
                    {todos.map((todo) => (
                        <TodoListItem key={todo.id} todo={todo} />
                    ))}
                </ListContainer>
            )}
        </div>
    );
};

export default TodoList;
