class lng {
	#dict = {};
	
	constructor(dictionary) {
		this.#dict = (typeof dictionary == 'string') ? JSON.parse(dictionary) : dictionary;
	}
	
	#findKey(key) {
		let subkey = this.#dict;
		key.split('.').forEach(k=>{ subkey = subkey[k]; });
		return (!['string', 'boolean', 'number'].includes(typeof subkey)) ? null : subkey;
	}
	
	#translateOne(elm, dataset) {
		elm.dataset[dataset].split(';').forEach(param=>{
			const m = param.match(/^([\w\d.-]+)([?+&]?):(?:`([^`]*)`)?([^|`]+)(?:\|([\w]+))?(?:`([^`]*)`)?$/);
			if (m == null) return;
			const [_, arg, mode, prefix, key, modifier, suffix] = m;
			const truth = ['?', '&'].includes(mode);
			const append = ['+', '&'].includes(mode);
			let value = this.#findKey(key);
			
			if (truth && !value) return;
			
			value = value??'{{'+key+'}}';
			
			if (modifier) {
				switch(modifier.trim().toLowerCase()) {
					case 'u': case 'upper':
						value = String(value).toUpperCase();
						break;
					case 'l': case 'lower':
						value = String(value).toLowerCase();
						break;
				}
			}
			value = (prefix??'') + value + (suffix??'');
			
			switch (arg.trim()) {
				case 'text':
					if (append) elm.textContent += value;
					else elm.textContent = value;
					break;
				case 'html':
					if (append) elm.innerHTML += value;
					else elm.innerHTML = value;
					break;
				case 'value':
					if (['INPUT', 'TEXTAREA', 'SELECT'].includes(elm.tagName)) {
						if (append) elm.value += value;
						else elm.value = value;
						break;
					}
				default:
					if (append) elm.setAttribute(arg, (elm.getAttribute(arg)??'')+value);
					else elm.setAttribute(arg, value);
					break;
			}
		});
		delete elm.dataset[dataset];
	}
	
	t(key) {
		if (typeof key != 'string') throw new Error('Provided key is not string.');
		return this.#findKey(key) ?? '{{'+key+'}}';
	}
	
	translate(dom, dataset="template") {
		if (!(dom instanceof HTMLElement)) throw new Error('This function can only be used on HTMLElements.');
		if (dom.dataset[dataset]) this.#translateOne(dom, dataset);
		dom.querySelectorAll('[data-'+dataset+']').forEach(elm=>{
			this.#translateOne(elm, dataset);
		});
	}
	
	static #instance;
	
	static init(dictionary) { this.#instance = new this(dictionary); }
	
	static t(key) {
		if (! this.#instance) throw Error("lng not initialized.");
		return this.#instance.t(key);
	}
	static translate(dom, dataset="lng") {
		if (! this.#instance) throw Error("lng not initialized.");
		this.#instance.translate(dom, dataset);
	}
}