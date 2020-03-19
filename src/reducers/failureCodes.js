import { SAVE_FAILURE_CODES } from '../actions/failureCodes'

export default function failureCodes(state = null, action) {
    switch(action.type) {
        case SAVE_FAILURE_CODES:
            return {                
                ...action.failureCodes
            }
        default:
            return state
    }
}