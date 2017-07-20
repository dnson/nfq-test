import BasePresenter from 'utils/presenter'
import SimpleListPresenter from 'utils/simpleListPresenter'

export class AddressPresenter extends BasePresenter {
  present() {
    const {streetName, ward, district, city, country} = this.model
    return {streetName, ward, district, city, country}
  }
}

const present = addresses =>
  new SimpleListPresenter(addresses, AddressPresenter).present()

export default present
