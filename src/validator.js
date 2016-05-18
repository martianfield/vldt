'use strict'

const Field = require(__dirname + '/field')

class Validator {
  constructor(definition) {
    let parsed = parse(definition)
    this.fields = parsed.fields
  }

  validate(obj) {

  }
  
  project(target) {
    
  }
}

function parse(definition) {
  let result = {}
  // did we get a string or object?
  if(typeof definition === 'string') {
    let field = Field.create(definition)
    result.fields = [field]
  }
  else if (typeof definition === 'object' ) {
    result.fields = []
    for(let item in definition) {
      if(definition.hasOwnProperty(item)) {
        let field = Field.create(definition[item])
        field.name = item
        result.fields.push(field)
      }
    }
  }

  return result
}


module.exports = Validator