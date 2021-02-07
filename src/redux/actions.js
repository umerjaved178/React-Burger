import {ADD_INGREDIENTS, REMOVE_INGREDIENTS} from './types'

export const add_ingredients = () => {
    return {
        type:ADD_INGREDIENTS,
        payload: "add"
    }
}

export const remove_ingredients = () => {
    return {
        type:REMOVE_INGREDIENTS,
        payload: "remove"
    }
}