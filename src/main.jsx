import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import Scheduler from "./container/Scheduler.jsx"
import { Provider } from 'react-redux';
import store from './store.js';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <StrictMode>
      <Scheduler />
    </StrictMode>
  </Provider>,
)
