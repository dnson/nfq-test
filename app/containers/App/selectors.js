// makeSelectLocationState expects a plain JS object for the routing state
import {createSelector} from 'reselect'

const makeSelectLocationState = () => {
  let prevRoutingState
  let prevRoutingStateJS

  return state => {
    const routingState = state.get('route') // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState
      prevRoutingStateJS = routingState.toJS()
    }

    return prevRoutingStateJS
  }
}

const makeSelectTransition = () =>
  createSelector(
    state => state.get('global'),
    global => global.get('transition'),
  )

const makeSelectTransitionProgress = () =>
  createSelector(makeSelectTransition(), transition =>
    transition.get('progress'),
  )

const makeSelectNotification = () =>
  createSelector(
    state => state.get('global'),
    global => global.get('notification').toJS(),
  )

export {
  makeSelectLocationState,
  makeSelectTransitionProgress,
  makeSelectNotification,
}
