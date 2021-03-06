'use strict'

class Field {
  constructor() {
    this.name = undefined
    this.namespace = undefined
    this.type = undefined
    this.isRequired = false
    this.isUnique = false
    this.isHidden = false
    this.isArray = false
    this.min = undefined
    this.max = undefined
  }

  validate(value) {
    if(this.isArray) {
      let method = require(__dirname + '/validators/array')
      return method(value, this)
    }
    else {
      return this.typeValidate(value, this)
    }
  }

  typeValidate(value) {
    const validatorMethods = {
      'string':require(__dirname + '/validators/string'),
      'bool':require(__dirname + '/validators/bool'),
      'email':require(__dirname + '/validators/email'),
      'number':require(__dirname + '/validators/number'),
      'float':require(__dirname + '/validators/float'),
      'int':require(__dirname + '/validators/int'),
      'unknown':require(__dirname + '/validators/unknown')
    }
    let method = validatorMethods[this.type] ? validatorMethods[this.type] : validatorMethods['unknown']
    let result = method(value, this)
    return result
  }

  static create(definition) {
    return parseFieldDefinition(definition)
  }
}

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


module.exports = Field