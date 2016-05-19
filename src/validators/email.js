'use strict'

function validate(value, field) {
  let result = {
    isValid: true,
    errors: []
  }

  if(value === undefined || value === null) {
    value = ''
  }
  value = String(value).trim()

  // required?
  if(field.isRequired && value === '') {
    result.errors.push({message:'email is required', reason:'required'})
  }
  // format?
  if(result.errors.length === 0) {
    /*
     NOTE:
     The regular expression used here DOES NOT comply to the RFC standards.
     In my opinion, what we got here is good enough though. Mind that actual e-mail
     validation is about people submitting an e-mail address that actually works
     and that they have access to ... not about format.
     */
    let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!re.test(value)) {
      result.errors.push({message:'invalid email format', reason:'format'});
    }
  }
  // and return the result
  result.isValid = result.errors.length === 0
  return result
}


module.exports = validate