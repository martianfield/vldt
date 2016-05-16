'use strict'

const expect = require('chai').expect
const Validator = require(__dirname + '/../src/validator')

describe('Validator', () => {

  it('single vs group', () => {
    // arrange
    let v_single = new Validator('*string')
    let v_group = new Validator({
      'name': '*string',
      'age': 'int>0'
    })
    // assert
    expect(v_single.type).to.equal('single')
    expect(v_single.fields.length).to.equal(1)
    expect(v_group.type).to.equal('group')
    expect(v_group.fields.length).to.equal(2)
  })
})
