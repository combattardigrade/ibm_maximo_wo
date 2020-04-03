import { combineReducers } from 'redux'
import auth from './auth'
import workOrders from './workOrders'
import user from './user'
import inventory from './inventory'
import assets from './assets'
import labor from './labor'
import locations from './locations'
import failureCodes from './failureCodes'
import materials from './materials'
import localWorkOrders from './localWorkOrders'
import storage from 'redux-persist/lib/storage'


const appReducer = combineReducers({
    auth,
    workOrders,
    user,
    inventory,
    assets,
    labor,
    locations,
    failureCodes,
    materials,
    localWorkOrders,
})

const rootReducer = (state, action) => {    
    if(action.type == 'USER_LOGOUT') {
        storage.removeItem('persist:root')
        state = undefined
    }
    return appReducer(state, action)
}

export default rootReducer