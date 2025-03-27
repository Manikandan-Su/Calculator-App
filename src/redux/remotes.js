import allEvents from './EventsData/allEvents.json'; // Adjust path as needed
export default function fetchCalendersEventRemote() {
    return Promise.resolve(allEvents);
}