import { combineReducers } from 'redux'
import userReducer from './user'
import postReducer from './post'
import myPostReducer from './mypost'

const rootReducer = combineReducers({
    userReducer,
    postReducer,
    myPostReducer
})

export default rootReducer