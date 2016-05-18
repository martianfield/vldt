'use strict'

function validate(value, field) {
  return {
    isValid: false,
    errors: [{
      message:`unknown type '${field.type}'`,
      reason:'unknown type'
    }]
  }
}

module.exports = validate
