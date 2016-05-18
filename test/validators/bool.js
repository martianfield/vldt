'use strict'

const expect = require('chai').expect
const validate = require(__dirname + '/../../src/validators/bool')

describe("Bool Validator", () => {
  it('required', () => {
    // arrange
    let field = {isRequired:true}
    // act
    let result_undefined = validate(undefined, field)
    let result_null = validate(null, field)
    let result_bool = validate(true, field)
    let result_truthy_a = validate('rory', field)
    // assert
    expect(result_undefined.isValid).to.equal(false)
    expect(result_undefined.errors[0].reason).to.equal('required')
    expect(result_null.isValid).to.equal(false)
    expect(result_null.errors[0].reason).to.equal('required')
    expect(result_bool.isValid).to.equal(true)
    expect(result_truthy_a.isValid).to.equal(true)

  })
})