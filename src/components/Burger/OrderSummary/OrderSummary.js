import React, { Fragment } from 'react';
// import classes from './OrderSummary.css';

import Button from '../../UI/Button/Button';

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
            <Button type="Success" clicked={props.checkout}>Checkout</Button>
            <Button type="Danger" clicked={props.cancel}>Cancel</Button>
        </Fragment>
    )
};

export default orderSummary;