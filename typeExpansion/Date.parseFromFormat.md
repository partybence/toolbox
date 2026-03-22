# Date.parseFromFormat()

Allows `Date` to be parsed from a `String` of a custom format.

## Syntax

```
Date.parseFromFormat(dateString, format)
```
```
parseDateFromFormat(dateString, format)
```

## Parameters

`dateString`

The input `String` that represent the date to be parsed.

`format`

Specifies the format that the input should be interpreted in using sequences as follows:
 - %% - Literal %
 - %d - Day of Month
 - %H - Hours
 - %I - Hours, 12h format
 - %m - Month
 - %M - minutes
 - %p - AM/PM
 - %P - am/pm
 - %S - Seconds
 - %y - Short year
 - %Y - Long year
 - %z - Timezone offset
   - Z for UTC
   - [+-]%H%M

## Returns

If `dateString` matches the provided `format`, a `Date` object is returned.  
Otherwise an `Error` is thrown.

## Examples

```js
Date.fromFormat("2025-01-12 % 01:23:45PM +0200", "%Y-%m-%d %% %I:%M:%S%p %z") // Sun, 12 Jan 2025 11:23:45 GMT
```
```js
Date.fromFormat("250112T132345Z", "%y%m%dT%H%M%S%z") // Sun, 12 Jan 2025 13:23:45 GMT
```
