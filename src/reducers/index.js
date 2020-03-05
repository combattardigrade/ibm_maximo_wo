import { combineReducers } from 'redux'
import auth from './auth'
import workOrders from './workOrders'
import user from './user'

export default combineReducers({
    auth,
    workOrders,
    user
})