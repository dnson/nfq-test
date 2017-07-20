import {AddressPresenter} from 'containers/HomePage/presenter'
import BasePresenter from 'utils/presenter'

export class GeoCodePresenter extends BasePresenter {
  present() {
    const {lat, lng} = this.model.results[0].geometry.location
    return {lat, lng}
  }
}

export const addressPresent = address => new AddressPresenter(address).present()

export const geoCodePresent = geoData => new GeoCodePresenter(geoData).present()
