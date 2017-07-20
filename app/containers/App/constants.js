/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const DEFAULT_LOCALE = 'en'

export const SENDING_REQUEST_START = 'app/App/SENDING_REQUEST_START'
export const SENDING_REQUEST_END = 'app/App/SENDING_REQUEST_END'

export const SHOW_NOTIFICATION = 'app/App/SHOW_NOTIFICATION'
export const CLOSE_NOTIFICATION = 'app/App/CLOSE_NOTIFICATION'
