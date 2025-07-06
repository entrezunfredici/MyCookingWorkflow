import './Login.css';
import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import Form from '../../../components/main_components/form/Form.jsx';
import { setCookie, parseJwt } from '../../../utils/cookieManager';
import { userService } from '../../../utils/apiUserService.js';


const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const successMsg = location.state?.success;

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
            
            // Stocker le token d'authentification
            setCookie('auth_token', token, 7);
            // Stocker l'ID utilisateur
            let userId;
            if (response.userId) {
                // Si l'API retourne directement l'userId
                userId = response.userId;
            } else if (user && user.id) {
                // Si l'API retourne l'objet user avec l'id
                userId = user.id;
            } else {
                // Décoder le token JWT pour extraire l'userId
                const decodedToken = parseJwt(token);
                userId = decodedToken?.userId || decodedToken?.id;
            }
            
            if (userId) {
                console.log(userId)
                setCookie('user_id', userId.toString(), 7);
            }

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
            {successMsg && <p style={{ color: 'green', textAlign: 'center' }}>{successMsg}</p>}
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
