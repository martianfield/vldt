'use strict'

function validate(value, field) {
  let result = {
    isValid: true,
    errors: []
  }

  value = value === undefined || value === null ? '' : value

  if(field.isRequired && (String(value)).trim() === '') {
    result.errors.push({message:"value is undefined or empty", reason:"required"});
  }
  else {
    if(isNaN(Number(value))) {
      result.errors.push({message:'value is not numeric', reason:'type'})
    }
    else {
      if(Number(value) % 1 !== 0) {
        result.errors.push({message:'not an integer', reason:'type'})
      }
      if(field.min) {
        if(Number(value) < field.min) {
          result.errors.push({message:'value is too small', reason:'min'})
        }
      }
      if(field.max) {
        if(Number(value) > field.max) {
          result.errors.push({message:'value is too large', reason:'max'})
        }
      }
    }
  }

  // and return the result
  result.isValid = result.errors.length === 0
  return result
}

module.exports = validate