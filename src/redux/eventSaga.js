import { call, put, takeLatest } from "redux-saga/effects";
import { fetchCalenderEvent, fetchCalenderEventError, fetchCalenderEventSuccess } from "./actions";
import { FECTH_CALENDER_EVENT, FECTH_CALENDER_EVENT_ERROR } from "./constants";
import fetchCalendersEventRemote from "./remotes";


function* fetchCalenderEventSagas(payload){
    try {
        const eventsResult = yield call(fetchCalendersEventRemote);
        console.log('eventsResult', eventsResult);
        if(eventsResult){
            yield put(fetchCalenderEventSuccess(eventsResult));
        }
    } catch (error) {
        yield put(fetchCalenderEventError('Failed to get calender Events'))
    }
}



export default function* eventWatcherSagas(){
    yield takeLatest(fetchCalenderEvent.type, fetchCalenderEventSagas);
}