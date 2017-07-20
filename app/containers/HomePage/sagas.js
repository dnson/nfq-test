import {takeLatest, fork, take, cancel} from 'redux-saga/effects'
import sendRequest from 'utils/sendRequest'
import {LOCATION_CHANGE} from 'react-router-redux'
import {getAddress} from './api'
import {FETCH_ADDRESS} from './constants'
import {fetchAddressAction} from './actions'
import addressesPresenter from './addressesPresenter'
const sendRequestGetAddress = sendRequest.bind(null, fetchAddressAction, getAddress, addressesPresenter);

function* requestGetAddress() {
  yield fork(sendRequestGetAddress, null)
}

function* watchGetAddress() {
  const watcher = yield takeLatest(
    FETCH_ADDRESS.INITIATED,
    requestGetAddress
  )
  yield take(LOCATION_CHANGE)
  yield cancel(watcher)
}

export default [watchGetAddress]
