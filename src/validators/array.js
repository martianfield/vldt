'use strict'

function validate(value, field) {
  let result = {
    isValid: true,
    errors: []
  }

  if(field.isRequired && (value === undefined || value === null)) {
    result.errors.push({message:"value is undefined or empty", reason:"required"});
  }
  else {
    if(value.constructor === Array) {
      value.forEach(function(item) {
        let subresult = field.typeValidate(item)
        if(!subresult.isValid) {
          subresult.errors.forEach(function(error, idx) {
            result.errors.push({message:`error in array at [${idx}]: ${error.message}`, reason:error.reason})
          })
        }
      })
    }
    else {
      // field is not an array
      result.errors.push({message:"field is not an array", reason:"type"})
    }
  }

  // and return the result
  result.isValid = result.errors.length === 0
  return result
}

module.exports = validate

/*
const create = (fieldInfo) => {
  let validator = (value) => {
    let errors = [];

    if(fieldInfo.required && (_.isUndefined(value) || _.isNull(value))) {
      errors.push({message:"array is undefined or empty", reason:"required"});
    }
    else {
      if(value.constructor === Array) {
        // check all fields
        let validate = fieldInfo.validateType
        value.forEach((item) => {
          let result = validate(item, fieldInfo)
          if(!result.valid) {
            result.errors.forEach((error, idx) => {
              errors.push({message:`error in array at [${idx}]: ${error.message}`, reason:error.reason})
            })
          }
        })
      }
      else {
        // field is not an array
        errors.push({message:"field is not an array", reason:"type"})
      }
    }

    // and return the result
    return {
      valid: errors.length === 0,
      errors: errors
    }
  }

  return validator
}

module.exports.create = create
*/