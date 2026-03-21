document.addEventListener('dragenter', function (e) {
	e.stopPropagation(); e.preventDefault();
});

document.addEventListener('dragover', function (e) {
	e.stopPropagation(); e.preventDefault();
	const f = e.target.closest('[dropzone]');if(!f) e.dataTransfer.dropEffect = "none";
});

document.addEventListener('drop', function(e){
	e.preventDefault(); e.stopPropagation();
	const f = e.target.closest('[dropzone]');if(!f) return;
	
	var data = event.dataTransfer.items;
	
	form.dispatchEvent(new CustomEvent("dropped", {
		detail: { data }
	}));
});
