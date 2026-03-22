String.prototype.explode = function(separator, limit=0) {
	if (limit==1) return [this.toString()];
	const parts = this.split(separator);
	if (limit < 1) return parts;
	if (parts.length <= limit) return parts;
	return [...parts.slice(0, limit-1), parts.slice(limit-1).join(separator)];
};
