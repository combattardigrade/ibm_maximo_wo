import {
    SAVE_LOCAL_WORK_ORDER, SAVE_LABOR_TRANSACTION,
    SAVE_MATERIAL_TRANSACTION, SAVE_COMMENT,
    SAVE_ATTACHMENT, DELETE_ATTACHMENT
} from '../actions/localWorkOrders'


export default function localWorkOrders(state = null, action) {
    switch (action.type) {
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
                    laborTransactions: [...state[action.laborTransaction.wonum].laborTransactions, action.laborTransaction]
                }
            }
        case SAVE_MATERIAL_TRANSACTION:
            return {
                ...state,
                [action.materialTransaction.wonum]: {
                    ...state[action.materialTransaction.wonum],
                    materialTransactions: [...state[action.materialTransaction.wonum].materialTransactions, action.materialTransaction]
                }
            }
        case SAVE_COMMENT: {
            return {
                ...state,
                [action.comment.wonum]: {
                    ...state[action.comment.wonum],
                    comments: [...state[action.comment.wonum].comments, action.comment.comment]
                }
            }
        }
        case SAVE_ATTACHMENT: {
            return {
                ...state,
                [action.attachment.wonum]: {
                    ...state[action.attachment.wonum],
                    attachments: [...state[action.attachment.wonum].attachments, action.attachment.data]
                }
            }
        }
        case DELETE_ATTACHMENT: {
            return {
                ...state,
                [action.attachment.wonum]: {
                    ...state[action.attachment.wonum],
                    attachments: state[action.attachment.wonum].attachments.filter((a, i) => action.attachment.index !== i)
                }
            }
        }
        default:
            return state
    }
}