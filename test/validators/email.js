'use strict'

const expect = require('chai').expect
const validate = require(__dirname + '/../../src/validators/email')

describe("E-Mail Validator", () => {
  it('required', () => {
    // arrange
    let field = {isRequired:true}
    // act
    let result_undefined = validate(undefined, field)
    let result_null = validate(null, field)
    let result_empty = validate('    ', field)
    // assert
    expect(result_undefined.isValid).to.equal(false)
    expect(result_undefined.errors[0].reason).to.equal('required')
    expect(result_null.isValid).to.equal(false)
    expect(result_null.errors[0].reason).to.equal('required')
    expect(result_empty.isValid).to.equal(false)
    expect(result_empty.errors[0].reason).to.equal('required')

  })

  it('valid format', () => {
    // arrange
    let field = { isRequired:true }
    // act / assert
    expect(validate('peter@baskerville.com', field).isValid).to.equal(true)
    expect(validate('peter@baskerville.co.uk', field).isValid).to.equal(true)
    expect(validate('peter.smith@baskerville.com', field).isValid).to.equal(true)
    expect(validate('peter.smith@baskerville.co.uk', field).isValid).to.equal(true)
    expect(validate('rüdiger@münchen.de', field).isValid).to.equal(true)
  })

  it('invalid format', () => {
    // arrange
    let field = { isRequired:true }
    // act
    let results = [
      validate('peter', field),
      validate('peter@baskerville', field),
      validate('peter.bakserville.com', field)
    ]
    // assert
    results.forEach(result => {
      expect(result.isValid).to.equal(false)
      expect(result.errors[0].reason).to.equal('format')
    })
  })
})