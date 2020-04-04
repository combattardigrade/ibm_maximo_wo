export const SAVE_LOCAL_WORK_ORDER = 'SAVE_LOCAL_WORK_ORDER'
export const SAVE_LABOR_TRANSACTION = 'SAVE_LABOR_TRANSACTION'

export function saveLocalWorkOrder(localWorkOrder) {    
    return {
        type: SAVE_LOCAL_WORK_ORDER,
        localWorkOrder
    }
}

export function saveLaborTransaction(laborTransaction) {
    return {
        type: SAVE_LABOR_TRANSACTION,
        laborTransaction
    }
}
