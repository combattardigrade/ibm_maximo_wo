import { SAVE_LOCAL_WORK_ORDER } from '../actions/localWorkOrders'

const initialState = {
    localWorkOrders: []
}


export default function auth(state = initialState, action) {
    switch(action.type) {
        case SAVE_LOCAL_WORK_ORDER:
            return {
                ...state,
                localWorkOrders: [...action.localWorkOrder]
            }        
        default:
            return state
    }
}