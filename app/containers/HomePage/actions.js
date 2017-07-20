import {createRequestActions} from 'utils/actionHelpers'
import {FETCH_ADDRESSES} from './constants'

export const fetchAddressesAction = createRequestActions(FETCH_ADDRESSES)
