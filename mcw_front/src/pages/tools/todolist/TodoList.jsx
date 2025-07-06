import { useState, useEffect } from 'react';
import ListContainer from '../../../containers/list/ListContainer.jsx';
import TodoListItem from '../../../components/objects_components/todo_list_item/TodoListItem.jsx';
import { todoService, todoListService } from '../../../utils/apiToolService.js';
import './TodoList.css';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, getCookie } from '../../../utils/cookieManager';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [todoListId, setTodoListId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/login');
            return;
        }
        const userId = getCookie('user_id');
        console.log(userId)
        if (!userId) {
            setError('Utilisateur non authentifié.');
            setLoading(false);
            return;
        }
        const fetchTodos = async () => {
            try {
                setLoading(true);
                // Récupère toutes les listes de l'utilisateur
                const lists = await todoListService.getAll();
                const myList = lists.find(l => String(l.userId) === String(userId));
                if (!myList) {
                    setError("Aucune TodoList trouvée pour cet utilisateur.");
                    setLoading(false);
                    return;
                }
                setTodoListId(myList.todoListId);
                // Récupère tous les todos et filtre ceux de cette liste
                const fetchedTodos = await todoService.getAllTodos();
                const filtered = fetchedTodos.filter(todo => String(todo.todoListId) === String(myList.todoListId));
                setTodos(filtered);
                setError(null);
            } catch (err) {
                console.error("Erreur lors du chargement des tâches:", err);
                setError("Impossible de charger les tâches. Veuillez réessayer.");
            } finally {
                setLoading(false);
            }
        };
        fetchTodos();
    }, [navigate]);

    const isAuth = isAuthenticated();

    return (
        <div className="todolist-page-container">
            <h1 className="todolist-page-header">Tâches prévues pour aujourd'hui</h1>
            {isAuth && todoListId && (
                <button
                    style={{
                        background: 'var(--color-accent-primary)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 6,
                        padding: '10px 20px',
                        fontWeight: 600,
                        fontSize: 16,
                        marginBottom: 20,
                        cursor: 'pointer',
                        boxShadow: '0 1px 4px var(--color-shadow-light)'
                    }}
                    onClick={() => navigate('/tools/todoForm', { state: { todoListId } })}
                >
                    + Créer une nouvelle tâche
                </button>
            )}
            {loading && <p style={{ textAlign: 'center' }}>Chargement des tâches...</p>}
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
            {!loading && !error && todos.length === 0 ? (
                <p className="no-todos-message">
                    Aucune tâche prévue pour aujourd'hui.
                </p>
            ) : (
                <ListContainer title="Tâches du jour" listClassName="main-todos-list-container">
                    {todos.map((todo) => (
                        <TodoListItem key={todo.id} todo={todo} />
                    ))}
                </ListContainer>
            )}
        </div>
    );
};

export default TodoList;
