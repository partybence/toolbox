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
			let [arg, key, modifier] = param.split(':');
			[key, modifier] = key.split('|');
			const value = this.t(key.trim());
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
			
			const testValidity = arg.endsWith('?');
			if (testValidity) arg = arg.slice(0, -1);
			
			if (!testValidity || (value && value != '{{'+key+'}}')) {
				switch (arg.trim()) {
					case 'text':
						elm.textContent = value;
						break;
					case 'html':
						elm.innerHTML = value;
						break;
					default:
						elm.setAttribute(arg, value);
						break;
				}
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
