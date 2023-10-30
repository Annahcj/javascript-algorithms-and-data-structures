// 2628. JSON Deep Equal
// Given two objects o1 and o2, check if they are deeply equal.
// For two objects to be deeply equal, they must contain the same keys, and the associated values must also be deeply equal. Two objects are also considered deeply equal if they pass the === equality check.
// You may assume both objects are the output of JSON.parse. In other words, they are valid JSON.
// Please solve it without using lodash's _.isEqual() function.


// Solution: Recursion 

// Recursively traverse the objects and check whether they are equal.
// We need to deal with three different types:
  // arrays or objects: Compare the array elements/values - length of keys must be equal
  // null: null is an object so needs to be handled specially
  // other: any other value can be checked using the triple equal (===).

// n = number of elements in o1 and o2
// Time Complexity: O(n) 74ms
// Space Complexity: O(n) 47.2MB
var areDeeplyEqual = function(o1, o2) {
  if (!isSameType(o1, o2)) return false;
  if (o1 === o2) return true;
  if (o1 === null && o2 === null) return true;

  // handle array or objects in the same way
  let o2Keys = new Set(Object.keys(o2));
  let o1Keys = Object.keys(o1);
  if (o1Keys.length !== o2Keys.size) return false;
  for (let key of o1Keys) {
    if (!o2Keys.has(key)) return false;
    if (!areDeeplyEqual(o1[key], o2[key])) return false;
  }
  return true;
};

function isSameType(o1, o2) {
  return (o1 === o2) || (Array.isArray(o1) && Array.isArray(o2)) || (isObject(o1) && isObject(o2)) || (o1 === null && o2 === null);
}

function isObject(val) {
  return typeof val === 'object' && val !== null && !Array.isArray(val);
}

// Four test cases
console.log(areDeeplyEqual({"x":1,"y":2}, {"x":1,"y":2})) // true
console.log(areDeeplyEqual({"y":2,"x":1}, {"x":1,"y":2})) // true
console.log(areDeeplyEqual({"x":null,"L":[1,2,3]}, {"x":null,"L":["1","2","3"]})) // false
console.log(areDeeplyEqual(true, false)) // false