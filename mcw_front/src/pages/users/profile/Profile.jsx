import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, getCookie, parseJwt } from '../../../utils/cookieManager';
import axios from 'axios';
import './Profile.css';

const API_URL = import.meta.env.VITE_USERS_API_URL || 'http://localhost:3002';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [form, setForm] = useState({ name: '', email: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/login');
        } else {
            const token = getCookie('auth_token');
            const payload = parseJwt(token);
            if (!payload || !payload.id) {
                setError('Token invalide.');
                setLoading(false);
                return;
            }
            const userId = payload.id;
            axios.get(`${API_URL}/users/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(res => {
                    setUser(res.data);
                    setForm({ name: res.data.name, email: res.data.email });
                    setLoading(false);
                })
                .catch(() => {
                    setError('Erreur lors du chargement du profil.');
                    setLoading(false);
                });
        }
    }, [navigate]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        const token = getCookie('auth_token');
        const payload = parseJwt(token);
        if (!payload || !payload.id) {
            setError('Token invalide.');
            return;
        }
        const userId = payload.id;
        try {
            await axios.put(`${API_URL}/users/${userId}`, { ...form }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSuccess('Profil mis à jour avec succès !');
        } catch {
            setError("Erreur lors de la mise à jour du profil.");
        }
    };

    const handleLogout = () => {
        // Logic to handle logout
        document.cookie = 'auth_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        navigate('/login');
    };

    return (
        <div className="profile-container">
            {loading ? (
                <p>Chargement...</p>
            ) : user ? (
                <div className="profile-details">
                    <h2>Mon profil</h2>
                    <form onSubmit={handleSave} className="profile-form">
                        <div className="form-group">
                            <label htmlFor="name">Nom :</label>
                            <input type="text" id="name" name="name" value={form.name} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email :</label>
                            <input type="email" id="email" name="email" value={form.email} onChange={handleChange} required />
                        </div>
                        {error && <p className="error-message">{error}</p>}
                        {success && <p className="success-message">{success}</p>}
                        <button type="submit">Enregistrer</button>
                    </form>
                    <button onClick={handleLogout} style={{ marginTop: 20 }}>Se déconnecter</button>
                </div>
            ) : (
                <p>Erreur lors du chargement du profil.</p>
            )}
        </div>
    );
};

export default Profile;
