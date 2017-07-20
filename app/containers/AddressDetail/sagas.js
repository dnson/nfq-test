import {takeLatest, fork, take, cancel} from 'redux-saga/effects'
import sendRequest from 'utils/sendRequest'
import {LOCATION_CHANGE} from 'react-router-redux'
import {fetchAddress, updateAddress, getGeoCode} from './api'
import {FETCH_ADDRESS, UPDATE_ADDRESS, GET_GEOCODE} from './constants'
import {
  fetchAddressAction,
  updateAddressAction,
  getGeoCodeAction,
} from './actions'
import {geoCodePresent, addressPresent} from './presenter'
const sendRequestFetchAddress = sendRequest.bind(
  null,
  fetchAddressAction,
  fetchAddress,
  addressPresent,
)

function* requestGetAddress({payload}) {
  yield fork(sendRequestFetchAddress, payload)
}

const sendRequestUpdateAddress = sendRequest.bind(
  null,
  updateAddressAction,
  updateAddress,
  addressPresent,
)

function* requestUpdateAddress({payload}) {
  yield fork(sendRequestUpdateAddress, payload)
}

const sendRequestGeoCode = sendRequest.bind(
  null,
  getGeoCodeAction,
  getGeoCode,
  geoCodePresent,
)

function* requestGetGeoCode({payload}) {
  yield fork(sendRequestGeoCode, payload)
}

function* watchFetchAddress() {
  const watcher = yield takeLatest(FETCH_ADDRESS.INITIATED, requestGetAddress)
  yield take(LOCATION_CHANGE)
  yield cancel(watcher)
}

function* watchUpdateAddress() {
  const watcher = yield takeLatest(
    UPDATE_ADDRESS.INITIATED,
    requestUpdateAddress,
  )
  yield take(LOCATION_CHANGE)
  yield cancel(watcher)
}

function* watchGetGeoCode() {
  const watcher = yield takeLatest(GET_GEOCODE.INITIATED, requestGetGeoCode)
  yield take(LOCATION_CHANGE)
  yield cancel(watcher)
}

export default [watchFetchAddress, watchUpdateAddress, watchGetGeoCode]
