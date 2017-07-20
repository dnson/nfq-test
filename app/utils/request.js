import 'whatwg-fetch'

const API_ROOT = 'https://nfqtest-b4532.firebaseio.com'

export function request(endpoint, options) {
  const fullUrl =
    endpoint.indexOf(API_ROOT) === -1 ? API_ROOT + endpoint : endpoint

  return fetch(fullUrl, {
    ...options,
    mode: 'cors'
  })
    .then(response => {
      const contentType = response.headers.get('content-type')
      if (contentType && contentType.indexOf('application/json') !== -1) {
        return response.json().then(json => ({json, response}))
      }
      return response.text().then(text => ({response, text}))
    })
    .then(({json, response, text}) => {
      if (response.status === 401 || response.status === 403) {
        return Promise.reject(json.message)
      }

      if (!response.ok) {
        if (json) {
          return Promise.reject(json)
        }
        return Promise.reject(text)
      }

      return json
    })
    .then(
      response => ({response}),
      error => ({error: error || {message: 'Something bad happened'}})
    )
}

function parseJSON(response) {
  return response.json()
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }

  const error = new Error(response.statusText)
  error.response = response
  throw error
}

export default function defaultRequest(url, options) {
  return fetch(url, options).then(checkStatus).then(parseJSON)
}
