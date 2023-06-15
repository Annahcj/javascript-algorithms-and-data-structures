// 2722. Join Two Arrays by ID
// Given two arrays arr1 and arr2, return a new array joinedArray. All the objects in each of the two inputs arrays will contain an id field that has an integer value. joinedArray is an array formed by merging arr1 and arr2 based on their id key. The length of joinedArray should be the length of unique values of id. The returned array should be sorted in ascending order based on the id key.
// If a given id exists in one array but not the other, the single object with that id should be included in the result array without modification.
// If two objects share an id, their properties should be merged into a single object:
  // If a key only exists in one object, that single key-value pair should be included in the object.
  // If a key is included in both objects, the value in the object from arr2 should override the value from arr1.


// Solution: 

// Time Complexity: O(n) 348ms
// Space Complexity: O(n) 92.2MB
var join = function(arr1, arr2) {
  let map = {};
  for (let obj of arr1) {
    map[obj.id] = obj;
  }
  for (let obj of arr2) {
    if (map[obj.id] !== undefined) {
      map[obj.id] = merge(map[obj.id], obj);
    } else {
      map[obj.id] = obj;
    }
  }
  return Object.values(map).sort((a, b) => a.id - b.id);
};

function merge(obj1, obj2) {
  for (let key in obj2) {
    obj1[key] = obj2[key];
  }
  return obj1;
}

// A test case
console.log(join([{"id": 1,"x": 1},{"id": 2,"x": 9}], [{"id": 3,"x": 5}])) // [{"id":1,"x":1},{"id":2,"x":9},{"id":3,"x":5}]