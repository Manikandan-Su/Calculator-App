import { combineReducers, configureStore } from "@reduxjs/toolkit";
import eventReducer from "./redux/eventReducer";
import createSagaMiddleware from "redux-saga";
import rootSagas from "./rootSagas";

const sagaMiddleWare = createSagaMiddleware();

const reducers = combineReducers({
    eventsReducer: eventReducer
});

const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleWare)
});

sagaMiddleWare.run(rootSagas);


export default store;