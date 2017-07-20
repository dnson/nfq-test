import {takeLatest, fork, take, cancel} from 'redux-saga/effects'
import sendRequest from 'utils/sendRequest'
import {LOCATION_CHANGE} from 'react-router-redux'
import {fetchAddresses} from './api'
import {FETCH_ADDRESSES} from './constants'
import {fetchAddressesAction} from './actions'
import present from './presenter'
const sendRequestGetAddress = sendRequest.bind(
  null,
  fetchAddressesAction,
  fetchAddresses,
  present,
)

function* requestGetAddress() {
  yield fork(sendRequestGetAddress, null)
}

function* watchGetAddress() {
  const watcher = yield takeLatest(FETCH_ADDRESSES.INITIATED, requestGetAddress)
  yield take(LOCATION_CHANGE)
  yield cancel(watcher)
}

export default [watchGetAddress]
