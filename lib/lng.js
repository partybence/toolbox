class lng {
	static #dict = {};
	static init(dictionary) {
		this.#dict = (typeof dictionary == 'string') ? JSON.parse(dictionary) : dictionary;
	}
	
	static t(key) {
		if (typeof key != 'string') return;
		let subkey = this.#dict;
		key.split('.').forEach(k=>{ subkey = subkey[k]; });
		return (typeof subkey != 'string') ? '{{'+key+'}}' : subkey;
	}
	
	static translate(dom) {
		if (! dom instanceof HTMLElement) return;
		dom.querySelectorAll('[data-lng]').forEach(elm=>{
			elm.dataset.lng.split(';').forEach(param=>{
				let [key, value, modifier] = param.split(':');
				[value, modifier] = value.split('|');
				value = this.t(value.trim());
				if (modifier) {
					switch(modifier.trim().toLowerCase()) {
						case 'u':
						case 'upper':
							value = value.toUpperCase();
							break;
						case 'l':
						case 'lower':
							value = value.toLowerCase();
							break;
					}
				}
				switch (key.trim()) {
					case 'text':
						elm.textContent = value;
						break;
					case 'html':
						elm.innerHTML = value;
						break;
					default:
						elm.setAttribute(key, value);
						break;
				}
			});
		});
	}
}