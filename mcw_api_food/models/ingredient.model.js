const { DataTypes } = require('sequelize');

module.exports = (instance) => {
    const Ingredients = instance.define('Ingredients', {
        ingredientID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
    }, {
        tableName: 'Ingredients',
        timestamps: true,
    })

    Ingredients.associate = (models) => {
        Ingredients.hasMany(models.RecipeIngredients, {
            foreignKey: 'ingredientID',
            as: 'RecipesIngredients',
        });
    }

    return Ingredients;
}
