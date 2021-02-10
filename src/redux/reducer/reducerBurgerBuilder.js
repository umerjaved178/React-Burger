import {ADD_INGREDIENTS, REMOVE_INGREDIENTS, SET_INGREDIENTS, ERROR_INGREDIENTS} from '../actions/types'

const PRICES = {
    salad: 0.5,
    bacon: 1.5,
    cheese: 1,
    meat: 2,
}

const initialState = {
    ingredients: null,
    totalPrice: 4.0,
    error: false
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice : state.totalPrice + PRICES[action.ingredientName]
            };
    
        case REMOVE_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice : state.totalPrice - PRICES[action.ingredientName]
            };

        case SET_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    salad: action.payload.salad,
                    bacon: action.payload.bacon,
                    cheese: action.payload.cheese,
                    meat: action.payload.meat,
                },
                error: false
            };
        
        case ERROR_INGREDIENTS:
            return {
                ...state,
                error: true
            };
            
        default:
            return state
    }
};

export default reducer