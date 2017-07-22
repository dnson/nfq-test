import {fromJS} from 'immutable'
import {combineReducers} from 'redux-immutable'
import {PAGE_ADD_LOADED} from 'containers/AddAddress/constants'
import {FETCH_ADDRESS, FILL_IN_ADDRESS_BY_GM, GET_GEOCODE} from './constants'

const initialState = fromJS({})

function address(state = initialState, action) {
  switch (action.type) {
    case FETCH_ADDRESS.SUCCESS:
      return fromJS({
        ...action.response,
      })
    case FETCH_ADDRESS.FAILURE:
      return fromJS({})
    case PAGE_ADD_LOADED:
      return fromJS({})
    case FILL_IN_ADDRESS_BY_GM:
      return fromJS({
        ...action.payload,
      })
    default:
      return state
  }
}

function geoCode(state = initialState, action) {
  switch (action.type) {
    case GET_GEOCODE.SUCCESS:
      return fromJS({
        ...action.response,
      })
    case GET_GEOCODE.FAILURE:
      return fromJS({})
    default:
      return state
  }
}

export default combineReducers({
  address,
  geoCode,
})
