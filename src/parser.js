'use strict'

function parse(definition) {
  let result = {}
  // did we get a string or object?
  if(typeof definition === 'string') {
    result.type = 'field'
  }
  else if (typeof definition === 'object' ) {
    result.type = 'group'
  }
  else {
    result.type = 'unknown'
  }

  return result
}

module.exports.parse = parse