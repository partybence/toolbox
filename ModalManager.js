class ModalManager {
	static #instance = null;
	constructor() {
		if (typeof bootstrap === 'undefined' || !bootstrap.Modal) throw ReferenceError("ModalManager requires bootstrap.Modal but it's not loaded.");
	}
	static #getInstance() {
		if (this.#instance === null) this.#instance = new ModalManager();
		return this.#instance;
	}
	
	#modals = [];
	#startZIndex=1050;
	
	static register (modalEl, options=null) { return this.#getInstance().register(modalEl, options); }
	static deregister (modalEl) { return this.#getInstance().deregister(modalEl); }
	
	#shownEv = e => {
		const modal = bootstrap.Modal.getInstance(e.target);
		const thisZIndex = (this.#modals.length===0) ? this.#startZIndex : Math.max(...this.#modals.map(o=>o._element.getAttribute('data-z-ord'))) + 100;
		if (modal._backdrop._element) modal._backdrop._element.style.zIndex = thisZIndex;
		modal._element.style.zIndex = thisZIndex + 50;
		modal._element.setAttribute('data-z-ord', thisZIndex);
		this.#modals.push(modal);
	}
	#hiddenEv = e => {
		const i = this.#modals.indexOf(bootstrap.Modal.getInstance(e.target));
		if (i > -1) this.#modals.splice(i,1);
	}
	
	register (modalEl, options=null) {
		let modal = (options !== null) ? new bootstrap.Modal(modalEl, options) : bootstrap.Modal.getOrCreateInstance(modalEl);
		modal._element.addEventListener('shown.bs.modal', this.#shownEv);
		modal._element.addEventListener('hidden.bs.modal', this.#hiddenEv);
		return modal;
	}
	
	deregister (modalEl) {
		let modal = modalEl.constructor.name === 'Ln' ? modalEl : bootstrap.Modal.getInstance(modalEl);
		modal._element.removeEventListener('shown.bs.modal', this.#shownEv);
		modal._element.removeEventListener('hidden.bs.modal', this.#hiddenEv);
		return modal;
	}
}
