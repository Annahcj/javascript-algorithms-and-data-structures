// 3003. Maximize the Number of Partitions After Operations
// You are given a 0-indexed string s and an integer k.
// You are to perform the following partitioning operations until s is empty:
  // Choose the longest prefix of s containing at most k distinct characters.
  // Delete the prefix from s and increase the number of partitions by one. The remaining characters (if any) in s maintain their initial order.
// Before the operations, you are allowed to change at most one index in s to another lowercase English letter.
// Return an integer denoting the maximum number of resulting partitions after the operations by optimally choosing at most one index to change.


// Solution: DP w/ Bitmasks

// Memoize each dp(i, mask, changed), where
  // i = index in s
  // mask = bitmask of characters we have used
  // changed = boolean flag for whether we have performed the change operation already

// For each dp(i, mask, changed),
  // If the bitmask count exceeds k unique characters, we must create a new partition.
    // The bitmask needs to be reset since we created a partition.

  // Otherwise, we need to keep adding to the existing partition.

  // If changed is false, that means we can try to change s[i] to a different character.
    // Try changing s[i] to each possible lowercase character.

// Return the maximum number of partitions out of all options.

// n = length of s
// Time Complexity: O(n * 26^2) 1196ms
  // For each index, the bitmask will be the same excluding any changes.
  // We can only change one character, and that there will be at most 26 different states coming from the change, and we loop through the 26 different characters: O(26^2)
// Space Complexity: O(n * 26^2) 141.1MB
var maxPartitionsAfterOperations = function(s, k) {
  let n = s.length, memo = new Map();
  return dp(0, 0, false);
  
  function dp(i, mask, changed) {
    if (i === n) return 1;
    let key = `${i},${mask},${changed}`;
    if (memo.has(key)) return memo.get(key);
    
    let ans = 0, newMask = mask | (1 << s.charCodeAt(i) - 97);
    if (countOnes(newMask) > k) {
      ans = Math.max(ans, 1 + dp(i + 1, 1 << s.charCodeAt(i) - 97, changed));
    } else {
      ans = Math.max(ans, dp(i + 1, newMask, changed));
    }
    
    if (!changed) {
      for (let j = 0; j < 26; j++) {
        let newMask = mask | (1 << j);
        if (countOnes(newMask) > k) {
          ans = Math.max(ans, 1 + dp(i + 1, 1 << j, true));
        } else {
          ans = Math.max(ans, dp(i + 1, newMask, true));
        }
      }
    }
    memo.set(key, ans);
    return ans;
  }
};

function countOnes(mask) {
  let ones = 0;
  while (mask > 0) {
    ones += (mask & 1);
    mask >>= 1;
  }
  return ones;
}

// Three test cases
console.log(maxPartitionsAfterOperations("accca", 2)) // 3
console.log(maxPartitionsAfterOperations("aabaab", 3)) // 1
console.log(maxPartitionsAfterOperations("xxyz", 1)) // 4