# vldt

Object validation made easy

## Definition

### Prefixes 

- `*` : required. Required fields need to exist and contain a valid other than `null` or `undefined`.
- `-` : hidden. Hidden fields are not projected (see projection).
- `!` : unique. Unique fields are not checked by VLDT itself. Use the field's `isUnique` property when saving data to a database for instance. 