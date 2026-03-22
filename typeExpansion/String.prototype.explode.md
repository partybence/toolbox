# String.prototype.explode()

## Description
Similar to the split function of the String prototype but unlike that, this function doesn't omit the part after the specified limit, only leaves it unsplit.  
The limit parameter specifies the number of parts, not the number of splits!  
If the limit is or less than 0 (default), that's treated as no limit. This has the same behavior as split without limit set.

## Usage:
`(String).explode(separator:String, limit=0);`

### Arguments
**separator**  
The pattern describing where each split should occur. For more details, refer to the String.prototype.split() manual.

**limit** (optional)  
Specifies the number of parts to be present in the array returned.  
If is or less than 0 (default), that's treated as no limit. This has the same behavior as split without limit set.

## Examples:
```
> "1,2,3,4".explode(",");
< ["1", "2", "3", "4"]
```
```
> "1,2,3,4".explode(",", 3);
< ["1", "2", "3,4"]
```
```
> "1,2,3,4".explode(",", 1);
< ["1,2,3,4"]
```
