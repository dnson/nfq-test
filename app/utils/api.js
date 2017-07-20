import {request} from 'utils/request'

const createRequest = config =>
  request(config.url, {
    method: config.method,
    thirdParty: config.thirdParty,
    body: config.method === 'GET' ? undefined : JSON.stringify(config.payload),
    headers: new Headers({}),
  })

export class Api {
  static post(config) {
    return createRequest({
      ...config,
      method: 'POST',
    })
  }
  static get(config) {
    return createRequest({
      ...config,
      method: 'GET',
    })
  }
  static put(config) {
    return createRequest({
      ...config,
      method: 'PUT',
    })
  }
  static patch(config) {
    return createRequest({
      ...config,
      method: 'PATCH',
    })
  }
}
