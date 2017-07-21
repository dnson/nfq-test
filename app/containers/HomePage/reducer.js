import {fromJS} from 'immutable'
import {combineReducers} from 'redux-immutable'
import {FETCH_ADDRESSES, UPDATE_ADDRESSES} from './constants'

const initialState = fromJS({})

function addresses(state = initialState, action) {
  switch (action.type) {
    case FETCH_ADDRESSES.SUCCESS:
      return fromJS({
        ...action.response,
      })
    case FETCH_ADDRESSES.FAILURE:
      return fromJS({})
    case UPDATE_ADDRESSES.SUCCESS:
      return fromJS({
        ...action.response,
      })
    default:
      return state
  }
}

export default combineReducers({
  addresses,
})
