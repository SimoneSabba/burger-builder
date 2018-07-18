import React, { Fragment } from 'react';
// import classes from './OrderSummary.css';

const orderSummary = (props) => {
    const orderIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{ textTransform: 'capitalize' }}>{igKey}</span>:
                    {props.ingredients[igKey]}
                </li> );
        });

    return (
        <Fragment>
            <h3>Your order</h3>
            <p>Those are ingredients you choose:</p>
            <ul>
                {orderIngredients}
            </ul>
            <p>Continue to checkout?</p>
        </Fragment>
    )
};

export default orderSummary;