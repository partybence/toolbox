# Popup (Bootstrap extension)

Allows creating popup dialogs with awaitable show function for retrieving user input.

Builds on top of bootstrap.Modal library.

## Instantiating

`new Popup(popup, options)`

### Parameters

**popup**

For creating a generic popup, an `object` is to be supplied having the following keys:
- _type_ must be one of the following values:
  - `PopupType.Alert` or `0` to create a simple alert, only having an Ok button
  - `PopupType.Confirm` or `1` to create a user confirm dialog, having Ok or Cancel options
  - `PopupType.Input` or `2` to create a simple text input popup
  - `PopupType.Masked` or `3` to create a masked text input (password input) popup
- _title_ and _prompt_ `String` (Optional) of which at least one must be present, either setting the modal title, the modal text, or both
- _center_ `true`/`false` (Optional, default: `false`) indicating whether the popup should be vertically centered (`.modal-dialog-centered`)
- _wide_ `true`/`false` (Optional, default: `false`) indicating whether the popup should be normal sized (on `true`) or smaller, more popup-like (on `false`) (`.modal-sm`)
- _danger_ `true`/`false` (Optional, default: `false`) setting the confirm button to use `btn-danger` to indicate the confirmation of a dangerous action.
- _ok_ `String` (Optional, default: `Ok`) sets the confirm button's text.
- _cancel_ `String` (Optional, default: `Cancel`) sets the cancel button's text.

Or you can create custom popup modals (read below) in which case the modal as an `HTMLElement` or selector as `String` should be passed.

**options**
(Optional)

Options for the Bootstrap Modal itself.  
See: [Bootstrap > Modal > Options](https://getbootstrap.com/docs/5.3/components/modal/#options)

## Functions

### .modal()

Returns the modal `HTMLElement` associated with the popup.

### .reset()

Resets the modal to it's original state.

Normally, when the popup closes, it keeps it's inputs in their last state (user inputs not removed).  
When using popups with text inputs, make sure to reset when assured that we don't want to give previous user input back to the user (eg. for editing).

### .show()

Returns `Promise` which is resolved when the modal is closed.  
(The bootstrap modal can be preventet from closing in the `hide.bs.modal` event, in which case the `Promise` stays pending.)

When awaited, returns an object of the following keys:
- _self_ the return value of the popup itself
  - For generic popups, `true` if confirmed, `false` if cancelled
  - For custom popups, custom values can be bound to buttons (eg. for selection popup)
- _input_ collects the values of elements with a `name` attribute
  - For generic popups, the text input's value can be accessed as `input.value`
  - For custom popups, the _input_ object contains keys matching the named elements' names and values of them

## Custom popups

For defining a custom popup, build the Modal DOM as specified at [Bootstrap > Modal](https://getbootstrap.com/docs/5.3/components/modal/#examples)
and pass that or the selector of that when constructing the Popup.

When the modal closes by any of the default methods (by `data-bs-dismiss="modal"` or by `.hide()`), the `Promise` always resolves to `{self: false, input: {}}`.

For confirming the popup, create at least one button with the `data-popup-resolve` attribute.  
If this has no value, `self` becomes `true` when the button is clicked.  
If this attribute has a value, `self` becomes that value.

A popup is also confirmed if `Enter` key is pressed on a text input.  
In this case, `self` is always `true`.

A popup confirm only takes effect if it has no `:invalid` inputs, meaning that you can make input fields `required` or use `pattern` on them.

## Examples

**Generic popups**

```js
// Create a simple informational popup, no centering, no widening
const p = new Popup({type: PopupType.Alert, title: 'Info', prompt: 'This is an OpenSource community.'});
await p.show(); // Wait for user interaction
console.log('User acknowledged that this is OpenSource...');
```

```js
// Create a simple confirmation popup, place it in the center
const p = new Popup({type: PopupType.Confirm, title: 'Wait', prompt: 'Are you sure that you want to continue?', center: true, danger: true, ok: 'Yes, go on'});
const response = await p.show();
if (response.self == true) {
	console.log('User confirmed to go on...');
} else {
	console.log('Abort...');
}
```

```js
// Use wider popup for text input, this time we only want a header
const p = new Popup({type: PopupType.Input, title: 'Name please', wide: true, cancel: 'Not today'});
const response = await p.show();
if (response.self == true) {
	const name = response.input.value;
	if (name == '') {
		console.log('User remains Anonymous...');
	} else {
		console.log('Please all welcome '+name+' aboard...');
	}
} else {
	console.log('User cancelled...');
}
```

```js
// Use wider, centered popup, prompt user via smaller text for password
const p = new Popup({type: PopupType.Masked, prompt: 'Please enter your master password', wide: true, center: true});
const response = await p.show();
if (response.self == true) {
	const passwd = response.input.value;
	if (passwd == '') {
		console.log('No password is provided...');
	} else {
		// We don't print out passwords anywhere, just what were you thinking?
	}
} else {
	console.log('User cancelled...');
}
```

**A custom popup example**

```html
<div id="examplePopup" class="modal" tabindex="-1">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">Modal title</h5>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body">
				<!-- The patterns in this example are not at all the proper patterns for these fields, they're only for demonstration. -->
				<input type="text" name="fullname" placeholder="Full name" required />
				<input type="text" name="email" placeholder="E-mail address" pattern="\w@\w\.[a-z]" />
				<input type="text" name="phone" placeholder="Phone number" pattern="[0-9]+" />
				
				<p>How should we contact you?</p>
				<button type="button" data-popup-resolve="send_mail">Send me an e-mail</button>
				<button type="button" data-popup-resolve="call_on_phone">Call me on the phone</button>
			</div>
			<div class="modal-footer">
			</div>
		</div>
	</div>
</div>
```

```js
const p = new Popup('#examplePopup');
const response = p.show();
if (response.self !== false) {
	const name = response.input.fullname;
	switch (response.self) {
		case 'call_on_phone':
			console.log('Call '+name+' on this number: '+response.input.phone);
			break;
		case 'send_mail':
			console.log('Send '+name+' an e-mail to '+response.input.email);
			break;
	}
} else {
	console.log('User did not want to be contacted...');
}
```