# hash-csv

This command line tool allows you to generate a hash for each entry in a CSV and append it to the end of the line.

## Installation

1. Clone the repository
2. Run `npm install`
3. Run `npm install -g`

## Usage

`hash-csv generate <file> `

## Example

### Input

```csv
id,name
1,John
2,Paul
3,George
4,Ringo
```

### Output

```csv
id,name,hash
1,John,0x1
2,Paul,0x2
3,George,0x3
4,Ringo,0x4
```
