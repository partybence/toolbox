# String.prototype.explode()

Similar to the split function of the String prototype, except that this function doesn't omit the part after the specified limit, only leaves it unsplit.

## Syntax

```
explode(separator, limit)
```

## Parameters

`separator`

The pattern describing where each split should occur.  
For more details, refer to the String.prototype.split() manual.

`limit` (optional)

Specifies the number of parts the given string to be split into. When the given `limit` is reached, the remaining string is returned as-is at the end of the array.  
If is or less than 0 (default), that's treated as no limit, the string will be split at all occurrences of `separator`.

## Returns

An `Array` of the split parts of the given string.

## Examples:
```js
"1,2,3,4".explode(",") // ["1", "2", "3", "4"]
```
```js
"1,2,3,4".explode(",", 3) // ["1", "2", "3,4"]
```
```js
"1,2,3,4".explode(",", 1) // ["1,2,3,4"]
```
