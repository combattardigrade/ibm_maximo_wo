import { SAVE_LOCATIONS } from '../actions/locations'

export default function locations(state = null, action) {
    switch(action.type) {
        case SAVE_LOCATIONS:
            return {                
                ...action.locations
            }
        default:
            return state
    }
}