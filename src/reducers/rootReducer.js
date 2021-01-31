import userReducer from './userReducer';
import controlReducer from './controlReducer';
import todoReducer from './todoReducer';
import authReducer from './authReducer';
import addressReducer from './addressReducer';
import productReducer from './productReducer';
import orderReducer from './orderReducer';
import { combineReducers } from 'redux';

//Combine all the sub reducers
const rootReducer = combineReducers({
    user: userReducer,
    control: controlReducer,
    todos: todoReducer,
    auth: authReducer,
    address: addressReducer,
    product: productReducer,
    order: orderReducer
})

export default rootReducer