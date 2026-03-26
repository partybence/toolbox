# Date.prototype.format()

Allows stringifying a `Date` object in a custom format.

## Syntax

```
format(format)
```
```
formatDate(date, format)
```

## Parameters

**date**

The `Date` object or a `new Date()` parseable value to be formatted.

**format**

Specifies the format that the `date` should be printed in using the following sequences:
 - %% - Literal %
 - %d - Day of Month
 - %D - Date in zero padded US format, short year (m/d/y)
 - %F - Date in ISO format, long year (Y/m/d)
 - %H - Hours
 - %I - Hours, 12h format
 - %k - Hours, space padded
 - %l - Hours, 12h format, space padded
 - %m - Month
 - %M - minutes
 - %p - AM/PM
 - %P - am/pm
 - %R - Short time (HH:MM)
 - %s - Epoch (millis)
 - %S - Seconds
 - %T - Long time (HH:MM:SS)
 - %u - Day of Week (Mon 1 - Sun 7)
 - %w - Day of Week (Sun 0 - Sat 6)
 - %y - Short year
 - %Y - Long year
 - %z - Timezone offset

## Returns

Returns a `String` representing the `date` in the desired format.  
If `formatDate()` is used and the provided `date` couldn't be parsed, that results in all sequences to be NaN. 

## Examples

```js
new Date(Date.now()).format("%Y-%m-%dT%T%z") // "2026-03-16T20:20:34+0100"
```
```js
FormatDate(1234567890000, "%F %I:%M %p") // "2009/02/14 12:31 AM"
```
