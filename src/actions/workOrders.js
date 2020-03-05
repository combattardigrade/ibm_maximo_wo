export const SAVE_WORK_ORDERS = 'SAVE_WORK_ORDERS'

export function saveWorkOrders(workOrders) {    
    return {
        type: SAVE_WORK_ORDERS,
        workOrders: workOrders,
    }
}