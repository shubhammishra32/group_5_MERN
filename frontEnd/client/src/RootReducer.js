import { combineReducers } from "redux";
import UserReducer from "./Redux/UserReducer";

const RootReducer = combineReducers({
    UserReducer : UserReducer
})

export default RootReducer