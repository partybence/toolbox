# notification

## Description
Can be used to display simple popup notifications.

## Usage:
`showNotification(message:String, type='info':String, permanent=false:Boolean)`

### Arguments
**message**  
The message to be displayed. \\n can be used for newline, it'll be converted into \<br> tag  

**type**  
Can be (info|success|warning|error), which changes the accent color of the popup.

**permanent**  
Indicates whether the notification disappears automatically (after 5 seconds) or only on click.  
Latter is recommended to be used when displaying errors or longer messages.

## Examples:
`> showNotification('Just an info that I\'m using the simplest, dumbest\nnotification displaying function.')`
`> showNotification('It works!', 'success', true)`