import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENTS_PRICE = {
    salad: 0.5,
    cheese: 1,
    bacon: 1.5,
    meat: 2.5
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            cheese: 0,
            bacon: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false
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

    render() {
        const disabledItems = { ...this.state.ingredients };
        for (let k in disabledItems) {
            disabledItems[k] = disabledItems[k] <=0;
        }
        return(
            <Fragment>
                <Burger ingredients={this.state.ingredients}/>
                <BurgerControls
                    totalPrice={this.state.totalPrice}
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    purchasable={this.state.purchasable}
                    disabledItems={disabledItems}/>
            </Fragment>
        )
    }
}

export default BurgerBuilder;