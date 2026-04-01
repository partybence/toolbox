const PopupType = Object.freeze({
	Alert: 0,
	Confirm: 1,
	Input: 2,
	Masked: 3
});

class Popup {
	static #buildGeneric = (options) => {
		const {type, title, prompt, center, wide, danger, ok, cancel} = options;
		const n = (n) => document.createElement(n);
		const modal = n('div'); const modald = n('div'); const modalc = n('div'); const modalh = n('div'); const modalb = n('div'); const modalf = n('div');
		modal.classList.add('modal'); modal.tabindex = '-1';
		modald.classList.add('modal-dialog'); if (center) modald.classList.add('modal-dialog-centered'); if (!wide) modald.classList.add('modal-sm'); modal.appendChild(modald);
		modalc.classList.add('modal-content'); modald.appendChild(modalc);
		modalh.classList.add('modal-header'); modalc.appendChild(modalh);
		const t = n('h5'); t.classList.add('modal-title'); t.textContent = title; modalh.appendChild(t);
		modalb.classList.add('modal-body'); modalc.appendChild(modalb);
		if (prompt) { const p = n('p'); p.textContent = prompt; modalb.appendChild(p); }
		if (type == 2 || type == 3) {
			const i = n('input'); i.classList.add('form-control'); i.name = 'value'; i.type = (type == 2) ? 'text' : 'password'; modalb.appendChild(i);
		}
		if (modalb.innerHTML == '') { modalb.remove(); modalh.classList.add('border-0'); }
		modalf.classList.add('modal-footer'); modalc.appendChild(modalf);
		if (type != 0) {
			const bc = n('button'); bc.type='button'; bc.classList.add('btn', 'btn-secondary'); bc.dataset.bsDismiss = 'modal'; bc.textContent = cancel ?? 'Cancel'; modalf.appendChild(bc);
		}
		const bs = n('button'); bs.type='button'; bs.classList.add('btn', (danger ? 'btn-danger' : 'btn-primary')); bs.dataset.popupResolve = ''; bs.textContent = ok ?? 'Ok'; modalf.appendChild(bs);
		return modal;
	};
	
	#prototype; #modal;
	#options;
	#resolve = null;
	#intent = {self: false, input: {}};
	
	#resolveResult = (_self = true) => {
		const result = {self: _self, input: {}};
		this.#modal.querySelectorAll('[name]').forEach(f => {
			result.input[f.name] = f.value;
		});
		return result;
	};
	
	#resolveClickHandler = (e) => {
		const md = e.target.closest('[data-popup-resolve]'); if (!md) return;
		const invalidInput = this.#modal.querySelector(':invalid');
		if (invalidInput) { invalidInput.focus(); return; }
		const value = md.dataset.popupResolve;
		this.#intent = this.#resolveResult(value == '' ? true : value);
		bootstrap.Modal.getOrCreateInstance(this.#modal).hide();
	};
	#keyupHandler = (e) => {
		if (!(e.key == "Enter" || e.keyCode == 13)) return;
		const invalidInput = this.#modal.querySelector(':invalid');
		if (invalidInput) { invalidInput.focus(); return; }
		this.#intent = this.#resolveResult();
		bootstrap.Modal.getOrCreateInstance(this.#modal).hide();
	};
	#modalHideHandler = (e) => {
		queueMicrotask(() => {
			if (!e.defaultPrevented) {
				this.#resolve(this.#intent);
				this.#resolve = null;
			}
			this.#intent = {self: false, input: {}};
		});
	};
	#modalHiddenHandler = (e) => {
		bootstrap.Modal.getOrCreateInstance(this.#modal).dispose();
		this.#modal.remove();
	};
	
	constructor(popup, options=null) {
		if (typeof bootstrap === 'undefined' || !bootstrap.Modal) throw ReferenceError("Popup requires bootstrap.Modal but it's not loaded.");
		
		if (typeof popup === "string") {
			this.#prototype = document.querySelector(popup);
		} else if (popup instanceof HTMLElement) {
			this.#prototype = popup;
		} else if (typeof popup === "object") {
			if (!('type' in popup && ('prompt' in popup || 'title' in popup))) throw new Error("Invalid set of keys. Refer to the manual.");
			const type = PopupType[popup.type] ?? popup.type;
			if (!type in Object.values(PopupType)) throw new Error("Invalid type. Refer to the manual");
			this.#prototype = Popup.#buildGeneric(popup);
		} else {
			throw new Error("Invalid popup type.");
		}
		
		this.#options = options;
		this.#modal = this.#prototype.cloneNode(true);
		
		this.#modal.addEventListener('click', this.#resolveClickHandler);
		this.#modal.addEventListener('shown.bs.modal', () => { this.#modal.querySelector('input[name]')?.focus(); });
		this.#modal.addEventListener('hide.bs.modal', this.#modalHideHandler);
		this.#modal.addEventListener('hidden.bs.modal', this.#modalHiddenHandler);
		this.#modal.addEventListener('keyup', this.#keyupHandler);
		
		this.#modal.remove();
		
		if (typeof ModalManager !== 'undefined') ModalManager.register(this.#modal);
	}
	
	reset() { this.#modal = this.#prototype.cloneNode(true); }
	
	show() {
		if (this.#resolve !== null) return;
		return new Promise(resolve => {
			const defop = {backdrop: 'static', keyboard: false};
			this.#resolve = resolve;
			(new bootstrap.Modal(this.#modal, this.#options ?? defop)).show();
		});
	}
	
	modal = () => this.#modal;
}
