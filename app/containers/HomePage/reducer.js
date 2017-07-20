import {fromJS} from 'immutable'
import {combineReducers} from 'redux-immutable'
import {FETCH_ADDRESS} from './constants'

const initialState = fromJS({})

function addresses(state = initialState, action) {
  switch (action.type) {
    case FETCH_ADDRESS.SUCCESS:
      return fromJS({
        ...action.response
      })
    case FETCH_ADDRESS.FAILURE:
      return fromJS({})
    default:
      return state
  }
}

export default combineReducers({
  addresses
})
