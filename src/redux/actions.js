import { createAction } from "@reduxjs/toolkit";
import { FECTH_CALENDER_EVENT, FECTH_CALENDER_EVENT_SUCCESS, FECTH_CALENDER_EVENT_ERROR } from "./constants";

const fetchCalenderEvent = createAction(FECTH_CALENDER_EVENT);
const fetchCalenderEventSuccess = createAction(FECTH_CALENDER_EVENT_SUCCESS);
const fetchCalenderEventError = createAction(FECTH_CALENDER_EVENT_ERROR);


export {
    fetchCalenderEvent,
    fetchCalenderEventSuccess,
    fetchCalenderEventError
}