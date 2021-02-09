import {ADD_INGREDIENTS, REMOVE_INGREDIENTS} from './types'

export const add_ingredients = (ingName) => {
    return {
        type:ADD_INGREDIENTS,
        ingredientName: ingName
    }
}

export const remove_ingredients = (ingName) => {
    return {
        type:REMOVE_INGREDIENTS,
        ingredientName: ingName
    }
}