import React from 'react';
import './Login.css';
import { useState } from 'react';
import Form from '../../components/main_components/form/Form.jsx';

const Login = () => {
    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    return (
        <div className="login-container">
            <Form
                title="Login"
                fields={[
                    { name: 'username', label: 'Username', type: 'text', required: true },
                    { name: 'password', label: 'Password', type: 'password', required: true },
                ]}
                onSubmit={handleSubmit}
                submitButtonText="Login"
            />
        </div>
    );
}
