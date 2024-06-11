// 1122. Relative Sort Array
// Given two arrays arr1 and arr2, the elements of arr2 are distinct, and all elements in arr2 are also in arr1.
// Sort the elements of arr1 such that the relative ordering of items in arr1 are the same as in arr2. Elements that do not appear in arr2 should be placed at the end of arr1 in ascending order.


// Solution: Sorting & Hashmap

// To sort arr1 by the order of arr2, we need to use a hashmap to map each value of arr2 to the index.
// Sort arr1 by the indices of arr2, and give it a default index of arr2.length if not present in arr2. This will put all numbers not present in arr2 at the end of arr1. 
// If the indices of two elements are the same, sort by value in asc order.

// n = length of arr1
// Time Complexity: O(n log(n)) 54ms
// Space Complexity: O(n) 48.8MB
function relativeSortArray(arr1, arr2) {
  let indices = new Map();
  for (let i = 0; i < arr2.length; i++) {
    indices.set(arr2[i], i);
  }
  return arr1.sort((a, b) => {
    let indexA = indices.has(a) ? indices.get(a) : arr2.length;
    let indexB = indices.has(b) ? indices.get(b) : arr2.length;
    if (indexA === indexB) return a - b;
    return indexA - indexB;
  });
};

// Two test cases
console.log(relativeSortArray([2,3,1,3,2,4,6,7,9,2,19], [2,1,4,3,9,6])) // [2,2,2,1,4,3,3,9,6,7,19]
console.log(relativeSortArray([28,6,22,8,44,17], [22,28,8,6])) // [22,28,8,6,17,44]