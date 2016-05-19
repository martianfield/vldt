'use strict'

const expect = require('chai').expect
const validate = require(__dirname + '/../../src/validators/number')

describe("E-Mail Validator", () => {
  it('required', () => {
    // arrange
    let field = {isRequired: true}
    // act
    let results = [
      validate(null, field),
      validate(undefined, field),
      validate('    ', field)
    ]
    // assert
    results.forEach(result => {
      expect(result.isValid).to.equal(false)
      expect(result.errors[0].reason).to.equal('required')
    })
  })

  it('valid format', () => {
    // arrange
    let field = {isRequired: true}
    // act
    let results = [
      validate(13, field),
      validate(13.6, field),
      validate(13,6, field),
      validate('13', field),
      validate('13.6', field)
    ]
    // assert
    results.forEach(result => {
      expect(result.isValid).to.equal(true)
    })
  })

  it('invalid format', () => {
    // arrange
    let field = {isRequired: true}
    // act
    let results = [
      validate('13_2', field),
      validate('bananas', field)
    ]
    // assert
    results.forEach(result => {
      expect(result.isValid).to.equal(false)
      expect(result.errors[0].reason).to.equal('format')
    })
  })

  it('min', () => {
    // arrange
    let field = { min: 10.5 }
    // act / arrange
    let result_invalid = validate(10, field)
    let result_valid = validate(11, field)
    // assert
    expect(result_valid.isValid).to.equal(true)
    expect(result_invalid.isValid).to.equal(false)
    expect(result_invalid.errors[0].reason).to.equal('min')
  })

  it('max', () => {
    // arrange
    let field = { max: 10.5 }
    // act / arrange
    let result_valid = validate(10, field)
    let result_invalid = validate(11, field)
    // assert
    expect(result_valid.isValid).to.equal(true)
    expect(result_invalid.isValid).to.equal(false)
    expect(result_invalid.errors[0].reason).to.equal('max')
  })

  it('min / max', () => {
    // arrange
    let field = { min: 1.5, max:9.5 }
    // act / arrange
    let result_valid = validate(6, field)
    let result_invalid_below = validate(1, field)
    let result_invalid_above = validate(9.6, field)
    // assert
    expect(result_valid.isValid).to.equal(true)
    expect(result_invalid_above.isValid).to.equal(false)
    expect(result_invalid_above.errors[0].reason).to.equal('max')
    expect(result_invalid_below.isValid).to.equal(false)
    expect(result_invalid_below.errors[0].reason).to.equal('min')
  })
})