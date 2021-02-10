import {ADD_INGREDIENTS, REMOVE_INGREDIENTS, SET_INGREDIENTS, ERROR_INGREDIENTS} from './types'
import axios from '../../axios-instance'


export const add_ingredients = (ingName) => {
    return {
        type: ADD_INGREDIENTS,
        ingredientName: ingName
    }
}

export const remove_ingredients = (ingName) => {
    return {
        type: REMOVE_INGREDIENTS,
        ingredientName: ingName
    }
}

export const set_ingredients = (ingredients) => {
    return {
        type: SET_INGREDIENTS,
        payload: ingredients
    }
}

export const error_ingredients = () => {
    return {
        type: ERROR_INGREDIENTS,
    }
}

export const init_ingredients = () => {
    return dispatch => {
        axios.get('https://burger-3ca8b-default-rtdb.firebaseio.com/ingredients.json')
        .then(res => {
            dispatch(set_ingredients(res.data))
            })
        .catch(error=>{
            dispatch(error_ingredients())
        })
    }
}