export const SAVE_LOCAL_WORK_ORDER = 'SAVE_LOCAL_WORK_ORDER'
export const SAVE_LABOR_TRANSACTION = 'SAVE_LABOR_TRANSACTION'
export const SAVE_MATERIAL_TRANSACTION = 'SAVE_MATERIAL_TRANSACTION'
export const SAVE_COMMENT = 'SAVE_COMMENT'


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

export function saveMaterialTransaction(materialTransaction) {
    return {
        type: SAVE_MATERIAL_TRANSACTION,
        materialTransaction
    }
}

export function saveComment(comment) {
    return {
        type: SAVE_COMMENT,
        comment
    }
}