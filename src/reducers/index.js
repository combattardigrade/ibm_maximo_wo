import { combineReducers } from 'redux'
import auth from './auth'
import workOrders from './workOrders'
import user from './user'
import inventory from './inventory'
import assets from './assets'
import labor from './labor'

export default combineReducers({
    auth,
    workOrders,
    user,
    inventory,
    assets,
    labor
})