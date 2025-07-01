import React, { useState } from 'react';
import './Form.css';

const Form = ({title, fields,onSubmit,submitButtonText = 'Submit',}) => {
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
        onSubmit(formData);
    };
    
    return (
        <form className="form" onSubmit={handleSubmit}>
            {title && <h2 className="form-title">{title}</h2>}
            {fields.map((field) => (
                <div key={field.name} className="form-field">
                <label htmlFor={field.name}>{field.label}</label>
                <input
                    type={field.type}
                    name={field.name}
                    id={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    required={field.required}
                />
                </div>
            ))}
            <button type="submit" className="form-submit-button">
                {submitButtonText}
            </button>
        </form>
    );
};

export default Form;
