document.addEventListener('show.bs.modal', e => {
	const m = bootstrap.Modal.getInstance(e.target);
	const z = Number(document.querySelectorAll(".modal.show").values().reduce((a,b)=>a.style.zIndex>b.style.zIndex?a:b, {style:{zIndex:1055}}).style.zIndex)+50;
	queueMicrotask(() => { m._backdrop._element.style.zIndex = z-5; });
	m._element.style.zIndex = z;
});
