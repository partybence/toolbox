# dropZone

Helps creating simple, even-driven drop-zones on your webpage if the only goal is to have a place to drop contents to.

## Usage

### Defining drop-zones

To create a drop-zone, simply add the `dropzone` attribute to the desired `HTMLElement`.

### Events

**drop**

When a drop lands, the drop-zone fires this event.  
The dropped content is present in the event's `detail` parameter.

### Styling

You can add the `data-drag-state` attribute to `HTMLElement`s, which, when dragged over that element or a child of that, will get the value `dragover`.

This can be used for CSS styling. The `data-drag-state` can be added to parents of the dropzone, and highlight the designated area as soon as the user drags over a parent of that.

## Examples

```html
<body data-drag-state>
	<div id="myDropZone" dropzone data-drag-state>Drop Content Here</div>
</body>
```
```js
const dropzone = document.getElementById("myDropZone");
dropzone.addEventListener("drop", (e) => {
	const droppedContent = e.detail;
});
```
```css
[data-drag-state=dragover]:not([dropzone]) [dropzone] {
	background-color: lightblue;
}
[dropzone][data-drag-state=dragover] {
	background-color: green;
}
```