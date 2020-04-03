import { SAVE_LOCAL_WORK_ORDER } from '../actions/localWorkOrders'

export default function localWorkOrders(state = null, action) {
    switch(action.type) {
        case SAVE_LOCAL_WORK_ORDER:
            return {
                ...state,
                [action.localWorkOrder.wonum]: action.localWorkOrder
            }        
        default:
            return state
    }
}