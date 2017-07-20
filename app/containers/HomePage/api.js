import {Api} from 'utils/api'
const urlGetAddress = '/users.json';

export const getAddress = (config) => Api.get({
  ...config,
  url: `${urlGetAddress}`,
})
