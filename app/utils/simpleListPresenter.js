class SimpleListPresenter {
  constructor(models, eachPresenter) {
    this.models = models
    this.Presenter = eachPresenter
  }

  present() {
    const {models, Presenter} = this
    const data = Object.keys(models).map(id => {
      const model = new Presenter(models[id]).present()
      return {
        id,
        key: id,
        ...model
      }
    })
    return {
      count: models.length,
      data
    }
  }
}

export default SimpleListPresenter
