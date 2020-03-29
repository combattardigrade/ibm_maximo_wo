import { SAVE_MATERIALS } from '../actions/materials'

export default function materials(state = null, action) {
    switch(action.type) {
        case SAVE_MATERIALS:
            return {
                ...state,
                ...action.materials
            }
        default:
            return state
    }
}