// 2122. Recover the Original Array
// Alice had a 0-indexed array arr consisting of n positive integers. She chose an arbitrary positive integer k and created two new 0-indexed integer arrays lower and higher in the following manner:
  // lower[i] = arr[i] - k, for every index i where 0 <= i < n
  // higher[i] = arr[i] + k, for every index i where 0 <= i < n
// Unfortunately, Alice lost all three arrays. However, she remembers the integers that were present in the arrays lower and higher, but not the array each integer belonged to. Help Alice and recover the original array.
// Given an array nums consisting of 2n integers, where exactly n of the integers were present in lower and the remaining in higher, return the original array arr. In case the answer is not unique, return any valid array.


// Solution: 

// Try all possible k.
// 1. Sort nums in asc order
// 2. Map the frequency of each number
// 3. Try every k, try each nums[i] - nums[0] and return the one where every pair can be matched with a difference of k.
// 4. Using the sorted order, generate the original numbers using the k which we have found.

// Time Complexity: O(n^2) 4104ms
  // Although it's O(n^2) at the worst case, it can be better in most cases 
  // because once we can't find a matching number for the k we are checking, it will return out of it.
// Space Complexity: O(n) 46.7MB
var recoverArray = function(nums) {
  let freqMap = {};  
  nums.sort((a, b) => a - b);
  for (let num of nums) {
    if (freqMap[num] === undefined) freqMap[num] = 0;
    freqMap[num]++;
  }
  
  let diff = findK(), k = diff / 2;
  
  let res = [];
  for (let i = 0; i < nums.length; i++) {
    if (!freqMap[nums[i]]) continue;
    res.push(nums[i] + k);
    freqMap[nums[i]]--;
    freqMap[nums[i] + (diff)]--;
  }
  return res;
  
  function findK() {
    for (let idx = 1; idx < nums.length; idx++) {
      let diff = nums[idx] - nums[0];
      if (diff <= 1) continue;
      if (checkK(diff, {...freqMap})) {
        return diff;
      }
    }
  }
  
  function checkK(k, freq) {
    for (let i = 0; i < nums.length; i++) {
      if (!freq[nums[i]]) continue;
      if (!freq[nums[i] + k]) return false;
      freq[nums[i]]--;
      freq[nums[i] + k]--;
    }
    return true;
  }
};

// Four test cases 
console.log(recoverArray([11,6,3,4,8,7,8,7,9,8,9,10,10,2,1,9])) // [2,3,7,8,8,9,9,10]
console.log(recoverArray([2,10,6,4,8,12])) // [3,7,11]
console.log(recoverArray([1,1,3,3])) // [2,2]
console.log(recoverArray([5,435])) // [220]