// 1477. Find Two Non-overlapping Sub-arrays Each With Target Sum
// You are given an array of integers arr and an integer target.
// You have to find two non-overlapping sub-arrays of arr each with a sum equal target. There can be multiple answers so you have to find an answer where the sum of the lengths of the two sub-arrays is minimum.
// Return the minimum sum of the lengths of the two required sub-arrays, or return -1 if you cannot find such two sub-arrays.


// Solution: Hashmap & DP

// Use a two-sum approach to store the ongoing sums. In case of two equal sums, only store the most recent/highest index.
// To find a subarray with a sum of target, look for a sum of: sum - target

// Use an array 'best' where best[i] = length of the smallest subarray with a sum equal to target, ending at index <= i
// For each subarray with a sum equal to target, 
  // check whether there exists another subarray with a sum equal to target ending <= start of the current subarray.

// Time Complexity: O(n) 180ms
// Space Complexity: O(n) 77.1MB
var minSumOfLengths = function(arr, target) {
  let n = arr.length, best = Array(n).fill(Infinity); // best[i] = minimum subarray length ending <= i
  let map = new Map(), sum = 0, ans = Infinity;
  map.set(0, -1);
  
  for (let i = 0; i < n; i++) {
    sum += arr[i];
    let start = map.has(sum - target) ? map.get(sum - target) : -Infinity;
    map.set(sum, i); // only keep the highest index
    
    let prevBest = i === 0 ? Infinity : best[i - 1];
    best[i] = Math.min(prevBest, i - start);
    
    if (start >= 0) {
      ans = Math.min(ans, i - start + best[start]);
    }
  }
  return ans === Infinity ? -1 : ans;
};

// Two test cases 
console.log(minSumOfLengths([3,2,2,4,3], 3)) // 2
console.log(minSumOfLengths([7,3,4,7], 7)) // 2
console.log(minSumOfLengths([4,3,2,6,2,3,4], 6)) // -1