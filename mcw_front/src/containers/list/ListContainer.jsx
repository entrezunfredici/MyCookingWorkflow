import React from 'react';
import './ListContainer.css'; // On créera ce fichier CSS

const ListContainer = ({ title, children }) => {
    return (
        <div className="list-container">
            {title && <h2 className="list-title">{title}</h2>}
            <ul className="list-items">
                {React.Children.map(children, child => (
                    <li className="list-item">
                        {child}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListContainer;