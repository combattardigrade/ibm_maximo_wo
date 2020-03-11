import { SAVE_LABOR_CATALOG } from '../actions/labor'

export default function laborCatalog(state = null, action) {
    switch(action.type) {
        case SAVE_LABOR_CATALOG:
            return {
                ...state,
                laborCatalog: action.laborCatalog
            }
        default:
            return state
    }
}