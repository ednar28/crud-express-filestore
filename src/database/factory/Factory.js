class Factory {
  constructor (model) {
    this.model = model
    this.stateData = null
    this.sequanceData = null
  }

  definition () {
    return {}
  }

  count (total = 1) {
    this.total = total
  }

  sequance (data = []) {
    this.sequanceData = data
  }

  state (data = {}) {
    this.stateData = data
  }

  make (data = {}) {
    return { ...this.definition(), ...data }
  }

  async create (data = {}) {
    if (this.total > 1) {
      let allDataFake = []
      let startSequance = 0

      for (let i = 0; this.total > i; i++) {
        let fake = this.definition()
        if (this.sequanceData) {
          fake = { ...fake, ...this.sequanceData[i > startSequance ? i : startSequance = 0] }
        }
        if (this.stateData) {
          fake = { ...fake, ...this.stateData }
        }

        allDataFake.push({ ...fake, ...data })
      }

      const ids = await this.model.createMany(allDataFake)
      return this.model.finds(ids)
    }

    const model = await this.model.create(this.definition())
    return this.model.find(model.id)
  }
}

export default Factory