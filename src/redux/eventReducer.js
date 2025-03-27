import { createReducer } from "@reduxjs/toolkit";
import { fetchCalenderEvent, fetchCalenderEventError, fetchCalenderEventSuccess } from "./actions";


let initialState = {
    loading: true,
    error: false,
    events: []
}


const eventReducer = createReducer(initialState, (builder) => {
    builder
    .addCase(fetchCalenderEvent, (state, action) => {
        state.loading = true;
        state.error = false;
    })
    .addCase(fetchCalenderEventSuccess, (state, action) => {
        console.log('EEEEE', action)
        state.loading = false;
        state.error = false;
        state.events = action.payload;
    })
    .addCase(fetchCalenderEventError, (state, action) => {
        state.events = [];
        state.error = action.payload;
        state.loading = false;
    })
});

export default eventReducer;