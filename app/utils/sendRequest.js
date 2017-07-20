import {put, call} from 'redux-saga/effects'
import {
  startPageTransition,
  endPageTransition,
  showNotificationAction,
} from 'containers/App/actions'

export default function* sendRequest(entityActions, apiFn, present, payload) {
  const config = {
    payload,
  }

  yield put(startPageTransition())
  yield put(entityActions.request({payload}))
  const {response, error} = yield call(apiFn, config)
  if (response) {
    yield put(entityActions.success({response: present(response), payload}))
  }
  else {
    yield put(entityActions.failure({error, payload}))
    yield put(
      showNotificationAction({
        message: 'Error',
        description: error,
      }),
    )
  }
  yield put(endPageTransition())
}
