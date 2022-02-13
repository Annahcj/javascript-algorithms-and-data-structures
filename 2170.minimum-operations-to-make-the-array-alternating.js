// 2170. Minimum Operations to Make the Array Alternating
// You are given a 0-indexed array nums consisting of n positive integers.
// The array nums is called alternating if:
  // nums[i - 2] == nums[i], where 2 <= i <= n - 1.
  // nums[i - 1] != nums[i], where 1 <= i <= n - 1.
// In one operation, you can choose an index i and change nums[i] into any positive integer.
// Return the minimum number of operations required to make the array alternating.


// Solution: Find Most Frequent Element in Even, Odd Arrays

// The array can be separated into even-indexed and odd-indexed elements.
// From there, find the most frequent numbers in the subarrays.
// The answer is the length of the subarray - the frequency of the most frequent number.
// But! There's a catch. The numbers that we are turning the even and add arrays into must be different.
// So we need to keep track of the second most frequent number for both, and find the best possible combination where they are not equal.

// Time Complexity: O(n) 445ms
// Space Complexity: O(n) 74.1MB
var minimumOperations = function(nums) {
  let n = nums.length;
  if (n === 1) return 0;
  let evenMap = {}, oddMap = {}, evenLen = Math.ceil(n / 2), oddLen = Math.floor(n / 2);
  // get frequencies of even-indexed and odd-indexed separately
  for (let i = 0; i < n; i++) {
    if (i % 2 === 0) evenMap[nums[i]] = (evenMap[nums[i]] || 0) + 1;
    else oddMap[nums[i]] = (oddMap[nums[i]] || 0) + 1;
  }

  let [evenNum, evenFreq] = getMax(evenMap);
  let [oddNum, oddFreq] = getMax(oddMap);
  let ans = Infinity;
  for (let i = 0; i < evenNum.length; i++) {
    if (evenNum[i] === -1) continue;
    for (let j = 0; j < oddNum.length; j++) {
      if (oddNum[j] === -1 || evenNum[i] === oddNum[j]) continue; // they cannot be equal
      ans = Math.min(ans, (evenLen - evenFreq[i]) + (oddLen - oddFreq[j]));
    }
  }
  if (ans === Infinity) ans = Math.min(ans, Math.min(evenLen, oddLen));
  return ans;

  function getMax(map) { // returns the most frequent and second most frequent number and their frequencies
    let max = -1, secondMax = -1;
    for (let num in map) {
      let freq = map[num];
      if (max === -1 || freq > map[max]) {
        secondMax = max;
        max = num;
      }
      else if (secondMax === -1 || freq > map[secondMax]) secondMax = num;
    }
    max = +max, secondMax = +secondMax;
    return [[max, secondMax], [map[max], map[secondMax]]];
  }
};

// Two test cases to run function on
console.log(minimumOperations([3,1,3,2,4,3])) // 3
console.log(minimumOperations([2,2,3])) // 1