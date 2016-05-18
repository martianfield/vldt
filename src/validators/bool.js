'use strict'

function validate(value, field) {
  let result = {
    isValid: true,
    errors: []
  }

  if(field.isRequired && (value === undefined || value === null)) {
    result.errors.push({message:"bool is undefined or empty", reason:"required"});
  }
  else {
    try {
      Boolean(value);
    }
    catch(err) {
      result.errors.push({message:err.message, reason:"type"});
    }
  }

  // and return the result
  result.isValid = result.errors.length === 0
  return result
}

module.exports = validate