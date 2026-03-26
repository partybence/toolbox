(() => {
	let suppressRefocus = false;
	
	function focusSplitInput(e, splitInputContainer, stepback=false) {
		const inputs = Array.from(splitInputContainer.querySelectorAll('input:is(:not([type]), [type=text], [type=password]):not([disabled])'));
		if (!inputs) return;
		e?.preventDefault();
		lastEmpty = inputs.findIndex(i=>i.value=='');
		if (lastEmpty > -1 && (selection = inputs[Math.max(0, (lastEmpty - stepback))])) selection.focus();
		else inputs[inputs.length-1].focus();
	}
	
	document.addEventListener('beforeinput',async (e)=>{
		const f = e.target.closest('[data-input-name]:not([data-input-name=""])');if(!f) return;
		const d=e.data??null;
		if (d == null) { suppressRefocus = true; focusSplitInput(null, f, true); return; }
		if (d.length == 1) {
			const pattern = new RegExp(e.target.pattern);
			if (e.target.value=='' && pattern.test(d)) return;
		} else {
			const inputs = [...f.querySelectorAll('input:is(:not([type]), [type=text], [type=password])')];
			const validInputs = inputs.filter(i => !i.disabled);
			if (validInputs[0].value || (inputs.length != d.length && validInputs.length != d.length)) { e.preventDefault(); return; }
			const patterns = inputs.map(i => (i.pattern ? i.pattern : ".")+(i.disabled ? '?' : '')).join('');
			const regex = new RegExp('^'+patterns+'$');
			if (!regex.test(d)) { e.preventDefault(); return; }
			const values = d.split('');
			
			const n = f.dataset.inputName;
			const input = f.querySelector('input[name='+n+']');
			
			if (inputs.length == d.length) {
				inputs.forEach(i => (v = values.shift()) && !i.disabled && (i.value = v) && (input.value += v));
			} else {
				validInputs.forEach(i => (i.value = values.shift()) && (input.value += i.value));
			}
			focusSplitInput(e, f);
			return;
		}
		e.preventDefault();
	});
	document.addEventListener('input',async (e)=>{
		const f = e.target.closest('[data-input-name]:not([data-input-name=""])');if(!f) return;
		const n = f.dataset.inputName;
		let i = f.querySelector('input[name='+n+']');
		if(e.data) {i.value += e.data;}else{i.value = i.value.slice(0, -1);}
		focusSplitInput(null, f);
	});
	document.addEventListener('mousedown',async (e)=>{
		const f = e.target.closest('[data-input-name]:not([data-input-name=""])'); if (!f) return;
		focusSplitInput(e, f);
	});
	document.addEventListener('focus',async (e)=>{
		const f = e.target.closest('[data-input-name]:not([data-input-name=""])'); if (!f) return;
		const n = f.dataset.inputName;
		if (!(i=f.querySelector('input[name='+n+']'))) { i=document.createElement('input'); i.type='hidden'; i.name=n; f.appendChild(i); }
		
		if (!f.contains(e.relatedTarget)) {
			f.querySelectorAll('*').forEach(el => {
				if ((tabindex = el.getAttribute('tabindex')) != undefined) el.dataset.tabindex = tabindex;
				el.setAttribute('tabindex', -1);
			});
		}
		if (suppressRefocus) { suppressRefocus = false; return; }
		focusSplitInput(e, f);
	}, true);
	document.addEventListener('focusout',async (e)=>{
		const f = e.target.closest('[data-input-name]:not([data-input-name=""])'); if (!f) return;
		if (!f.contains(e.relatedTarget)) {
			f.querySelectorAll('*').forEach(el => {
				if ((tabindex = el.dataset.tabindex) != undefined) el.setAttribute('tabindex', tabindex);
				else el.removeAttribute('tabindex');
				delete el.dataset.tabindex;
			});
		}
	}, true);
})();
