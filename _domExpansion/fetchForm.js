document.addEventListener('submit', async (e)=>{
	const form = e.target.closest('form[fetch]');
	if (!form) return;
	e.preventDefault();
	
	const formData = new FormData(form);
	const method=(form.getAttribute('method') || 'POST').toUpperCase();
	
	const beforeEvent = new CustomEvent("before-fetch", {
		cancelable: true,
		detail: { form, formData }
	});
	
	// Before event cancelled
	if (!form.dispatchEvent(beforeEvent))
		return;
	
	const response = await fetch(form.action, {
		method: method=='GET' ? 'POST' : method, // Get is not allowed for fetch, fallback to POST
		headers: {'Content-Type':'application/json'},
		body: JSON.stringify(Object.fromEntries(formData))
	});
	
	form.dispatchEvent(new CustomEvent("after-fetch", {
		detail: { form, response }
	}));
});
