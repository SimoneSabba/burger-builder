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
            <p><strong>Total price: {props.totalPrice.toFixed(2)}£</strong></p>
            <p>Continue to checkout?</p>
            <Button type="Danger" clicked={props.cancel}>CANCEL</Button>
            <Button type="Success" clicked={props.checkout}>CONTINUE</Button>
        </Fragment>
    )
};

export default orderSummary;