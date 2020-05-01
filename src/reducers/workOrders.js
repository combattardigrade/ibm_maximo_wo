import {
    SAVE_WORK_ORDERS, SAVE_CURRENT_WO, SAVE_WO_SAFETY,
    UPDATE_WO_STATUS,
} from '../actions/workOrders'

export default function auth(state = null, action) {
    switch (action.type) {
        case SAVE_WORK_ORDERS:
            return {
                ...state,
                workOrders: action.workOrders
            }
        case SAVE_CURRENT_WO:
            return {
                ...state,
                currentWorkOrder: action.currentWorkOrder
            }
        case SAVE_WO_SAFETY:
            return {
                ...state,
                workOrderSafety: action.workOrderSafety
            }
        case UPDATE_WO_STATUS:
            return {
                ...state,
                currentWorkOrder: {
                    ...state.currentWorkOrder,
                    status: action.status
                }
            }
        default:
            return state
    }
}