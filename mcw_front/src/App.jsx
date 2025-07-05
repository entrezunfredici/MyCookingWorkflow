import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './styles/themeProvider'; // Assure-toi que ce chemin est correct
import './App.css'; // Ton CSS spécifique à App (si tu en as un)

// Importe tes composants
import NavBar from './components/main_components/navbar/NavBar.jsx'; // Chemin correct
import Terms from './components/main_components/terms/Terms.jsx'; // Chemin correct, si Terms est ton footer
import HomePage from './pages/home_page/HomePage.jsx'; // Chemin correct
import Profile from './pages/users/profile/Profile.jsx'; // Chemin correct
import Login from './pages/users/login/Login.jsx'; // Chemin correct
import Register from './pages/users/register/Register.jsx'; // Chemin correct
import TodoList from './pages/tools/todolist/TodoList.jsx'; // Chemin correct, si c'est la liste des tâches
import Todo from './pages/tools/todo/Todo.jsx'; // Chemin correct, si c'est la page de détail d'une tâche
import CalendarWeekView from './pages/tools/calendar/CalendarWeekView.jsx';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <header>
          <NavBar />
        </header>

        <main style={{ flexGrow: 1, paddingBottom: '80px' }}> {/* Ajouté pour le footer fixe, ajuste si besoin */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/todos" element={<TodoList />} />
            <Route path="/todos/:id" element={<Todo />} /> {/* Route pour les détails d'une tâche spécifique */}
            <Route path="/calendar" element={<CalendarWeekView />} />
            {/* Route pour les pages non trouvées (404) */}
            <Route path="*" element={<div><h1>404 - Page non trouvée</h1><p>Désolé, cette page n'existe pas.</p></div>} />
          </Routes>
        </main>

        <footer>
          <Terms />
        </footer>
      </ThemeProvider>
    </Router>
  );
}

export default App;
