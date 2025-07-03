// src/components/ListContainer/ListContainer.jsx

import React from 'react';
import './ListContainer.css';

const ListContainer = ({ title, children, listItemClassName = '', listClassName = '' }) => { // Ajout de listClassName
    return (
        <div className={`list-container ${listClassName}`}> {/* Appliquer listClassName ici si besoin */}
            {title && <h2 className="list-title">{title}</h2>}
            <ul className="list-items">
                {React.Children.map(children, child => (
                    // On s'assure qu'un key est toujours présent si les enfants n'en ont pas
                    <li className={`list-item ${listItemClassName}`} key={child?.key || child?.props?.id || Math.random()}>
                        {child}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListContainer;