# Array.prototype.contains()

Checks whether an `Array` contains all elements (and in the same order) of another `Array`.

## Syntax

```
contains(subArray, strict)
```
```
arrayContains(arrayA, subArray, strict)
```

## Parameters

**arrayA**

The `Array` on which the `subArray` is tested if latter's elements are contained in former.

**subArray**

The `Array` the elements of which are to be tested on `arrayA`.

**strict**
(Optional)

Defines whether the elements should match not only by value, but also by type.  
This is true by default.

## Returns

Returns `true` if `subArray`'s elements are found in order in `arrayA`, otherwise `false`.

## Examples

```js
ArrayContains(['a', 'b', 'c', 'd', 'e'], ['b', 'c', 'd']) // true
```
```js
ArrayContains(['a', 'b', 'c', 'd', 'e'], ['b', 'd', 'c']) // false (not in order)
```
```js
ArrayContains(['1', '2', '3', '4', '5'], [2, 3, 4]) // false (types do not match, strict is not overriden)
```
```js
ArrayContains(['1', '2', '3', '4', '5'], [2, 3, 4], false) // true (loose type checking)
```
Using the prototype extension
```js
['1', '2', '3', '4', '5'].contains([2, 3, 4]) // false
```
```js
['1', '2', '3', '4', '5'].contains([2, 3, 4], false) // true
```
