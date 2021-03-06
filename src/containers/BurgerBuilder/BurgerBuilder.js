import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-order';
import * as burgerBuilderActions from '../../store/actions';

class BurgerBuilder extends Component {

    state = {
        purchasing: false,
    }

    componentDidMount = () => {
        this.props.initIngredients();
    }

    updatePurchaseState = (ingredients) => {
        const totalIngredients = Object.keys(ingredients)
            .map(key => { return ingredients[key] })
            .reduce((total, current) => {
                return total + current;
            }, 0);

            return totalIngredients > 0;
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render() {
        const disabledItems = { ...this.props.ings };
        for (let k in disabledItems) {
            disabledItems[k] = disabledItems[k] <=0;
        }

        let orderSummary = null;
        let burger = this.props.error ? <p>Error on loading ingredients</p> : <Spinner />;

        if (this.props.ings) {
            burger = (
                <Fragment>
                     <Burger ingredients={this.props.ings}/>
                    <BurgerControls
                        totalPrice={this.props.price}
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        disabledItems={disabledItems}/>
                </Fragment>
            );

            orderSummary = <OrderSummary
                                ingredients={this.props.ings}
                                cancel={this.purchaseCancelHandler}
                                totalPrice={this.props.price}
                                checkout={this.purchaseContinueHandler}/>
        }

        return(
            <Fragment>
                <Modal show={this.state.purchasing} clicked={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
               {burger}
            </Fragment>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (name) => dispatch(burgerBuilderActions.addIngredient(name)),
        onIngredientRemoved: (name) => dispatch(burgerBuilderActions.removeIngredient(name)),
        initIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
        onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit())
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));