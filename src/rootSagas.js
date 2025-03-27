import { all } from "redux-saga/effects";
import eventWatcherSagas from "./redux/eventSaga";


function* rootSagas(){
    yield all([
        eventWatcherSagas()
    ])
};

export default rootSagas;