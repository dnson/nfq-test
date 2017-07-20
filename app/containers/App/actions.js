import {createAction} from 'utils/actionHelpers'
import {
  SENDING_REQUEST_START,
  SENDING_REQUEST_END,
  SHOW_NOTIFICATION
} from './constants'

export const startPageTransition = () => createAction(SENDING_REQUEST_START)

export const endPageTransition = () => createAction(SENDING_REQUEST_END)

export const showNotificationAction = payload =>
  createAction(SHOW_NOTIFICATION, payload)
