document.addEventListener('beforeinput',async (e)=>{
	const f = e.target.closest('[data-input-name]:not([data-input-name=""])');if(!f) return;
	const d=e.data?.trim()??null;
	if(isNaN(d)||(d!=null&&d?.length!=1)){e.preventDefault();return}
	if(!(d||e.target.value)) e.target.previousElementSibling?.focus();
});
document.addEventListener('input',async (e)=>{
	const f = e.target.closest('[data-input-name]:not([data-input-name=""])');if(!f) return;
	const n = f.getAttribute('data-input-name');
	let i = null;
	if (!(i=f.querySelector('input[type=hidden][name='+n+']'))) { i=document.createElement('input'); i.type='hidden'; i.name=n; f.appendChild(i); }
	if(e.data) {i.value += e.data; e.target.nextElementSibling?.focus();}else{i.value = i.value.slice(0, -1);}
});
document.addEventListener('mousedown',async (e)=>{
	const f = e.target.closest('[data-input-name]:not([data-input-name=""])');if(!f) return;
	const l=Array.from(f.querySelectorAll('input:not([type=hidden])'));
	if(!l)return;
	e.preventDefault();
	if(s=l.find(i=>i.value==''))s.focus();
	else l[l.length-1].focus();
});
