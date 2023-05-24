// 2700. Differences Between Two Objects
// Write a function that accepts two deeply nested objects or arrays obj1 and obj2 and returns a new object representing their differences.
// The function should compare the properties of the two objects and identify any changes. The returned object should only contains keys where the value is different from obj1 to obj2. For each changed key, the value should be represented as an array [obj1 value, obj2 value]. Keys that exist in one object but not in the other should not be included in the returned object. When comparing two arrays, the indices of the arrays are considered to be their keys. The end result should be a deeply nested object where each leaf value is a difference array.
// You may assume that both objects are the output of JSON.parse.


// Solution: Recursion

// 1. If the type is different, we want to add the entire two values as diffs.
// 2. If they are both primitive values, set the diff only if they are different.
// 3. If they are both objects or both arrays, set the diff only if the returned diff object is not empty.

// n = size of obj1 and obj2, d = maximum depth of nesting in obj1 and obj2
// Time Complexity: O(n) 61ms
// Space Complexity: O(n + d) 44.4MB
function objDiff(obj1, obj2) {
  let diff = {};
  for (let key in obj1) {
    if (!(key in obj2)) continue;
    let val1 = obj1[key], val2 = obj2[key];
    if (typeIsDifferent(val1, val2)) { 
      diff[key] = [val1, val2];
    } else if (!isObjectOrArray(val1) && !isObjectOrArray(val2)) { 
      if (val1 !== val2) diff[key] = [val1, val2];
    } else { 
      let returnedDiff = objDiff(val1, val2);
      if (Object.keys(returnedDiff).length > 0) {
        diff[key] = returnedDiff;
      }
    }
  } 
  return diff;
};

function typeIsDifferent(val1, val2) {
  return getType(val1) !== getType(val2);
}

function getType(val) {
  if (typeof val === 'string') return 'string';
  if (typeof val === 'number') return 'number';
  if (val === undefined) return 'undefined';
  if (val === null) return 'null';
  if (Array.isArray(val)) return 'array';
  return 'object';
}

function isObjectOrArray(val) {
  return typeof val === 'object' && val !== null;
}

// Two test cases
console.log(objDiff({}, {"a": 1, "b": 2})) // {}
console.log(objDiff({"a": 1,"v": 3,"x": [],"z": {"a": null}}, {"a": 2,"v": 4,"x": [],"z": {"a": 2}})) // {"a": [1, 2],"v": [3, 4],"z": {"a": [null, 2]}}