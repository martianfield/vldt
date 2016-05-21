'use strict'

const expect = require('chai').expect
const Field = require(__dirname + '/../../src/field')

describe('Array Validator', () => {
  it('Required', () => {
    // arrange
    let field = Field.create("*int[]")

    // act
    let result_undefined = field.validate(undefined, field)
    let result_null = field.validate(null, field)
    let result_array = field.validate([], field)

    // assert
    expect(result_undefined.isValid).to.equal(false)
    expect(result_undefined.errors[0].reason).to.equal('required')
    expect(result_null.isValid).to.equal(false)
    expect(result_null.errors[0].reason).to.equal('required')
    expect(result_array.isValid).to.equal(true)
  })


  it('Not An Array', () => {
    // arrange
    let field = Field.create("*int[]")
    // act
    let result = field.validate('not an array', field)
    // assert
    expect(result.isValid).to.equal(false)
    expect(result.errors[0].reason).to.equal('type')
  })

  it('Items not correct type', () => {
    // arrange
    let field = Field.create("*int[]")
    // act
    let result_valid = field.validate([1, 2, 3, 4, 5], field)
    let result_invalid = field.validate([1, "hallo", 2], field)
    // assert
    expect(result_valid.isValid).to.equal(true)
    expect(result_invalid.isValid).to.equal(false)
    expect(result_invalid.errors[0].reason).to.equal('type')
  })

  it('All good', () => {
    // arrange
    let field = Field.create("int[]")
    // act
    let result = field.validate([1, 2, 3])
    // assert
    expect(result.isValid).to.equal(true)
  })

})