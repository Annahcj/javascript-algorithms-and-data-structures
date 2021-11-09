// 1182. Shortest Distance to Target Color
// You are given an array colors, in which there are three colors: 1, 2 and 3.
// You are also given some queries. Each query consists of two integers i and c, return the shortest distance between the given index i and the target color c. If there is no solution return -1.


// Solution: Binary Search

// 1. Populate each index into a hashmap categorized by the color -> [1,1,2,1,3] = {1: [0,0,3], 2: [2], 3: [4]} 
// 2. Binary Search for first index greater than or equal to index
  // If we find an index that exactly matches, return 0.
  // Otherwise find the first greater index, and return the minimum difference of 
    // 1. First greater index
    // 2. Last smaller index (index on the immediate left of the first greater index)

// m = colors.length, n = queries.length
// Time Complexity: O(n log(m)) 260ms
// Space Complexity: O(m) 66.2MB
var shortestDistanceColor = function(colors, queries) {
  let map = {};
  for (var i = 0; i < colors.length; i++) {
    let color = colors[i];
    if (!map[color]) map[color] = [];
    map[color].push(i);
  }
  let res = [];
  for (var [idx, color] of queries) {
    if (!map[color]) res.push(-1);
    else {
      res.push(search(idx, map[color]));
    }
  }
  return res;

  function search(idx, arr) {
    let left = 0, right = arr.length - 1;
    while (left < right) {
      let mid = Math.floor((left + right) / 2);
      // if match is found, return 0
      if (arr[mid] === idx) return 0;
      else if (arr[mid] > idx) right = mid;
      else left = mid + 1;
    }
    // if there is no smaller index, return the first bigger index.
    if (left === 0) return arr[left] - idx;
    // otherwise return the best of first greater index and last smaller index
    return Math.min(Math.abs(arr[left] - idx), Math.abs(arr[left - 1] - idx));
  }
};

// Two test cases to run function on
console.log(shortestDistanceColor([1,1,2,1,3,2,2,3,3], [[1,3],[2,2],[6,1]])) // [3,0,3]
console.log(shortestDistanceColor([1,2], [[0,3]])) // [-1]