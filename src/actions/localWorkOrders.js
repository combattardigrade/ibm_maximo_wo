export const SAVE_LOCAL_WORK_ORDER = 'SAVE_LOCAL_WORK_ORDER'

export function saveLocalWorkOrder(localWorkOrder) {    
    return {
        type: SAVE_LOCAL_WORK_ORDER,
        localWorkOrder
    }
}

