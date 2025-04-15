// 1534. Count Good Triplets
// Given an array of integers arr, and three integers a, b and c. You need to find the number of good triplets.
// A triplet (arr[i], arr[j], arr[k]) is good if the following conditions are true:
  // 0 <= i < j < k < arr.length
  // |arr[i] - arr[j]| <= a
  // |arr[j] - arr[k]| <= b
  // |arr[i] - arr[k]| <= c
// Where |x| denotes the absolute value of x.
// Return the number of good triplets.


// Solution: Brute Force - Enumeration

// Enumerate every possible triplet and check the four conditions.

// Time Complexity: O(n^3) 51ms
// Space Complexity: O(1) 55MB
function countGoodTriplets(arr, a, b, c) {
  const n = arr.length;
  let triplets = 0;
  for (let i = 0; i < n - 2; i++) {
    for (let j = i + 1; j < n - 1; j++) {
      if (Math.abs(arr[i] - arr[j]) > a) continue;
      for (let k = j + 1; k < n; k++) {
        if (Math.abs(arr[j] - arr[k]) > b || Math.abs(arr[i] - arr[k]) > c) continue;
        triplets++;
      }
    }
  }  
  return triplets;
};

// Two test cases
console.log(countGoodTriplets([3,0,1,1,9,7], 7, 2, 3)) // 4
console.log(countGoodTriplets([1,1,2,2,3], 0, 0, 1)) // 0