// 2086. Minimum Number of Buckets Required to Collect Rainwater from Houses
// You are given a 0-indexed string street. Each character in street is either 'H' representing a house or '.' representing an empty space.
// You can place buckets on the empty spaces to collect rainwater that falls from the adjacent houses. The rainwater from a house at index i is collected if a bucket is placed at index i - 1 and/or index i + 1. A single bucket, if placed adjacent to two houses, can collect the rainwater from both houses.
// Return the minimum number of buckets needed so that for every house, there is at least one bucket collecting rainwater from it, or -1 if it is impossible.


// Solution: Greedy

// Only add to the left if we must (no right available).
// Otherwise, it's always optimal to add on the right (to give more chance of sharing with the next house).

// Cases:
  // 1. Right is available - we take the right
  // 2. Right is not available
    // a. Left is not available - impossible
    // b. Left is available - take the left

// Time Complexity: O(n) 89ms
// Space Complexity: O(1) 44.9MB
var minimumBuckets = function(street) {
  let n = street.length, count = 0;
  for (let i = 0; i < n; i++) {
    if (street[i] === 'H') {
      if (i < n && street[i + 1] === '.') {
        count++;
        i += 2;
      } else if (i === n - 1 || street[i + 1] !== '.') {
        if (i <= 0 || street[i - 1] !== '.') return -1;
        count++;
      }
    }
  }
  return count;
};

// Three test cases
console.log(minimumBuckets("H..H")) // 2
console.log(minimumBuckets(".H.H.")) // 1
console.log(minimumBuckets(".HHH.")) // -1