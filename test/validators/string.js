'use strict'

const expect = require('chai').expect
const validate = require(__dirname + '/../../src/validators/string')

describe("String Validator", () => {
  it('required', () => {
    // arrange
    let field = {isRequired:true}
    let value1 = undefined
    let value2 = "Rory"
    // act
    let result1 = validate(value1, field)
    let result2 = validate(value2, field)
    // assert
    expect(result1.isValid).to.equal(false)
    expect(result1.errors[0].reason).to.equal('required')
    expect(result2.isValid).to.equal(true)
  })
  it('min, not required', () => {
    // arrange
    let field = { isRequired:false, min:4}
    let value1 = undefined
    let value2 = '123'
    // act
    let result1 = validate(value1, field)
    let result2 = validate(value2, field)
    // assert
    expect(result1.isValid).to.equal(true)  // the required size is reached, but since it is not required ...
    expect(result2.isValid).to.equal(false) // while not required, this should evaluate to false, since the min length is not given
    expect(result2.errors[0].reason).to.equal('min')

  })
  it('min, required', () => {
    // arrange
    let field = {isRequired:false, min:4}
  })
})