'use strict'

function validate(value, field) {
  let result = {
    isValid: true,
    errors: []
  }
  // make sure we have an actual text to work with and that we ignore trailing whitespace
  if(value === undefined || value === null) {
    // if the field is not required, having a value of undefined or null is acceptable
    if(field.isRequired === false) {
      return result
    }
    value = '';
  }
  value = value.trim()

  // collect errors
  if(field.isRequired && value === '') {
    result.errors.push({message:"string is undefined or empty", reason:"required"});
  }
  if(field.max) {
    if(value.length >= field.max) {
      result.errors.push({message:"string is too long", reason:"max"})
    }
  }
  if(field.min) {
    if(value.length <= field.min) {
      result.errors.push({message:"string is too short", reason:"min"});
    }
  }

  // and return the result
  result.isValid = result.errors.length === 0
  return result
}

module.exports = validate
