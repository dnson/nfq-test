import {request} from 'utils/request'

const createRequest = (config) =>
  request(config.url, {
    method: config.method,
    body: config.method === 'GET' ? undefined : JSON.stringify(config.payload),
    headers: new Headers({
      'Content-Type': 'application/json',
      ...config.headers
    })
  })

export class Api {

  static post(config) {
    return createRequest({
      ...config,
      method: 'POST'
    })
  }
  static get(config) {
    return createRequest({
      ...config,
      method: 'GET'
    })
  }
  static put(config) {
    return createRequest({
      ...config,
      method: 'PUT'
    })
  }
}

