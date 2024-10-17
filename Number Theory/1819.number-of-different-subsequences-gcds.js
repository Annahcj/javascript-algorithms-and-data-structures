// 1819. Number of Different Subsequences GCDs
// You are given an array nums that consists of positive integers.
// The GCD of a sequence of numbers is defined as the greatest integer that divides all the numbers in the sequence evenly.
  // For example, the GCD of the sequence [4,6,16] is 2.
// A subsequence of an array is a sequence that can be formed by removing some elements (possibly none) of the array.
  // For example, [2,5,10] is a subsequence of [1,2,1,2,4,1,5,10].
// Return the number of different GCDs among all non-empty subsequences of nums.


// Solution: Counting & Logic

// The maximum possible GCD is max(nums[i]) <= 200,000.
// Find the GCD of all numbers who share a common factor.
// The more numbers in the subsequence, the GCD will only ever get lower or stay the same.
// Hence, if the GCD of all numbers who share the same factor is not equal to that factor, then no subsequence of those numbers will ever have a GCD equal to the factor.

// n = length of nums, m = max(nums[i])
// Time Complexity: O(n sqrt(m)) 873ms
// Space Complexity: O(m) 89.1MB
function countDifferentSubsequenceGCDs(nums) {
  let gcd = new Map();
  for (let num of nums) {
    for (let factor = 1; factor * factor <= num; factor++) {
      if (num % factor !== 0) continue;
      gcd.set(factor, getGCD(num, gcd.get(factor) ?? num));
      gcd.set(num / factor, getGCD(num, gcd.get(num / factor) ?? num));
    }
  }
  let ans = 0;
  for (let [factor, subsequenceGCD] of gcd) {
    if (factor === subsequenceGCD) {
      ans++;
    }
  }
  return ans;
};

function getGCD(a, b) {
  if (b === 0) return a;
  return getGCD(b, a % b);
}

// Two test cases
console.log(countDifferentSubsequenceGCDs([6,10,3])) // 5
console.log(countDifferentSubsequenceGCDs([5,15,40,5,6])) // 7