import {createRequestActions, createAction} from 'utils/actionHelpers'
import {FETCH_ADDRESS, UPDATE_ADDRESS, FILL_IN_ADDRESS_BY_GM, GET_GEOCODE} from './constants'

export const fetchAddressAction = createRequestActions(FETCH_ADDRESS)

export const updateAddressAction = createRequestActions(UPDATE_ADDRESS)

export const getGeoCodeAction = createRequestActions(GET_GEOCODE)

export const fillInAddressByGMAction = payload =>
  createAction(FILL_IN_ADDRESS_BY_GM, payload)
