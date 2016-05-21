# vldt

Object validation made easy.

## Defining Fields

To define a field use a string formatted like so:

```
[<prefix>]<type>[<array_indicator>][<min>][<max>]
```

Then use this string to create a field:

```
let field = Field.create(<definition>)
```

For instance:

```
let field = Field.create("*int>10")
```

### Prefixes 

- `*` : required. Required fields need to exist and contain a valid other than `null` or `undefined`.
- `-` : hidden. Hidden fields are not projected (see projection).
- `!` : unique. Unique fields are not checked by VLDT itself. Use the field's `isUnique` property when saving data to a database for instance. 

### Types

- `string`
- `number` - accepts both, integers and floats
- `int` - accepts only integers (i.e. `1.3` would not be accepted)
- `float` - accepts floats (basically the same as `number`. When projected values are forced into float format however)
- `bool` - `true`, `false`, and all truthy values (https://developer.mozilla.org/en-US/docs/Glossary/Truthy)
- `email`

### Array Indicator

If a field is supposed to be an array, use the array indicator `[]`. For instance:

```
'string[]'
```

### Min / Max

To require a minimum / maximum value, use `>` and `<`. For instance:

- `int>1` - the value needs to be greater than `1`. 
- `int<10` - the value needs to be smaller than `10`
- `int>1<10` - the value needs to be greater than `1` and smaller than `10`

Notes: 

- If the type is `string`, the length of the string is checked.
- If the type is `bool`, min and max are ignored
- If the type is `email`, min and max are ignored
- When dealing with an array field, the min and max are used to check the values in the array (not the length of the array. Array length validation will implemented at a later point)

## Validation

After creating a field, use its `validate(<value>)` method:

```
let result = field.validate(8)
```

The validation result is an object with two properties:

- `isValid` - a bool set to `true` if validation was successful, or set to `false` if not
- `errors` - an array containing an object for each validation error. Each of these objects has two properties:
    - `message`: a string containing a descriptive text of the error encountered
    - `reason`: a string expressing in one word the reason for the error. The following values are used:
        - `required`: a value was required but not given
        - `type`: the value was of the wrong type
        - `format`: the value was not formatted correctly (e.g. a wrongly formatted e-mail address)

## Roadmap

- Array length validation
- Embedded validation





