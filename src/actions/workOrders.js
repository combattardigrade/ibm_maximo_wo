export const SAVE_WORK_ORDERS = 'SAVE_WORK_ORDERS'
export const SAVE_CURRENT_WO = 'SAVE_CURRENT_WO'
export const SAVE_WO_SAFETY = 'SAVE_WO_SAFETY'

export function saveWorkOrders(workOrders) {    
    return {
        type: SAVE_WORK_ORDERS,
        workOrders: workOrders,
    }
}

export function saveCurrentWorkOrder(currentWorkOrder) {
    return {
        type: SAVE_CURRENT_WO,
        currentWorkOrder: currentWorkOrder
    }
}

export function saveWorkOrderSafety(workOrderSafety) {
    return {
        type: SAVE_WO_SAFETY,
        workOrderSafety: workOrderSafety
    }
}