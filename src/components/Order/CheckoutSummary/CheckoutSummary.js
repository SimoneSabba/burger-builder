import React from 'react';
import classes from './CheckoutSummary.css';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1> Mmmm....looks delicious! </h1>
            <div className={classes.Burger_wrapper}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button clicked={props.checkoutCancelled} type="Danger"> CANCEL </Button>
            <Button clicked={props.checkoutContinued} type="Success"> CONTINUE </Button>
        </div>
    );
};

export default checkoutSummary;