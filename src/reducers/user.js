import { SAVE_USER } from '../actions/user'

export default function user(state = null, action) {
    switch(action.type) {
        case SAVE_USER:
            return {
                ...action.user,                
            }
        default:
            return state
    }
}