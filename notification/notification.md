# notification

Can be used to display simple popup notifications.

## Syntax

`showNotification(message, type, permanent)`

## Parameters

**message**

The message `String` to be displayed.

_\\n_ can be used for newline, it'll be converted into _\<br>_ tag.

**type**
(Optional)

`String` type of the notification, which changes the accent color of the popup.

Can be _(info|success|warning|error)_.

Default is _info_.

**permanent**
(Optional)

`Boolean` value indicating whether the notification disappears automatically (after 5 seconds) or only on click.

Latter is recommended to be used when displaying errors or longer messages.

## Examples

```js
showNotification("Just an info that I'm using the simplest, \n dumbest notification displaying function.")
```
```js
showNotification('It works!', 'success', true)
```