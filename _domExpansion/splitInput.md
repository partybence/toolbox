# splitInput

This helper lets you create a group of single-character inputs for fixed-length codes, for example OTPs.

## Usage

### Defining split-input groups

Put the input fields in a container having the `data-input-name` attribute.  
A hidden input of this name will be created to hold the concatenated values of the inputs.

### Using separator fields

You can add disabled inputs with a static value in-between the code inputs.  
These fields will be skipped when typing.

### Defining input format

The accepted input format can be defined by adding the `pattern` attribute to each of the input fields (including disabled) for that specific character.

### Inserting code from clipboard

Insertion from clipboard is allowed when there's been no input yet.

The inserted data is pre-tested for matching in length and then tested against the input fields' `pattern` attributes.  
If the attribute is not present on one or more inputs, any character is accepted.

The separators are allowed to be present in or missing from the pasted content.  
Keep in mind that the separators are also validated against the pattern attributes, not the separator input's value.

## Example

```html
<form>
	<div data-input-name="email-code">
		<!-- First three characters are letters -->
		<input type="text" pattern="[a-zA-Z]" />
		<input type="text" pattern="[a-zA-Z]" />
		<input type="text" pattern="[a-zA-Z]" />
		<!-- Show visual hyphen as separator, but also allow period in inserted format -->
		<input type="text" pattern="[-.]" value="-" disabled/>
		<!-- Last three characters are numbers -->
		<input type="text" pattern="[0-9]" />
		<input type="text" pattern="[0-9]" />
		<input type="text" pattern="[0-9]" />
	</div>
</form>
```
