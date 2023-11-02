// 2705. Compact Object
// Given an object or array obj, return a compact object. A compact object is the same as the original object, except with keys containing falsy values removed. This operation applies to the object and any nested objects. Arrays are considered objects where the indices are keys. A value is considered falsy when Boolean(value) returns false.
// You may assume the obj is the output of JSON.parse. In other words, it is valid JSON.


// Solution: Recursion 

// Handle arrays and objects separately.
// Build new arrays/objects.

// n = total number of elements in obj
// Time Complexity: O(n) 108ms
// Space Complexity: O(n) 52MB
var compactObject = function(obj) {
  if (Array.isArray(obj)) {
    let newArr = [];
    for (const val of obj) {
      if (isObject(val)) newArr.push(compactObject(val));
      else if (val) newArr.push(val);
    }
    return newArr;
  } else {
    let newObj = {};
    for (const key in obj) {
      if (isObject(obj[key])) {
        newObj[key] = compactObject(obj[key]);
      } else if (obj[key]) {
        newObj[key] = obj[key];
      }
    }
    return newObj;
  } 
};

function isObject(val) {
  return typeof val === 'object' && val !== null;
}

// Three test cases
console.log(compactObject([null, 0, false, 1])) // [1]
console.log(compactObject({"a": null, "b": [false, 1]})) // {"b": [1]}
console.log(compactObject([null, 0, 5, [0], [false, 16]])) // [5, [], [16]]