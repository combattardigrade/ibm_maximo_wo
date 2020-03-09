import { SAVE_INVENTORY } from '../actions/inventory'

export default function inventory(state = null, action) {
    switch(action.type) {
        case SAVE_INVENTORY:
            return {
                ...state,
                inventory: action.inventory
            }
        default:
            return state
    }
}