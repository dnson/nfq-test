import {Api} from 'utils/api'
const urlGetAddress = '/users'
const urlGoogleApi =
  'https://maps.googleapis.com/maps/api/geocode/json?address='
const apiKey = '&key=AIzaSyDmaBurFqY5N0r826O9t_6XnOl8CK38ATQ'

export const fetchAddress = config =>
  Api.get({
    ...config,
    url: `${urlGetAddress}/${config.payload.id}/.json`,
  })

export const updateAddress = config => {
  let url = urlGetAddress
  if (config.payload.id) {
    url = `${urlGetAddress}/${config.payload.id}/`
    return Api.patch({
      ...config,
      url: `${url}.json`,
    })
  }
  return Api.post({
    ...config,
    url: `${url}.json`,
  })
}

export const getGeoCode = config =>
  Api.get({
    ...config,
    thirdParty: true,
    url: `${urlGoogleApi}${config.payload.fullAddress}${apiKey}`,
  })
