import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-order';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount = () => {
        // axios.get('/ingredients.json')
        // .then((res) => {
        //         this.setState({ ingredients: res.data, error: false });
        //     })
        // .catch((error) => {
        //     this.setState({ error: true })
        // })
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
        this.props.history.push('/checkout');
    }

    render() {
        const disabledItems = { ...this.props.ings };
        for (let k in disabledItems) {
            disabledItems[k] = disabledItems[k] <=0;
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Error on loading ingredients</p> : <Spinner />;

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

        if (this.state.loading) {
            orderSummary = <Spinner />;
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
        onIngredientAdded: (name) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: name}),
        onIngredientRemoved: (name) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: name})
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));