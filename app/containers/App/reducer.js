/*
 *
 * HomePage reducer
 *
 */

import {combineReducers} from 'redux-immutable'
import {fromJS} from 'immutable'
import {
  SENDING_REQUEST_START,
  SENDING_REQUEST_END,
  SHOW_NOTIFICATION,
} from './constants'

function transition(state = fromJS({}), action) {
  switch (action.type) {
    case SENDING_REQUEST_START:
      return fromJS({
        progress: 0,
        rand: Math.random(),
      })
    case SENDING_REQUEST_END:
      return fromJS({
        progress: 100,
        rand: Math.random(),
      })
    default:
      return state
  }
}

function notification(state = fromJS({}), action) {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return fromJS({
        ...action,
        rand: Math.random(),
      })
    default:
      return state
  }
}

export default combineReducers({
  transition,
  notification,
})
