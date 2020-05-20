export const SAVE_LOCAL_WORK_ORDER = 'SAVE_LOCAL_WORK_ORDER'
export const SAVE_LABOR_TRANSACTION = 'SAVE_LABOR_TRANSACTION'
export const REMOVE_LABOR_TRANSACTION = 'REMOVE_LABOR_TRANSACTION'
export const SAVE_MATERIAL_TRANSACTION = 'SAVE_MATERIAL_TRANSACTION'
export const REMOVE_MATERIAL_TRANSACTION = 'REMOVE_MATERIAL_TRANSACTION'
export const SAVE_COMMENT = 'SAVE_COMMENT'
export const SAVE_ATTACHMENT = 'SAVE_ATTACHMENT'
export const DELETE_ATTACHMENT = 'DELETE_ATTACHMENT'

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

export function removeLaborTransaction(laborTransaction) {
    return {
        type: REMOVE_LABOR_TRANSACTION,
        laborTransaction
    }
}

export function saveMaterialTransaction(materialTransaction) {
    return {
        type: SAVE_MATERIAL_TRANSACTION,
        materialTransaction
    }
}

export function removeMaterialTransaction(materialTransaction) {
    return {
        type: REMOVE_MATERIAL_TRANSACTION,
        materialTransaction
    }
}

export function saveComment(comment) {
    return {
        type: SAVE_COMMENT,
        comment
    }
}

export function saveAttachment(attachment) {
    return {
        type: SAVE_ATTACHMENT,
        attachment
    }
}

export function deleteAttachment(attachment) {
    return {
        type: DELETE_ATTACHMENT,
        attachment
    }
}