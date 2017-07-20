import {createRequestTypes} from 'utils/actionHelpers'

export const FETCH_ADDRESS = createRequestTypes('app/addressDetail/FETCH_ADDRESS')

export const UPDATE_ADDRESS = createRequestTypes('app/addressDetail/UPDATE_ADDRESS')

export const GET_GEOCODE = createRequestTypes('app/addressDetail/GET_GEOCODE')

export const FILL_IN_ADDRESS_BY_GM = 'app/addressDetail/FILL_IN_ADDRESS_BY_GM'
