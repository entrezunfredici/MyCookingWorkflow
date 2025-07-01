import React from 'react';
import Grid from '../../containers/grid/GridContainer.jsx';
import './HomePage.css';

const HomePage = () => {
    const recipes = ["test", "test2", "test3", "test4", "test5", "test6", "test7", "test8", "test9", "test10"]
    return (
        <div>
            <Grid columns={3}>
                {recipes.map((recipe, index) => (
                    <div key={index} className="grid-item">
                        {recipe}
                    </div>
                ))}
            </Grid>
        </div>
    );
}
export default HomePage;
