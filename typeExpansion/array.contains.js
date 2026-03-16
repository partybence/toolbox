function ArrayContains(a, b, strict=true) {
	function isIterable(object){
		return object != null && typeof object[Symbol.iterator] === 'function';
	}
	if (!isIterable(a) || !isIterable(b)) throw new TypeError('Argument a and b must be iterable');
	if (b.length===0) return true;
	if (b.length > a.length) return false;
	for (let i = 0; i <= a.length - b.length; i++) {
		let matches = true;
		for (let j = 0; j < b.length; j++) {
			if (strict && a[i+j] !== b[j] || a[i+j] != b[j]) {
				matches = false;
				break;
			}
		}
		if (matches) return true;
	}
	return false;
}
{
	const A = ArrayContains;
	Int8Array.prototype.contains = function(array, strict) { return A(this, array, strict) };
	Uint8Array.prototype.contains = function(array, strict) { return A(this, array, strict) };
	Uint8ClampedArray.prototype.contains = function(array, strict) { return A(this, array, strict) };
	Int16Array.prototype.contains = function(array, strict) { return A(this, array, strict) };
	Uint16Array.prototype.contains = function(array, strict) { return A(this, array, strict) };
	Int32Array.prototype.contains = function(array, strict) { return A(this, array, strict) };
	Uint32Array.prototype.contains = function(array, strict) { return A(this, array, strict) };
	Float16Array.prototype.contains = function(array, strict) { return A(this, array, strict) };
	Float32Array.prototype.contains = function(array, strict) { return A(this, array, strict) };
	Float64Array.prototype.contains = function(array, strict) { return A(this, array, strict) };
	BigInt64Array.prototype.contains = function(array, strict) { return A(this, array, strict) };
	BigUint64Array.prototype.contains = function(array, strict) { return A(this, array, strict) };
	Array.prototype.contains = function(array, strict) { return A(this, array, strict) };
}