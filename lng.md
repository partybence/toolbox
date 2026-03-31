# lng (Lowercase LNG)

Allows lightweight dictionary management for dynamic localization and value templating.

## Initializing/Instantiating

**Global (static)**

lng can be globally initialized/re-initialized. This is recommended for global translations.

`lng.init(dict)`

**Local (instance)**

For local use, for example when filling out template data, separate local instances can be created.

`const localLng = new lng(dict)`

### Parameters

**dict**

Can be a direct JavaScript `Object` containing the dictionary key-value pairs or key hierarchy, or a JSON `String` representation of one.

Multiple levels of keys can be used for structuring your dictionary.
eg.:  
```js
{
	'greeting':'Hello World!',
	'farewell': 'Good Bye!',
	'time_of_day_greetings': {
		'morning': 'Good Morning!',
		'afternoon': 'Good Afternoon!',
		'evening': 'Good Evening!',
	}
}
```

## Functions

### .t(key)

Get one value by the specified key.

**key**

A `String` key of the translation in the dictionary.

When using hierarchy within the dictionary, the path top down should be provided, each key separated by a period.

If the specified key is not present or the path doesn't point to a primitive value (eg.: partial path), {{\<key>}} placeholder is returned.

_Examples_

Assume we've initiaded our global instance using above dictionary.
```js
> lng.t('greeting') // Single key
< 'Hello World!'
```
```js
> lng.t('time_of_day_greetings.evening') // Two-layer path
< 'Good Evening!'
```
```js
> lng.t('time_of_day_greetings') // Partial path
< '{{time_of_day_greetings}}'
```
```js
> lng.t('non_existent') // Non-existent key
< '{{non_existant}}'
```

### .translate(dom, dataset)

This function translates an entire HTML DOM element and it's children.

**dom**

`HTMLElement` to be translated.

**dataset**
(Optional)

`String` value of the name of the dataset containing the translation definition set.

Defaults to _lng_ in global (static) and _template_ in local (instance) function calls, _data-lng="\<definition_set>"_ or _data-template="\<definition_set>"_ HTML attributes.

#### Translation definition

Within the definition set, the definitions are separated by a semicolon (;).  
A translation definition follows the pattern  
``<attribute>[?+&]:[`prefix`]<key>[|<modifier>][`suffix`]``  
where
- `attribute` is the name of the HTML attribute to take the value of the translation

  The following attributes are handled specially:
  - **text** - sets the `.textContent` of the element
  - **html** - sets the `.innerHTML` of the element
  - **value** - if used on `input`, `textarea` or `select`, sets the `.value` of the element
  
  The attribute name can be followed by one of the following characters:
  - **?** apply the translation only if the value is not falsy
  - **+** append the translation to the current value of the attribute
  - **&** append the translation only if the value is not falsy
- `prefix` and `suffix` string literals enclosed in backticks (`) can be prepended and appended to the value
- `key` is the dictionary key string

  The key can be followed by a pipe and a `modifier` of the followings:
  - **u** or **upper** convert the translated value to uppercase
  - **l** or **lower**  convert the translated value to lowercase

_Examples_

```html
<table id="dynamic">
	<tr>
		<th>Singleton translated</th>
		<th>Local instance translated</th>
	</tr>
	<tr>
		<td data-lng="text:name"></td>
		<td data-userdata="text:name"></td>
	</tr>
	<tr>
		<td data-lng="text:age"></td>
		<td data-userdata="text:age"></td>
	</tr>
	<tr>
		<td data-lng="text:tel"></td>
		<td data-userdata="text:tel"></td>
	</tr>
	<tr>
		<td data-lng="text:nonexistent1"></td>
		<td data-userdata="text:nonexistent"></td>
	</tr>
	<tr>
		<td data-lng="text:nonexistent2"></td>
		<td data-userdata="text?:nonexistent"></td>
	</tr>
</table>
```
```js
lng.init({'name':'Name of user', 'age':'Age of user', 'tel':'Phone number', 'nonexistent1':'Placeholder', 'nonexistent2':'Ignored missing key'}); // Initialize global with label translations
const userdata = new lng({'name':'John Doe', 'age':'55', 'tel':'123456'}); // Instantiate local with user data

const userTable = document.getElementById('dynamic');
lng.translate(userTable); // First, translate by global. The dataset parameter is left empty, so the lng dataset (data-lng) will be used.
userdata.translate(userTable, 'userdata'); // Now apply the userdata dictionary. The dataset parameter is 'userdata' so (data-userdata) will be used.
```

Singleton translated | Local instance translated
-|-
Name of user | John Doe
Age of user | 55
Phone number | 123456
Placeholder | {{nonexistent}}
Ignored missing key | 


#### Constraints
- No semicolon (;) can be used within a definition
- `attribute` and `key`
  - can only start with a letter
  - can only contain letters, numbers, hyphen (-), underscore (_) and period (.)
  - must end with a letter or a number
- `prefix` and `suffix`
  - backtick (`) and backslash (\\) must be escaped by a backslash (\\)