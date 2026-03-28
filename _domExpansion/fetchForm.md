# fetchForm

This helper simplifies sending form data via fetch on SSPs.

## Usage

### Creating fetch-forms

To alter a form's behavior from redirecting to the target URL to passing the information via fetch, simply add the `fetch` attribute to the `form` element.

FetchForm also allows the use of _PUT_, _PATCH_ and _DELETE_ methods, defined in the form's method attribute.

### Events

**before-fetch**

This event fires when a form submission is issued by the user.

The event's `detail` parameter contains the sender `HTMLElement` (form element) and the `FormData`.

The `FormData` can be altered or validated before being sent.  
If the validation fails, the event can be cancelled (`.preventDefault()`) and the form submission be prevented.

**after-fetch**

This event fires after the fetch results came back.

The event's `detail` parameter contains the sender `HTMLElement` (form element) and the fetch `Response`.

## Examples

```html
<form id="example-form" action="/example" method="PUT" fetch>
</form>
```
```js
const form = document.getElementById('example-form');
form.addEventListener('before-fetch', (evt) => {
	const [sender, data] = evt.detail;
});
form.addEventListener('after-fetch', (evt) => {
	const [sender, response] = evt.detail;
});
```
