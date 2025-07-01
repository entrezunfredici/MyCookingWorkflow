import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import NavBar from './components/main_components/navbar/NavBar.jsx'
import Terms from './components/main_components/terms/Terms.jsx'
import HomePage from './pages/home_page/HomePage.jsx'
import Profile from './pages/users/profile/Profile.jsx'
import Login from './pages/users/login/Login.jsx'
import Register from './pages/users/register/Register.jsx'

function App() {
  return (
    <Router>
      <header>
        < NavBar />
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>

      <footer>
        <Terms />
      </footer>
    </Router>
  )
}

export default App
