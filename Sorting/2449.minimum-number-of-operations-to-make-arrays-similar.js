// 2449. Minimum Number of Operations to Make Arrays Similar
// You are given two positive integer arrays nums and target, of the same length.
// In one operation, you can choose any two distinct indices i and j where 0 <= i, j < nums.length and:
  // set nums[i] = nums[i] + 2 and
  // set nums[j] = nums[j] - 2.
// Two arrays are considered to be similar if the frequency of each element is the same.
// Return the minimum number of operations required to make nums similar to target. The test cases are generated such that nums can always be similar to target.


// Solution: Greedy w/ Sorting 

// For two arrays a and b, it is always optimal to turn each a[i] into b[i] after sorting both a and b.
// Since we must add/subtract 2, odd numbers can only be converted into odd numbers, and even numbers can only be converted into even numbers.
// Separate the even and odd numbers and calculate separately.

// Get the total sum of each Math.abs(nums[i] - target[i]) / 2 for both even and odd arrays.
// Divide the total sum by 2 since we can add and subtract in one operation.
// It is guaranteed that for every add operation, there is an existing subtract operation needed.

// Time Complexity: O(n log(n)) 286ms
// Space Complexity: O(n) 65.9MB
var makeSimilar = function(nums, target) {
  let evenNums = [], oddNums = [];
  let evenTarget = [], oddTarget = [];
  let n = nums.length;
  for (let i = 0; i < n; i++) {
    if (nums[i] % 2 === 0) evenNums.push(nums[i]);
    else oddNums.push(nums[i]);
    
    if (target[i] % 2 === 0) evenTarget.push(target[i]);
    else oddTarget.push(target[i]);
  }
  
  evenNums.sort((a, b) => a - b);
  oddNums.sort((a, b) => a - b);
  evenTarget.sort((a, b) => a - b);
  oddTarget.sort((a, b) => a - b);
  
  let diffSum = 0;
  for (let i = 0; i < evenNums.length; i++) {
    diffSum += Math.abs(evenNums[i] - evenTarget[i]) / 2; 
  }
  for (let i = 0; i < oddNums.length; i++) {
    diffSum += Math.abs(oddNums[i] - oddTarget[i]) / 2;
  }
  return diffSum / 2;
};

// Three test cases
console.log(makeSimilar([8,12,6], [2,14,10])) // 2
console.log(makeSimilar([1,2,5], [4,1,3])) // 1
console.log(makeSimilar([1,1,1,1,1], [1,1,1,1,1])) // 0