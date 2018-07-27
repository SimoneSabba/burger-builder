import React from 'react';
import classes from './Order.css'

const order = (props) => {
    const ingredients = [];

    for (let ingName in props.ingredients) {
        ingredients.push({
            name: ingName,
            quantity: props.ingredients[ingName]
        });
    }

    const ingredientsOutput = ingredients.map((ig) => {
        return <span key={ig.name} className={classes.Order__ingredient}>{ig.name} ({ig.quantity})</span>
    });

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientsOutput}</p>
            <p>Price: <strong>£ {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    )
};

export default order;