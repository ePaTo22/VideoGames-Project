import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducer";
import thunk from "redux-thunk";
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk))); //thunk para hacer acciones con promesas
export default store;
