import React, { Fragment, Component } from 'react';
// import classes from './OrderSummary.css';

import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    render () {
        const orderIngredients = Object.keys(this.props.ingredients)
            .map(igKey => {
                return (
                    <li key={igKey}>
                        <span style={{ textTransform: 'capitalize' }}>{igKey}</span>:
                        {this.props.ingredients[igKey]}
                    </li> );
            });

        return (
            <Fragment>
                <h3>Your order</h3>
                <p>Those are ingredients you choose:</p>
                <ul>
                    {orderIngredients}
                </ul>
                <p><strong>Total price: {this.props.totalPrice.toFixed(2)}£</strong></p>
                <p>Continue to checkout?</p>
                <Button type="Danger" clicked={this.props.cancel}>CANCEL</Button>
                <Button type="Success" clicked={this.props.checkout}>CONTINUE</Button>
            </Fragment>
        )
    }
}

export default OrderSummary;