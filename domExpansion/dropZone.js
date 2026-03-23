document.addEventListener('dragenter', function (e) {
	e.stopPropagation(); e.preventDefault();
	const f = e.target.closest('[data-drag-state]');if(!f) return;
	f.setAttribute('data-drag-state', 'dragover');
});
document.addEventListener('dragleave', function (e) {
	const f = e.target.closest('[data-drag-state]');if(!f || f.contains(e.relatedTarget)) return;
	f.setAttribute('data-drag-state', '');
});

document.addEventListener('dragover', function (e) {
	e.stopPropagation(); e.preventDefault();
	const f = e.target.closest('[dropzone]');if(!f) e.dataTransfer.dropEffect = "none";
});

document.addEventListener('drop', function(e){
	e.preventDefault(); e.stopPropagation();
	const f = e.target.closest('[dropzone]');if(!f) return;
	
	var data = event.dataTransfer.items;
	
	f.dispatchEvent(new CustomEvent("dropped", {
		detail: { data }
	}));
});
