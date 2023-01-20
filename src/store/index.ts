// import { createStore, applyMiddleware } from 'redux'
// import thunk from 'redux-thunk'
// import { rootReducer } from '../reducers'

// export const store = createStore(rootReducer, applyMiddleware(thunk))

// export default store;

// try to configureStore from redux toolkit

// configure the store
// import { configureStore } from '@reduxjs/toolkit'
// import { tournamentReducer } from '../features/tournaments/tournaments'

// export const store = configureStore({
//   reducer: {
//     tournament: tournamentReducer,
//   },
// })

// export type AppDispatch = typeof store.dispatch
// export type RootState = ReturnType<typeof store.getState>

/* Core */
import { composeWithDevTools } from '@redux-devtools/extension'
import { createStore, applyMiddleware } from 'redux'

/* Instruments */
import thunk from 'redux-thunk'
import { rootReducer } from '../reducers'

/* Store */
export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

/* Types */
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppStore = typeof store
