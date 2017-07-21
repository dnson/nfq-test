import isObject from 'lodash/isObject'
import pickBy from 'lodash/pickBy'

class SimpleListPresenter {
  constructor(models, eachPresenter) {
    this.models = models
    this.Presenter = eachPresenter
  }

  present() {
    const {models, Presenter} = this
    let data = pickBy(models, isObject)
    data = Object.keys(data).map(id => {
      const model = new Presenter(data[id]).present()
      return {
        id,
        key: id,
        ...model,
      }
    })
    return {
      count: models.length,
      data,
      origin: models
    }
  }
}

export default SimpleListPresenter
