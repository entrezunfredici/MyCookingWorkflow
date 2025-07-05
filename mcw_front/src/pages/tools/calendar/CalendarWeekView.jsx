import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, getCookie } from '../../../utils/cookieManager';
import { todoService, todoListService } from '../../../utils/apiToolService.js';
import './CalendarWeekView.css';
import { useTheme } from '../../../styles/themeProvider';

const daysOfWeek = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

function getStartOfWeek(date) {
    // Retourne le lundi de la semaine courante
    const d = new Date(date);
    const day = d.getDay() || 7; // 1 (lundi) à 7 (dimanche)
    if (day !== 1) d.setHours(-24 * (day - 1));
    d.setHours(0, 0, 0, 0);
    return d;
}

function pad(n) { return n < 10 ? '0' + n : n; }

const CalendarWeekView = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [weekStart, setWeekStart] = useState(getStartOfWeek(new Date()));
    const [todoListId, setTodoListId] = useState(null);
    const navigate = useNavigate();
    const { theme } = useTheme();

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/login');
            return;
        }
        const userId = getCookie('userId');
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

    // Génère les jours de la semaine courante
    const days = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(weekStart);
        d.setDate(weekStart.getDate() + i);
        return d;
    });

    // Regroupe les todos par jour
    const todosByDay = days.map(day => {
        const dayTodos = todos.filter(todo => {
            if (!todo.datetime) return false;
            const todoDate = new Date(todo.datetime);
            return (
                todoDate.getFullYear() === day.getFullYear() &&
                todoDate.getMonth() === day.getMonth() &&
                todoDate.getDate() === day.getDate()
            );
        });
        // Trie par heure croissante
        return dayTodos.sort((a, b) => new Date(a.datetime) - new Date(b.datetime));
    });

    const handlePrevWeek = () => {
        const prev = new Date(weekStart);
        prev.setDate(weekStart.getDate() - 7);
        setWeekStart(getStartOfWeek(prev));
    };
    const handleNextWeek = () => {
        const next = new Date(weekStart);
        next.setDate(weekStart.getDate() + 7);
        setWeekStart(getStartOfWeek(next));
    };

    // Gestion du clic droit sur une case jour - navigation vers TodoForm
    const handleDayContextMenu = (e, day) => {
        e.preventDefault();
        if (!todoListId) {
            setError("Impossible de créer une tâche : TodoList non trouvée.");
            return;
        }
        // Construit la date/heure par défaut (9h du matin)
        const defaultDateTime = `${day.getFullYear()}-${pad(day.getMonth() + 1)}-${pad(day.getDate())}T09:00`;
        // Navigue vers TodoForm avec les données pré-remplies
        navigate('/tools/todoForm', { 
            state: { 
                todoListId: todoListId,
                datetime: defaultDateTime 
            } 
        });
    };

    return (
        <div className={`calendar-week-view-container ${theme}-mode`}>
            <h2>Calendrier de la semaine</h2>
            <div className="calendar-controls">
                <button onClick={handlePrevWeek}>Semaine précédente</button>
                <span>
                    {days[0].toLocaleDateString()} - {days[6].toLocaleDateString()}
                </span>
                <button onClick={handleNextWeek}>Semaine suivante</button>
            </div>
            {loading ? (
                <p>Chargement...</p>
            ) : error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : (
                <div className="calendar-grid">
                    {days.map((day, i) => (
                        <div key={i} className="calendar-day-column" onContextMenu={e => handleDayContextMenu(e, day)}>
                            <div className="calendar-day-header">
                                <strong>{daysOfWeek[i]}</strong>
                                <div style={{ fontSize: 12 }}>{day.toLocaleDateString()}</div>
                            </div>
                            <div className="calendar-day-tasks">
                                {todosByDay[i].length === 0 ? (
                                    <div className="calendar-no-task">Aucune tâche</div>
                                ) : (
                                    todosByDay[i].map(todo => (
                                        <div key={todo.id} className="calendar-task-card" onClick={() => navigate(`/todos/${todo.id}`)}>
                                            <div className="calendar-task-time">
                                                {new Date(todo.datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                            <div className="calendar-task-title">{todo.name}</div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CalendarWeekView; 