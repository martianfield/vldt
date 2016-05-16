'use strict'

const parser = require(__dirname + '/parser')

class Validator {
  constructor(definition) {
    let parsed = parser.parse(definition)
    this.fields = parsed.fields
    this.type = parsed.type
  }

  validate(obj) {

  }
  
  project(target) {
    
  }
}

module.exports = Validator