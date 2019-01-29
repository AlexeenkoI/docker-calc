import { combineReducers } from 'redux'
import { calcReducer } from './calcReducer'
import { historyReducer } from './historyReducer'

export const rootReducer = combineReducers({
  calcData : calcReducer,
  history : historyReducer
})