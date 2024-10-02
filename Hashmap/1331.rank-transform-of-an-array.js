// 1331. Rank Transform of an Array
// Given an array of integers arr, replace each element with its rank.
// The rank represents how large the element is. The rank has the following rules:
  // Rank is an integer starting from 1.
  // The larger the element, the larger the rank. If two elements are equal, their rank must be the same.
  // Rank should be as small as possible.


// Solution: Hashmap & Hashset

// Use a hashset to get the distinct values of arr and sort it to assign the rank to each value.
// Replace each arr[i] with the newly assigned rank.

// Time Complexity: O(n log(n)) 173ms
// Space Complexity: O(n) 82.2MB
var arrayRankTransform = function(arr) {
  let sorted = [...new Set(arr)].sort((a, b) => a - b);
  let n = arr.length, rankMap = {};
  for (let i = 0; i < n; i++) {
    rankMap[sorted[i]] = i + 1;
  }
  for (let i = 0; i < n; i++) {
    arr[i] = rankMap[arr[i]];
  }
  return arr;
};

// Three test cases
console.log(arrayRankTransform([40,10,20,30])) // [4,1,2,3]
console.log(arrayRankTransform([100,100,100])) // [1,1,1]
console.log(arrayRankTransform([37,12,28,9,100,56,80,5,12])) // [5,3,4,2,8,6,7,1,3]