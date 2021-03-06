
Node Comparison
=====

Node-comparison is a lightweight tool for compare any type of arguments with keyword, written on node.js



#### Installation

install node-comparison via npm

    npm install node-comparison
 
#### Overview

Node-comparison takes arguments written in JSON friendly format as input. Arguments could be many types of data (number, string, boolean, date, ...) with a humanity operator format in String (Number "equal" Number, Date "before" Date, ...), return value is the boolean of the comparison result.

###### Use the common package to handle the comparison

[string.js](http://stringjs.com/)
[moment.js](http://momentjs.com/docs/#/query/is-same/)

##### Supported types: number, date, boolean, string
##### Supported operators:
* __number__: ['equal', 'notEqual', 'lessThan', 'lessThanOrEqual', 'greaterThan', 'greaterThanOrEqual', 'between'],
* __date__: ['on', 'before', 'after', 'onOrBefore', 'onOrAfter', 'within'],
* __boolean__: ['equal', 'notEqual'],
* __string__: ['is', 'startWith', 'contains']

#### Usage

`var compare = require('node_comparison').compare;`
`console.log('compare result');`
`console.log(compare('date', 'within', new Date(2017, 1, 20), new Date(2017, 1, 19), new Date(2017, 1, 23)));`