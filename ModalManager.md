# ModalManager

This is a simple helper for stacking Bootstrap Modals.

Bootstrap's Modals are normally not stackable, their z-indexes are fixed by the stylesheet.

This class can register and keep track of open modals, dynamically setting their z-indexes to display on top of each-other.

## Syntax

`ModalManager.register(modalEl, options)`
`ModalManager.deregister(modalEl)`

## Parameters

**modalEl**

The `String` selector of, or the `HTMLElement` the DOM element of the modal  
or, for deregister, the bootstrap.Modal object.

**options**
(Optional)

Bootstrap modal options. See: [Bootstrap -> Modal -> Passing options](https://getbootstrap.com/docs/5.3/components/modal/#passing-options)

## Returns

Both functions return the bootstrap.Modal object.  
Same as if you instantiated it via `new bootstrap.Modal()`
