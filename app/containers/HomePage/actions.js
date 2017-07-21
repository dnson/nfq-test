import {createRequestActions} from 'utils/actionHelpers'
import {FETCH_ADDRESSES, UPDATE_ADDRESSES} from './constants'

export const fetchAddressesAction = createRequestActions(FETCH_ADDRESSES)

export const updateAddressesAction = createRequestActions(UPDATE_ADDRESSES)
