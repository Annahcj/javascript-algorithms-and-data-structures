// 2675. Array of Objects to Matrix
// Write a function that converts an array of objects arr into a matrix m.
// arr is an array of objects or arrays. Each item in the array can be deeply nested with child arrays and child objects. It can also contain numbers, strings, booleans, and null values.
// The first row m should be the column names. If there is no nesting, the column names are the unique keys within the objects. If there is nesting, the column names are the respective paths in the object separated by ".".
// Each of the remaining rows corresponds to an object in arr. Each value in the matrix corresponds to a value in an object. If a given object doesn't contain a value for a given column, the cell should contain an empty string "".
// The columns in the matrix should be in lexographically ascending order.


// Solution: Recursive DFS

// Flatten each object/array into an object containing all the flattened keys and values using recursive DFS.
// Keep track of all the unique paths in a set (to get the final columns).
// Sort the unique paths in lexicographical order.
// Go through each flattened object, then go through each unique path in lexicographical order and assign the value to the row if it exists for the row.

// m = number of rows, n = number of unique paths (final columns)
// Time Complexity: O(mn + n log(n)) 324ms
// Space Complexity: O(mn) 96.4MB
var jsonToMatrix = function(arr) {
  const uniquePathsSet = new Set();
  const rows = [];
  for (const element of arr) {
    const map = {};
    traverse(map, '', element);
    rows.push(map);
  }
  const uniquePaths = [...uniquePathsSet].sort();
  const res = [uniquePaths];
  for (const map of rows) {
    const row = Array(uniquePaths.length).fill('');
    for (let i = 0; i < uniquePaths.length; i++) {
      const value = map[uniquePaths[i]];
      if (value !== undefined) row[i] = value;
    }
    res.push(row);
  }
  return res;
  
  function traverse(map, path, obj) {
    for (const key in obj) {
      const value = obj[key];
      const newPath = path.length === 0 ? path + key : path + '.' + key;
      if (isObjectOrArray(value)) {
        traverse(map, newPath, value);
      } else {
        uniquePathsSet.add(newPath);
        map[newPath] = value;
      }
    }
  }
  
  function isObjectOrArray(value) {
    const isObject = typeof value === 'object' && value !== null;
    if (Array.isArray(value) || isObject) return true;
  }
};

// Two test cases
console.log(jsonToMatrix([{"b":1,"a":2},{"b":3,"a":4}])) // [["a","b"],[2,1],[4,3]]
console.log(jsonToMatrix([{"a": 1, "b": 2},{"c": 3, "d": 4},{}])) // [["a","b","c","d"],[1,2,"",""],["","",3,4],["","","",""]]