import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import RootReducer from "./RootReducer";
import thunk from 'redux-thunk';
const store = createStore(RootReducer,applyMiddleware(thunk));
export default store;

