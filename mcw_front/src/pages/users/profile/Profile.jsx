import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../../../utils/cookieManager';
import './Profile.css';

const Profile = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/login');
        } else {
            // Simulate fetching user data
            const fetchedUser = {
                username: 'JohnDoe',
                email: 'john.doe@gmail.com'
            };
            setUser(fetchedUser);
        }
    }, [navigate]);
    const handleLogout = () => {
        // Logic to handle logout
        console.log('User logged out');
        navigate('/login');
    };
    return (
        <div className="profile-container">
            {user ? (
                <div className="profile-details">
                    <h2>Profile</h2>
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};
export default Profile;
