import { SAVE_ASSETS } from '../actions/assets'

export default function inventory(state = null, action) {
    switch(action.type) {
        case SAVE_ASSETS:
            return {
                ...state,
                assets: action.assets
            }
        default:
            return state
    }
}