'use strict'

const Field = require(__dirname + '/field')

/**
 * 
 * @param definition
 * @returns a Validator object
 */
function parse(definition) {
  let result = {}
  // did we get a string or object?
  if(typeof definition === 'string') {
    let field = parseFieldDefinition(definition)
    result.type = 'single'
    result.fields = [field]
  }
  else if (typeof definition === 'object' ) {
    result.type = 'group'
    result.fields = []
    for(let item in definition) {
      if(definition.hasOwnProperty(item)) {
        let field = parseFieldDefinition(definition[item])
        field.name = item
        result.fields.push(field)
      }
    }
  }
  else {
    result.type = 'unknown'
  }

  return result
}

/**
 * Parses a definition and returns a Field object
 * @param definition
 * @return 
 */
function parseFieldDefinition(definition) {
  let field = new Field()
  let re, matches

  // prepare
  definition = definition.trim()
  let prefix = getPrefix(definition)
  definition = definition.substring(prefix.size) // now that we have the prefix, we can get rid of it in the definition

  // required, hidden, unique
  field.isRequired = prefix.has('*')
  field.isHidden = prefix.has('-')
  field.isUnique = prefix.has('!')

  // type and namespace
  re = /[a-z\.]*/i
  matches = re.exec(definition)
  if(matches !== null) {
    let t_and_s = matches[0].toLowerCase().split('.');
    if(t_and_s.length > 1) {
      field.namespace = t_and_s[0];
      field.type = t_and_s[1];
    }
    else {
      field.type = t_and_s[0];
    }
  }

  // min
  re = />[0-9]*/;
  matches = re.exec(definition);
  if(matches !== null) {
    field.min = Number(matches[0].substring(1))  //field.min = Number(_.trimLeft(matches[0], '>'));
  }

  // max
  re = /<[0-9]*/;
  matches = re.exec(definition);
  if(matches !== null) {
    field.max = Number(matches[0].substring(1)) // field.max = Number(_.trimLeft(matches[0], '<'));
  }

  // array
  re = /^[(\*\-)(a-zA-Z)]*(\[\])/
  matches = re.exec(definition)
  if(matches !== null) {
    field.isArray = true
  }

  // done
  return field
}

function getPrefix(definition) {
  let symbols = new Set(['*','-','!'])
  let prefix = new Set()
  let i = 0
  while(i < definition.length && symbols.has(definition.charAt(i))) {
    prefix.add(definition.charAt(i))
    i += 1
  }
  return prefix
}


// Exports
module.exports.parse = parse

// Exports only used for testing
module.exports.parseFieldDefinition = parseFieldDefinition
module.exports.getPrefix = getPrefix