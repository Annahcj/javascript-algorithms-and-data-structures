// 3312. Sorted GCD Pair Queries
// You are given an integer array nums of length n and an integer array queries.
// Let gcdPairs denote an array obtained by calculating the GCD of all possible pairs (nums[i], nums[j]), where 0 <= i < j < n, and then sorting these values in ascending order.
// For each query queries[i], you need to find the element at index queries[i] in gcdPairs.
// Return an integer array answer, where answer[i] is the value at gcdPairs[queries[i]] for each query.
// The term gcd(a, b) denotes the greatest common divisor of a and b.


// Solution: Combinatorics & Prefix Sum

// 1. Calculate the number of pairs for every GCD.
  // The maximum GCD is max(nums[i]).
  // Iterate through every possible GCD from greatest to smallest and use the inclusion exclusion principle to get the pairs.
  // The GCD of two numbers will always be a factor of both numbers, so in other words they are both multiples of the GCD.
  // For a given GCD, get the count of the GCD's multiples and calculate the number of pairs we can make with the count (n * (n + 1) / 2).
  // To remove duplicate pairs, subtract all pairs whose GCD is a multiple of the current GCD (because all common factors of two numbers are also factors of the GCD).
// 2. Get the prefix sum of the GCD pair counts.
// 3. For each query, binary search for the leftmost GCD where the prefix sum of counts are larger than or equal to queries[i].

// n = length of nums, m = max(nums[i]), k = length of queries
// Time Complexity: O(n + m log(m) + k log(m)) 322ms
// Space Complexity: O(n + m + k) 80.8MB
function gcdValues(nums, queries) {
  let maxGCD = Math.max(...nums);
  let count = {};
  for (let num of nums) {
    count[num] = (count[num] || 0) + 1;
  }
  let pairs = Array(maxGCD + 1).fill(0);
  for (let gcd = maxGCD; gcd >= 1; gcd--) {
    let multiplesCount = 0;
    for (let multiple = gcd; multiple <= maxGCD; multiple += gcd) {
      multiplesCount += (count[multiple] || 0);
    }
    pairs[gcd] = multiplesCount > 1 ? multiplesCount * (multiplesCount - 1) / 2 : 0;
    for (let multiple = gcd * 2; multiple <= maxGCD; multiple += gcd) {
      pairs[gcd] -= pairs[multiple];
    }
  }
  let pSum = [...pairs];
  for (let i = 1; i <= maxGCD; i++) {
    pSum[i] += pSum[i - 1];
  }
  
  let k = queries.length, ans = Array(k);
  for (let i = 0; i < k; i++) {
    let low = 1, high = maxGCD;
    while (low < high) {
      let mid = Math.floor((low + high) / 2);
      if (pSum[mid] >= queries[i] + 1) high = mid;
      else low = mid + 1;
    }
    ans[i] = low;
  }
  return ans;
};

// Three test cases
console.log(gcdValues([2,3,4], [0,2,2])) // [1,2,2]
console.log(gcdValues([4,4,2,1], [5,3,1,0])) // [4,2,1,1]
console.log(gcdValues([2,2], [0,0])) // [2,2]