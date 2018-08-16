import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
};

const INGREDIENTS_PRICE = {
    salad: 0.5,
    cheese: 1,
    bacon: 1.5,
    meat: 2.5
};

const addIngredient = (state, action) => {
    const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1};
    return updateObject(state, {
        ingredients: updateObject(state.ingredients, updatedIngredient),
        totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredientName]
    });
};

const removeIngredient = (state, action) => {
    const updatedIng = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1};
    return updateObject(state, {
        ingredients: updateObject(state.ingredients, updatedIng),
        totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredientName]
    });
};

const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: action.ingredients,
        totalPrice: 4,
        error: false
    });
};

const fetchIngredientsFailed = (state, action) => {
    return updateObject(state, { error: true });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);
        default: return state;
    }
};

export default reducer;