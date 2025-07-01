import React from 'react';
import './Register.css';
import Form from '../../../components/main_components/form/Form.jsx';
import { useState } from 'react';

const Register = () => {
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
        <div className="register-container">
            <Form
                title="Register"
                fields={[
                    { name: 'username', label: 'Username', type: 'text', required: true },
                    { name: 'email', label: 'Email', type: 'email', required: true },
                    { name: 'password', label: 'Password', type: 'password', required: true },
                ]}
                onSubmit={handleSubmit}
                onChange={handleChange}
                submitButtonText="Register"
            />
        </div>
    );
}

export default Register;
