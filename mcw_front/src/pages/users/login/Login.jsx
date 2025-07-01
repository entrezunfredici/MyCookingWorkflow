import './Login.css';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Form from '../../../components/main_components/form/Form.jsx';
import { setCookie } from '../../../utils/cookieManager';
import { userService } from '../../../utils/apiService.js';


const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const loginFields = [
        { name: 'email', label: 'Email', type: 'email', required: true },
        { name: 'password', label: 'Mot de passe', type: 'password', required: true },
    ];

    const handleLoginSubmit = async (formData) => {
        setError(null);
        setLoading(true);

        try {
            const response = await userService.login(formData);
            const { token, user } = response; 
            setCookie('auth_token', token, 7);

            console.log('Connexion réussie ! Utilisateur :', user);
            navigate('/profile');
        } catch (err) {
            console.error('Erreur de connexion :', err);
            setError(err || 'Échec de la connexion. Veuillez réessayer.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Form
                title="Connexion"
                fields={loginFields}
                onSubmit={handleLoginSubmit}
                submitButtonText={loading ? 'Connexion en cours...' : 'Se connecter'}
            />
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <p>Pas encore de compte ?</p>
                <Link to="/register" className="register-button-link">S'inscrire</Link>
            </div>
        </div>
    );
};

export default Login;
