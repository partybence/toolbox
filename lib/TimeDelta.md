# TimeDelta

## Description
Represents a time difference and allows you to define time deltas by a human-readable string or format them into one.  
The class instance can be directly added to or subtracted from any number-convertible timestamps.

## Instantiating:
`> new TimeDelta(millis:Number)`
`> new TimeDelta(humanReadable:String)`

### Arguments:
**millis**:  
Time-difference provided in milliseconds.

**humanReadable**:  
Time-difference described by groups of the following format:  
`[sign]\<number>[unit]`  
where [unit] can be the letter representing (d)ays, (h)ours, (m)inutes, (s)econds or omited for millis.  
eg.:
`3h` 3 hours, `-1d` 1 day, `500` 500 milliseconds  
Optionally, space separators between number and unit, and space or comma separators between groups are allowed.  
eg.: `1d3h30m` equals `1 d, 3h 30m`  
When using sign, that only affects the following group, then defaults back to positive. Thus using + sign is permitted, but has no effect at all.  
eg.: `3h -40m 30s` equals `+3h -40m +30s` which equals `2h 20m 30s`


## Functions:
### .days() .hours() .minutes() .seconds() .millis()  
These functions return the components of the TimeDelta indicated by the name.  

**Examples:**  
```
> (new TimeDelta("1d 2h 30m")).Hours()
< 2
```
```
> (new TimeDelta("1d 2h 30m")).Minutes()
< 30
```
```
> (new TimeDelta("1d 2h 30m")).Seconds()
< 0
```

### .totalDays() .totalHours() .totalMinutes() .totalSeconds() .totalMillis()  
These functions return exactly how many of a unit are in the TimeDelta.

**Examples:**  
```
> (new TimeDelta("1d 2h 30m")).TotalHours()
< 26.5
```
	
### .format(format:String)
This function can be used to stringify the TimeDelta in a desired format.  
The following sequences can be used in the format:
 - %%  
   for literal "%"
 - %d %h %m %s %.  
   for accessing .dDays() .hours() .minutes() .seconds() and .millis() in order
 - %D %H %M %S %:  
   for accessing .totalDays() .totalHours() .totalMinutes() .totalSeconds() and .totalMillis() in order
 - values of above sets preceded by 0  
   for rounding the values down and padding with 0 to a length of 3 for millis and a length of 2 for any other.

**Examples:**
```
> const td = new TimeDelta("1d 2h 30m")
> td.Format("%d day(s), %0h:%0m")
< "1 day(s), 02:30"
```
```
> const td = new TimeDelta("1d 2h 9m")
> td.Format("%0H hour(s) %m minute(s)")
< "26 hour(s) 9 minute(s)"
```
