// 2633. Convert Object to JSON String
// Given an object, return a valid JSON string of that object. You may assume the object only inludes strings, integers, arrays, objects, booleans, and null. The returned string should not include extra spaces. The order of keys should be the same as the order returned by Object.keys().
// Please solve it without using the built-in JSON.stringify method.


// Solution: Recursion 

// Handle the six different types:
  // null: return the string "null" 
  // string: return the string wrapped with ""
  // boolean and number: return the stringified form
  // array: call jsonStringify recursively on each array element
  // object: call jsonStringify recursively on each value

// n = size of the object
// Time Complexity: O(n) 83ms
// Space Complexity: O(n) 64.4MB
var jsonStringify = function(object) {
  if (object === null) return "null";
  if (typeof object === 'string') return `"${object}"`;
  if (typeof object === 'boolean' || typeof object === 'number') return object.toString();
  
  if (Array.isArray(object)) {
    let res = [];
    for (let i = 0; i < object.length; i++) {
      res.push(jsonStringify(object[i]));
    }
    return `[${res.join(",")}]`;
  }
  
  let res = [];
  for (let key in object) {
    res.push(`"${key}":${jsonStringify(object[key])}`);
  }
  return `{${res.join(",")}}`;
};