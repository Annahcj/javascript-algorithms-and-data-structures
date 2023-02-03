// 1923. Longest Common Subpath
// There is a country of n cities numbered from 0 to n - 1. In this country, there is a road connecting every pair of cities.
// There are m friends numbered from 0 to m - 1 who are traveling through the country. Each one of them will take a path consisting of some cities. Each path is represented by an integer array that contains the visited cities in order. The path may contain a city more than once, but the same city will not be listed consecutively.
// Given an integer n and a 2D integer array paths where paths[i] is an integer array representing the path of the ith friend, return the length of the longest common subpath that is shared by every friend's path, or 0 if there is no common subpath at all.
// A subpath of a path is a contiguous sequence of cities within that path.


// Solution: Binary Search & Rolling Hash

// Binary search for the longest common subpath length.
// For a length k, use rolling hash to generate hashes for all k-lengthed subarrays in each paths[i].
  // Use a hashmap to keep track of the starting indexes for each hash for each paths[i].
  // We only add a hash to the hashmap if we are at paths[0] OR it matches a substring with the same hash from the previous hashmap.

// Note: To avoid hash collisions, we need to compare the subarrays with the same hash.

// n = sum(paths[i].length), m = min(paths[i].length)
// Time Complexity: O(m log(n)) 4315ms
  // worst case: O(m^2 * log(n)) due to subarray comparisons
// Space Complexity: O(max(paths[i].length)) 89MB
var longestCommonSubpath = function(n, paths) {
  let minLen = Infinity;
  for (let i = 0; i < paths.length; i++) {
    minLen = Math.min(minLen, paths[i].length);
  }
  let low = 0, high = minLen;
  while (low < high) {
    let mid = Math.ceil((low + high) / 2);
    if (commonPathExists(paths, mid)) low = mid;
    else high = mid - 1;
  }
  return low;
};

// Check if common subpath of length k exists
function commonPathExists(paths, k) {
  let prevHashes = new Map();
  for (let i = 0; i < paths.length; i++) {
    let power = 1, base = 971143, MOD = 1000000007, hash = 0; 
    let currHashes = new Map();
    for (let j = 0; j < paths[i].length; j++) {
      hash = (hash * base + paths[i][j]) % MOD;
      if (j < k) {
        power = (power * base) % MOD;
      }
      if (j >= k) {
        hash = (hash - power * paths[i][j - k] % MOD + MOD) % MOD;
      }
      if (j >= k - 1) {
        if (i === 0 || hasMatch(prevHashes, paths, hash, paths[i], j - k + 1, k)) {
          if (!currHashes.has(hash)) currHashes.set(hash, []);
          currHashes.get(hash).push([i, j - k + 1]);
        }
      }
    }
    prevHashes = currHashes;
  }
  return prevHashes.size > 0;
}

// Compare subarrays with the same hash to avoid collisions
function hasMatch(prevHashes, paths, hash, path, startIndex, k) {
  if (!prevHashes.has(hash)) return false;
  let prevStartIndexes = prevHashes.get(hash);
  for (let [i, j] of prevStartIndexes) {
    let isMatch = true;
    for (let index = 0; index < k; index++) {
      if (paths[i][j + index] !== path[startIndex + index]) {
        isMatch = false;
        break;
      }
    }
    if (isMatch) return true;
  }
  return false;
}

// Three test cases
console.log(longestCommonSubpath(5, [[0,1,2,3,4],[2,3,4],[4,0,1,2,3]])) // 2
console.log(longestCommonSubpath(3, [[0],[1],[2]])) // 0
console.log(longestCommonSubpath(5, [[0,1,2,3,4],[4,3,2,1,0]])) // 1