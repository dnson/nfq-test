import BasePresenter from 'utils/presenter'
import SimpleListPresenter from 'utils/simpleListPresenter'

class AddressPresenter extends BasePresenter {
  present() {
    const {address, age} = this.model
    return {address, age}
  }
}

const present = (addresses) => new SimpleListPresenter(addresses, AddressPresenter).present()

export default present
