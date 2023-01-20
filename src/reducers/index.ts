import { combineReducers } from 'redux'
import { tournamentsReducer } from './tournaments/tournaments'

export const rootReducer = combineReducers({
  tournaments: tournamentsReducer,
})
