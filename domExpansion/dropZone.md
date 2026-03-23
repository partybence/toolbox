# dropZone

Helps creating simple, even-driven dropzones on your webpage if the only goal is to have a place to drop contents to.

## Usage

To create a dropzone, simply add the `dropzone` attribute to the desired DOM element.  
When a drop lands, the dropzone fires a `drop` event, to which you can attach a listener.  
The dropped content will be present in the event's `detail` parameter.

You can also add the `data-drag-state` attribute to DOM elements, which, when dragged over that element or a child of that, will get the value `dragover`.  
This can be used for CSS styling. The `data-drag-state` can be added to parents of the dropzone, for example `body`, and be used to highlight dropzones
when users drag over the page.

## Examples
```html
<body data-drag-state>
	<div id="myDropZone" dropzone data-drag-state>Drop Content Here</div>
	<script>
		const dropzone = document.getElementById("myDropZone");
		dropzone.addEventListener("drop", (e) => {
			const droppedContent = e.detail;
		});
	</script>
	<style>
		[data-drag-state=dragover] [dropzone] {
			background-color: lightblue;
		}
		[dropzone][data-drag-state=dragover] {
			background-color: green;
		}
	</style>
</body>
```