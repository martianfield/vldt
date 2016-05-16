'use strict'

class Field {
  constructor() {
    this.name = undefined
    this.namespace = undefined
    this.type = undefined
    this.isRequired = false
    this.isUnique = false
    this.isHidden = false
    this.isArray = false
    this.min = undefined
    this.max = undefined
  }
}

module.exports = Field