// 2007. Find Original Array From Doubled Array
// An integer array original is transformed into a doubled array changed by appending twice the value of every element in original, and then randomly shuffling the resulting array.
// Given an array changed, return original if changed is a doubled array. If changed is not a doubled array, return an empty array. The elements in original may be returned in any order.


// Solution: Sorting & Hashmap

// 1. Sort changed
// 2. Count the frequency of each number
// 3. Get the original array by going from smallest to biggest.
  // Skip if the frequency of the number is 0.
  // Find the double, then decrease the frequency of both numbers.

// n = changed.length, k = count of unique numbers
// Time Complexity: O(n log(n)) 464ms
// Space Complexity: O(k) 79.2MB
var findOriginalArray = function(changed) {
  if (changed.length % 2 === 1) return [];
  
  changed.sort((a, b) => a - b);
  let freq = new Map();
  for (let num of changed) {
    freq.set(num, (freq.get(num) || 0) + 1);
  }
  
  let res = [];
  for (let num of changed) {
    if (freq.get(num) === 0) continue; // number is already used up
    freq.set(num, freq.get(num) - 1); // decrease num frequency
    if (!freq.has(num * 2) || freq.get(num * 2) === 0) return []; // there is no double, invalid.
    freq.set(num * 2, freq.get(num * 2) - 1); // decrease double frequency
    res.push(num); 
  }
  return res;
};

// Three test cases
console.log(findOriginalArray([1,3,4,2,6,8])) // [1,3,4]
console.log(findOriginalArray([6,3,0,1])) // []
console.log(findOriginalArray([0,0,0,0])) // [0,0]