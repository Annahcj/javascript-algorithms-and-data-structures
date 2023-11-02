// 2870. Minimum Number of Operations to Make Array Empty
// You are given a 0-indexed array nums consisting of positive integers.
// There are two types of operations that you can apply on the array any number of times:
  // Choose two elements with equal values and delete them from the array.
  // Choose three elements with equal values and delete them from the array.
// Return the minimum number of operations required to make the array empty, or -1 if it is not possible.

 
// Solution: Greedy & Counting

// Use a hashmap to count the occurances of each number.

// Observe the following counts and their relation to operations:
  // 1 operation:
    // count 1: X
    // count 2: [2]
    // count 3: [3]
  // 2 operations:
    // count 4: [2,2]
    // count 5: [2,3]
    // count 6: [3,3]
  // 3 operations:
    // count 7: [3,2,2]
    // count 8: [3,3,2]
    // count 9: [3,3,3]
  // 4 operations:
    // count 10: [3,3,2,2]
    // count 11: [3,3,3,2]
    // count 12: [3,3,3,3]
  // 5 operations:
    // count 13: [3,3,3,2,2]
    // etc...

// Observe that the relation between the counts and number of operations is Math.ceil(count / 3). 

// Time Complexity: O(n) 125ms
// Space Complextity: O(n) 55.7MB
var minOperations = function(nums) {
  let countMap = {};
  for (let num of nums) {
    countMap[num] = (countMap[num] || 0) + 1;
  }
  let ans = 0;
  for (let num in countMap) {
    let count = countMap[num];
    if (count === 1) return -1; 
    let operations = Math.ceil(count / 3);
    ans += operations;
  }
  return ans;
};

// Two test cases
console.log(minOperations([2,3,3,2,2,4,2,3,4])) // 4
console.log(minOperations([2,1,2,2,3,3])) // -1