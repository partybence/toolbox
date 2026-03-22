# lng (Lowercase LNG)

## Description
Allows lightweight dictionary management for dynamic localization and value templating.

## Initializing/Instantiating:
**Singleton:**  
lng can be used as a singleton with it's static functions. This is recommended for global translations.  
You have to initialize the singleton once, then use the static functions described below.  
`lng.init(dict:Object)`  
`lng.init(jsonDict:String)`  
**Separate instances:**
For local use, for example when filling out templates' data, separate instances can be created.
`const localLng = new lng(dict:Object)`  
`const localLng = new lng(jsonDict:String)`  

### Arguments:
**dict**:  
Can be a direct JavaScript object containing the dictionary key-value pairs or key hierarchy, or a JSON representation of one.  
Multiple levels of keys can be used for structuring your dictionary.  
eg.:  
```
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

## Functions:

### .t(key:String)
Get one value by the specified key.  
When using hierarchical dictionary, the keys top down should be provided separated by periods.  
If the specified key is not present or doesn't point to a primitive value, {{\<key>}} placeholder is returned.  

**Examples:**  
Assume we've initiaded our singleton using above dictionary.
```
> lng.t('greeting')
< 'Hello World!'
```
```
> lng.t('time_of_day_greetings.evening')
< 'Good Evening!'
```
```
> lng.t('time_of_day_greetings')
< '{{time_of_day_greetings}}'
```
```
> lng.t('non_existant')
< '{{non_existant}}'
```

### .translate(dom:HTMLElement, dataset='lng':String)  
This function translates an entire HTML DOM element and it's children.  
The translation rules for any element is defined in it's dataset attribute, which conform the dataset parameter present in the function call.  
The translation rules follow the pattern:  
`<attribute>:<key>[|<modifier>][;<parameter>:<key>[|<modifier>]...]`  
where _attribute_ is the name of the HTML attribute to take the value of the translation, supplemented with text and html for the inner contents of the element,
_key_ is the dictionary key string,
_modifier_ is the optional modifier of the translated text, currently applicable are 'u' or 'upper' and 'l' or 'lower'.

**Examples:**  
```
<script>
	lng.init({'name':'Name of user', 'age':'Age of user', 'tel':'Phone number'});
	const userdata = new lng({'name':'John Doe', 'age':'55', 'tel':'123456'});
</script>

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
</table>

<script>
	const userTable = document.getElementById('dynamic');
	lng.translate(userTable); // First, translate by singleton. The dataset parameter is left empty, so the lng dataset (data-lng) will be used.
	userdata.translate(userTable, 'userdata'); // Now apply the userdata dictionary. The dataset parameter is 'userdata' so (data-userdata) will be used.
</script>
```
Result:  

Singleton translated | Local instance translated
-|-
Name of user | John Doe
Age of user | 55
Phone number | 123456
