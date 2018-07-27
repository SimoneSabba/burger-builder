import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-order';

const INGREDIENTS_PRICE = {
    salad: 0.5,
    cheese: 1,
    bacon: 1.5,
    meat: 2.5
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount = () => {
        axios.get('/ingredients.json')
        .then((res) => {
                this.setState({ ingredients: res.data, error: false });
            })
        .catch((error) => {
            this.setState({ error: true })
        })
    }

    addIngredientHandler = (type) => {
        const prevQuantity = this.state.ingredients[type];
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = prevQuantity + 1;

        const newPrice = this.state.totalPrice + INGREDIENTS_PRICE[type];
        this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const prevQuantity = this.state.ingredients[type];

        if (prevQuantity) {
            const updatedIngredients = {
                ...this.state.ingredients
            };
            updatedIngredients[type] = prevQuantity - 1;

            const newPrice = this.state.totalPrice - INGREDIENTS_PRICE[type];
            this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
            this.updatePurchaseState(updatedIngredients);
        }
    }

    updatePurchaseState = (ingredients) => {
        const totalIngredients = Object.keys(ingredients)
            .map(key => { return ingredients[key] })
            .reduce((total, current) => {
                return total + current;
            }, 0);
            this.setState({ purchasable: totalIngredients > 0 });
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        const queryParams = [];

        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
        // this.setState({loading: true});
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Simone',
        //         address: {
        //             street: 'Buckingam Palace',
        //             city: 'London'
        //         },
        //         email: 'simone@gmail.com'
        //     },
        //     deliveryMethod: 'drone'
        // };

        // axios.post('./orders.json', order)
        //     .then(response => {
        //         this.setState({ loading: false, purchasing: false });
        //     })
        //     .catch(error => {
        //         this.setState({ loading: false, purchasing: false });
        //         console.log(error);
        //     });
    }

    render() {
        const disabledItems = { ...this.state.ingredients };
        for (let k in disabledItems) {
            disabledItems[k] = disabledItems[k] <=0;
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Error on loading ingredients</p> : <Spinner />;

        if (this.state.ingredients) {
            burger = (
                <Fragment>
                     <Burger ingredients={this.state.ingredients}/>
                    <BurgerControls
                        totalPrice={this.state.totalPrice}
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                        disabledItems={disabledItems}/>
                </Fragment>
            );

            orderSummary = <OrderSummary
                                ingredients={this.state.ingredients}
                                cancel={this.purchaseCancelHandler}
                                totalPrice={this.state.totalPrice}
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

export default withErrorHandler(BurgerBuilder, axios);