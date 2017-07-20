const INITIATED = 'INITIATED'
const REQUEST = 'REQUEST'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'

export const createRequestTypes = base =>
  [INITIATED, REQUEST, SUCCESS, FAILURE].reduce(
    (acc, type) => ({
      ...acc,
      [type]: `${base}_${type}`
    }),
    {}
  )

export const createAction = (type, payload = {}) => ({type, ...payload})

export const createRequestActions = requestTypes => ({
  initiate: ({payload}) => createAction(requestTypes.INITIATED, {payload}),
  request: ({payload}) => createAction(requestTypes.REQUEST, {payload}),
  success: ({response, payload}) =>
    createAction(requestTypes.SUCCESS, {response, payload}),
  failure: ({error, payload}) =>
    createAction(requestTypes.FAILURE, {error, payload})
})
