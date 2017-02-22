var _  = require('lodash');
var moment = require('moment');
var S = require('string');

// trying to use Currying in this function
/**
 * Function create a suitable comparison function for specific type and operator
 * @param {String} type
 * @param {String} operator
 * @returns {function()}
 */
const create = (type, operator) => {
  const
    supportedTypes = ['number', 'date', 'boolean', 'string'],
    supportedOperators = {
      number: ['equal', 'notEqual', 'lessThan', 'lessThanOrEqual', 'greaterThan', 'greaterThanOrEqual', 'between'],
      date: ['on', 'before', 'after', 'onOrBefore', 'onOrAfter', 'within'],
      boolean: ['equal', 'notEqual'],
      string: ['is', 'startWith', 'contains'],
    },
    isSupportedType = _.indexOf(supportedTypes, type),
    isSupportedOperator = _.indexOf(supportedOperators[type], operator)
    ;

  // verify if the type is supported or not
  if (isSupportedType < 0) {
    throw new Error('UNSUPPORTED_TYPE', `type: ${type} is unsupported to create condition`);
  }

  // verify if the operator is supported or not
  if (isSupportedOperator < 0) {
    throw new Error('UNSUPPORTED_OPERATOR', `type: ${operator} is unsupported to create condition`);
  }

  switch (type) {
    case 'number':
    {
      switch (operator) {
        case 'equal':
        {
          return (...args) => {
            console.log(args);
            return args[0] === args[1];
          };
        }
        case 'notEqual':
        {
          return (...args) => {
            return args[0] !== args[1];
          };
        }
        case 'lessThan':
        {
          return (...args) => {
            return args[0] < args[1];
          };
        }
        case 'lessThanOrEqual':
        {
          return (...args) => {
            return args[0] <= args[1];
          };
        }
        case 'greaterThan':
        {
          return (...args) => {
            return args[0] > args[1];
          };
        }
        case 'greaterThanOrEqual':
        {
          return (...args) => {
            return args[0] >= args[1];
          };
        }
        case 'between':
        {
          return (...args) => {
            return (args[0] >= args[1] && args[0] <= args[2]);
          };
        }
        default:
        {
          throw new Error('UNKNOWN_OPERATOR', `Unknown operator: ${operator} of type: ${type}`);
        }
      }
    }
    case 'date':
    {
      switch (operator) {
        case 'on':
        {
          return (...args) => {
            // unit is in year | month | week | day | hour | minute | second
            // verify date type
            /* ... to do verify
             *  */

            return moment(args[0]).isSame(args[1], args[2]);
          };
        }
        case 'before':
        {
          return (...args) => {
            // verify date type
            /* ... to do verify
             *  */

            return moment(args[0]).isBefore(args[1], args[2]);
          };
        }
        case 'onOrBefore':
        {
          return (...args) => {
            // verify date type
            /* ... to do verify
             *  */

            return moment(args[0]).isSameOrBefore(args[1], args[2]);
          };
        }
        case 'after':
        {
          return (...args) => {
            // verify date type
            /* ... to do verify
             *  */

            return moment(args[0]).isAfter(args[1], args[2]);
          };
        }
        case 'onOrAfter':
        {
          return (...args) => {
            // verify date type
            /* ... to do verify
             *  */

            return moment(args[0]).isSameOrAfter(args[1], args[2]);
          };
        }
        case 'within':
        {
          return (...args) => {
            // verify date type
            /* ... to do verify
             *  */

            return moment(args[0]).isBetween(args[1], args[2]);
          };
        }
        default:
        {
          throw new Error('UNKNOWN_OPERATOR', `Unknown operator: ${operator} of type: ${type}`);
        }
      }
    }
    case 'boolean':
    {
      switch (operator) {
        case 'equal':
        {
          return (arg1, arg2) => {
            return arg1 === arg2;
          };
        }
        case 'notEqual':
        {
          return (arg1, arg2) => {
            return arg1 !== arg2;
          };
        }
        default:
        {
          throw new Meteor.Error('UNKNOWN_OPERATOR', `Unknown operator: ${operator} of type: ${type}`);
        }
      }
    }
    case 'string':
    {
      switch (operator) { // don't care about the capital
        case 'is':
        {
          return (...args) => {
            return args[0].toLowerCase() === args[1].toLowerCase();
          };
        }
        case 'startWith':
        {
          return (...args) => {
            S(args[0]).startsWith(args[1]);
          };
        }
        case 'contains':
        {
          return (...args) => {
            return S(args[0]).contains(args[1]);
          };
        }
        default:
        {
          throw new Error('UNKNOWN_OPERATOR', `Unknown operator: ${operator} of type: ${type}`);
        }
      }
    }
    default:
    {
      throw new Error('UNKNOWN_TYPE', `Unknown type: ${type}`);
    }
  }
};

const compare = (type, operator, ...args) => {
  return create(type, operator)(args);
};

module.exports = {
  create,
  compare
};