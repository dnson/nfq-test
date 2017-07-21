import {Api} from 'utils/api'
const urlGetAddress = '/users.json'

export const fetchAddresses = config =>
  Api.get({
    ...config,
    url: `${urlGetAddress}`,
  })

export const updateAddresses = config =>
  Api.patch({
    ...config,
    url: `${urlGetAddress}`,
  })
