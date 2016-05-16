'use strict'

const expect = require('chai').expect
const parser = require(__dirname + '/../src/parser')

describe('parser', () => {
  it('recognize definition', () => {
    // arrange
    let def_string = 'int>0'
    let def_object = {
      name: 'string',
      age: 'int>0'
    }
    let def_undefined = 1
    // act
    let result_string = parser.parse(def_string)
    let result_object = parser.parse(def_object)
    let result_undefined = parser.parse(def_undefined)
    // assert
    expect(result_string.type).to.equal('field')
    expect(result_object.type).to.equal('group')
    expect(result_undefined.type).to.equal('unknown')

  })
})