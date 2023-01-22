import { composeWithDevTools } from '@redux-devtools/extension'
import { createStore, applyMiddleware } from 'redux'

import thunk from 'redux-thunk'
import { rootReducer } from '../reducers'

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

/* Types */
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppStore = typeof store
