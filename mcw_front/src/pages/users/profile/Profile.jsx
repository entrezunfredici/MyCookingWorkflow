import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from '../../../utils/apiUserService';
import { getCookie, isAuthenticated } from '../../../utils/cookieManager';
import './Profile.css';

const Profile = () => {
    const [form, setForm] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/login');
            return;
        }
        const fetchUser = async () => {
            setLoading(true);
            setError(null);
            try {
                const userId = getCookie('userId');
                if (!userId) throw new Error('Aucun utilisateur connecté');
                const userData = await userService.getUserById(userId);
                setForm({ name: userData.name, email: userData.email });
            } catch {
                setError('Erreur lors du chargement du profil.');
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [navigate]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        try {
            const userId = getCookie('userId');
            await userService.updateUser(userId, form);
            setSuccess('Profil mis à jour avec succès.');
        } catch {
            setError('Erreur lors de la mise à jour du profil.');
        }
    };

    const handleLogout = () => {
        // Logic to handle logout
        document.cookie = 'auth_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        document.cookie = 'userId=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        navigate('/login');
    };

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="profile-container">
            <h2>Profil</h2>
            <form onSubmit={handleSubmit}>
                <label>Nom :</label>
                <input type="text" name="name" value={form.name || ''} onChange={handleChange} />
                <label>Email :</label>
                <input type="email" name="email" value={form.email || ''} onChange={handleChange} />
                <button type="submit">Mettre à jour</button>
            </form>
            {success && <div className="success-message">{success}</div>}
            <button onClick={handleLogout} style={{ marginTop: 20 }}>Se déconnecter</button>
        </div>
    );
};

export default Profile;
