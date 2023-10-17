import { combineReducers, legacy_createStore } from "redux";


const rootReducer = combineReducers({

});

export const store = legacy_createStore(
	rootReducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
