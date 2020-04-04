import { SAVE_LOCAL_WORK_ORDER, SAVE_LABOR_TRANSACTION } from '../actions/localWorkOrders'


export default function localWorkOrders(state = null, action) {
    switch(action.type) {
        case SAVE_LOCAL_WORK_ORDER:
            return {
                ...state,
                [action.localWorkOrder.wonum]: action.localWorkOrder
            }        
        case SAVE_LABOR_TRANSACTION:            
            return {
                ...state,
                [action.laborTransaction.wonum]: {
                    ...state[action.laborTransaction.wonum],
                    laborTransactions: [...state[action.laborTransaction.wonum].laborTransactions,action.laborTransaction]
                }
            }
        default:
            return state
    }
}