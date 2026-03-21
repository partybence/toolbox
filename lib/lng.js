class lng {
	static #instance;
	#dict = {};
	
	constructor(dictionary) {
		this.#dict = (typeof dictionary == 'string') ? JSON.parse(dictionary) : dictionary;
	}
	
	static init(dictionary) {
		this.#instance = new this(dictionary);
	}
	
	static t(key) {
		return this.#instance?.t(key);
	}
	
	static translate(dom, dataset="lng") {
		return this.#instance?.translate(dom, dataset);
	}
	
	t(key) {
		if (typeof key != 'string') return;
		let subkey = this.#dict;
		key.split('.').forEach(k=>{ subkey = subkey[k]; });
		return (!['string', 'boolean', 'number'].includes(typeof subkey)) ? '{{'+key+'}}' : subkey;
	}
	
	#translateOne(elm, dataset) {
		elm.dataset[dataset].split(';').forEach(param=>{
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
		delete elm.dataset[dataset];
	}
	
	translate(dom, dataset="lng") {
		if (! dom instanceof HTMLElement) return;
		if (dom.dataset[dataset]) this.#translateOne(dom, dataset);
		dom.querySelectorAll('[data-'+dataset+']').forEach(elm=>{
			this.#translateOne(elm, dataset);
		});
	}
}