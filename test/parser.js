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
  
  describe('Field', () => {
    it('Prefix', () => {
      // arrange / act
      let p_require = parser.getPrefix('*string')
      let p_hidden = parser.getPrefix('-string')
      let p_unique = parser.getPrefix('!string')
      let p_mixed_urh = parser.getPrefix('!*-string')
      // assert
      expect(p_require.size).to.equal(1)
      expect(p_require.has('*')).to.equal(true)
      expect(p_hidden.size).to.equal(1)
      expect(p_hidden.has('-')).to.equal(true)
      expect(p_unique.size).to.equal(1)
      expect(p_unique.has('!')).to.equal(true)
      expect(p_mixed_urh.size).to.equal(3)
      expect(p_mixed_urh.has('*')).to.equal(true)
      expect(p_mixed_urh.has('-')).to.equal(true)
      expect(p_mixed_urh.has('!')).to.equal(true)
    })
    
    it('Type / Namespace', () => {
      // arrange
      let d_string = '*string'
      let d_int = '-!int>0'
      let d_bool = '*!-mynamespace.bool'
      // act
      let f_string = parser.parseFieldDefinition(d_string)
      let f_int = parser.parseFieldDefinition(d_int)
      let f_bool = parser.parseFieldDefinition(d_bool)
      // assert
      expect(f_string.type).to.equal('string')
      expect(f_string.namespace).to.equal(undefined)
      expect(f_int.type).to.equal('int')
      expect(f_int.namespace).to.equal(undefined)
      expect(f_bool.type).to.equal('bool')
      expect(f_bool.namespace).to.equal('mynamespace')
    })
    
    it('Min / Max', () => {
      // arrange
      let d_none = 'int'
      let d_min = 'int>1'
      let d_max = 'int<10'
      let d_both_a = 'int>1<10'
      let d_both_b = 'int<10>1'
      // act
      let f_none = parser.parseFieldDefinition(d_none)
      let f_min = parser.parseFieldDefinition(d_min)
      let f_max = parser.parseFieldDefinition(d_max)
      let f_both_a = parser.parseFieldDefinition(d_both_a)
      let f_both_b = parser.parseFieldDefinition(d_both_b)
      // arrange
      expect(f_none.max).to.equal(undefined)
      expect(f_none.min).to.equal(undefined)
      expect(f_min.max).to.equal(undefined)
      expect(f_min.min).to.equal(1)
      expect(f_max.max).to.equal(10)
      expect(f_max.min).to.equal(undefined)
      expect(f_both_a.max).to.equal(10)
      expect(f_both_a.min).to.equal(1)
      expect(f_both_b.max).to.equal(10)
      expect(f_both_b.min).to.equal(1)
    })

    it('array', () => {
      let f_regular = parser.parseFieldDefinition('string')
      let f_array = parser.parseFieldDefinition('string[]')
      let f_array_max = parser.parseFieldDefinition('string[]<10')

      // assert
      expect(f_regular.isArray).to.equal(false)
      expect(f_array.isArray).to.equal(true)
      expect(f_array_max.isArray).to.equal(true)
      expect(f_array_max.max).to.equal(10)

    })
  })
})