import {takeLatest, fork, take, cancel} from 'redux-saga/effects'
import sendRequest from 'utils/sendRequest'
import {LOCATION_CHANGE} from 'react-router-redux'
import {fetchAddresses, updateAddresses} from './api'
import {FETCH_ADDRESSES, UPDATE_ADDRESSES} from './constants'
import {fetchAddressesAction, updateAddressesAction} from './actions'
import present from './presenter'
const sendRequestGetAddresses = sendRequest.bind(
  null,
  fetchAddressesAction,
  fetchAddresses,
  present,
)

function* requestGetAddress() {
  yield fork(sendRequestGetAddresses, null)
}

const sendRequestUpdateAddresses = sendRequest.bind(
  null,
  updateAddressesAction,
  updateAddresses,
  present,
)

function* requestUpdateAddresses({payload}) {
  yield fork(sendRequestUpdateAddresses, payload)
}

function* watchGetAddresses() {
  const watcher = yield takeLatest(FETCH_ADDRESSES.INITIATED, requestGetAddress)
  yield take(LOCATION_CHANGE)
  yield cancel(watcher)
}

function* watchUpdateAddresses() {
  const watcher = yield takeLatest(UPDATE_ADDRESSES.INITIATED, requestUpdateAddresses)
  yield take(LOCATION_CHANGE)
  yield cancel(watcher)
}

export default [watchGetAddresses, watchUpdateAddresses]
