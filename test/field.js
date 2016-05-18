'use strict'

const expect = require('chai').expect
const Field = require(__dirname + '/../src/field')

describe('Field', () => {
  describe('Parsing', () => {
    /*
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
    */

    it('Type / Namespace', () => {
      // arrange
      let d_string = '*string'
      let d_int = '-!int>0'
      let d_bool = '*!-mynamespace.bool'
      // act
      let f_string = Field.create(d_string)
      let f_int = Field.create(d_int)
      let f_bool = Field.create(d_bool)
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
      let f_none = Field.create(d_none)
      let f_min = Field.create(d_min)
      let f_max = Field.create(d_max)
      let f_both_a = Field.create(d_both_a)
      let f_both_b = Field.create(d_both_b)
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
      let f_regular = Field.create('string')
      let f_array = Field.create('string[]')
      let f_array_max = Field.create('string[]<10')

      // assert
      expect(f_regular.isArray).to.equal(false)
      expect(f_array.isArray).to.equal(true)
      expect(f_array_max.isArray).to.equal(true)
      expect(f_array_max.max).to.equal(10)

    })
  })

  describe('Validation', () => {
    it('validation', () => {
      // arrange
      let f = Field.create("*string>3")
      // act
      let result1 = f.validate(undefined)
      let result2 = f.validate('123')
      let result3 = f.validate('this is long enough')
      // assert
      expect(result1.isValid).to.equal(false)
      expect(result2.isValid).to.equal(false)
      expect(result3.isValid).to.equal(true)
    })
  })

})