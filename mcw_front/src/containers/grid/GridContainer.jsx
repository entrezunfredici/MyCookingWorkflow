import React from 'react';
import './GridContainer.css';

const GridContainer = ({ children, columns = 3 }) => {
    const gridStyle = {
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
    };

    return (
        <div className="grid-container" style={gridStyle}>
            {children}
        </div>
    );
};

export default GridContainer;
