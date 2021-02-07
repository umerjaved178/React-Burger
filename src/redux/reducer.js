// import {ADD_INGREDIENTS, REMOVE_INGREDIENTS} from './types'

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0,
    },
    totalPrice: 4.0
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_INGREDIENTS':
            // return {
            //     ...state,
            //     ingredients: {
            //         ...state.ingredients,
            //         [action.ingredientName]: state.ingredients[action.ingredientName] + 1
            //     }
            // };
            break;
        case 'REMOVE_INGREDIENTS':
            // return {
            //     ...state,
            //     ingredients: {
            //         ...state.ingredients,
            //         [action.ingredientName]: state.ingredients[action.ingredientName] - 1
            //     }
            // };
            break
        default:
            return state.ingredients
    }
};

export default reducer