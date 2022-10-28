// 2448. Minimum Cost to Make Array Equal
// You are given two 0-indexed arrays nums and cost consisting each of n positive integers.
// You can do the following operation any number of times:
  // Increase or decrease any element of the array nums by 1.
// The cost of doing one operation on the ith element is cost[i].
// Return the minimum total cost such that all the elements of the array nums become equal.


// Solution: Moving End Value

// Try to take each unique number as the final values in the array.
// Keep track of the following:
  // leftCostToChange: sum of costs for one operation for numbers smaller than nums[i]
  // leftSum: sum of cost to change numbers smaller than nums[i] into nums[i].
  // rightCostToChange: sum of costs for one operation for numbers bigger than nums[i]
  // rightSum: sum of cost to change numbers bigger than nums[i] into nums[i]

// The idea is to keep track of the costs on the left and right, and update them as we take different 'end values'.
  // Add to the left sum and subtract from the right sum.
  // Update leftCostToChange and rightCostToChange as we move the 'end value'.

// 1. Get the sum of costs for each unique number in nums.
  // e.g: If nums = [1,1,3,5], get the cost of performing 1 operation on the two 1's, and the cost of performing 1 operation on the 3, and the 5.
// 2. Sort the unique numbers in asc order.
// 3. Get the total cost to change every number into unique[0].
// 4. Take each unique[i] as the end value and record the minimum cost to change.

// n = length of nums, m = max(nums[i])
// Time Complexity: O(n log(n)) 231ms
// Space Complexity: O(n + m) 70.6MB
var minCost = function(nums, cost) {
  let n = nums.length, max = Math.max(...nums), costSum = Array(max + 1).fill(0); // total cost to change
  let uniqueNums = new Set();
  for (let i = 0; i < n; i++) {
    let num = nums[i];
    costSum[num] += cost[i];
    uniqueNums.add(num);
  }
  
  let unique = [...uniqueNums].sort((a, b) => a - b);
  let leftSum = 0, rightSum = 0;
  let leftCostToChange = costSum[unique[0]], rightCostToChange = 0;
  for (let i = 1; i < unique.length; i++) {
    let num = unique[i];
    let costToChange = costSum[num];
    let diff = num - unique[0];
    rightSum += costToChange * diff;
    rightCostToChange += costToChange;
  }

  let ans = rightSum;
  for (let i = 1; i < unique.length; i++) {
    let num = unique[i];
    let costToChange = costSum[num];
    let diff = num - unique[i - 1];
    rightSum -= rightCostToChange * diff;
    rightCostToChange -= costToChange;
    leftSum += leftCostToChange * diff;
    leftCostToChange += costToChange;
    ans = Math.min(ans, leftSum + rightSum);
  }
  return ans;
};

// Two test cases
console.log(minCost([1,3,5,2], [2,3,1,14])) // 8
console.log(minCost([2,2,2,2,2], [4,2,8,1,3])) // 0