import React from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import Form from '../../../components/main_components/form/Form.jsx';
import { useState } from 'react';
import { userService } from '../../../utils/apiUserService.js';

const Register = () => { // Renommé de RegisterPage à Register
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const registerFields = [
        { name: 'name', label: 'Nom d\'utilisateur', type: 'text', required: true },
        { name: 'email', label: 'Email', type: 'email', required: true },
        { name: 'password', label: 'Mot de passe', type: 'password', required: true },
        { name: 'confirmPassword', label: 'Confirmer le mot de passe', type: 'password', required: true },
    ];

    const handleRegisterSubmit = async (formData) => {
        setError(null);
        setLoading(true);

        if (formData.password !== formData.confirmPassword) {
            setError('Les mots de passe ne correspondent pas !');
            setLoading(false);
            return;
        }

        try {
            const dataToSend = {
                name: formData.name,
                email: formData.email,
                password: formData.password
            };
            const response = await userService.register(dataToSend);

            console.log(response);
            navigate('/login', { state: { success: "Inscription réussie, veuillez vous connecter." } });
        } catch (err) {
            console.error('Erreur d\'inscription :', err);
            setError(err?.message || err || 'Échec de l\'inscription. Veuillez réessayer.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Form
                title="Inscription"
                fields={registerFields}
                onSubmit={handleRegisterSubmit}
                submitButtonText={loading ? 'Inscription en cours...' : 'S\'inscrire'}
            />
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        </div>
    );
};

export default Register;
