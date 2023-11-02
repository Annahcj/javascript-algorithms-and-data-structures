// 2150. Find All Lonely Numbers in the Array
// You are given an integer array nums. A number x is lonely when it appears only once, and no adjacent numbers (i.e. x + 1 and x - 1) appear in the array.
// Return all lonely numbers in nums. You may return the answer in any order.


// Solution: Hashmap

// 1. Count the frequency of each number
// 2. Get all the numbers that meet the following requirements:
  // Has a frequency of 1
  // The hashmap doesn't contain num - 1
  // The hashmap doesn't contain num + 1

// Time Complexity: O(n) 560ms
// Space Complexity: O(n) (unique numbers, worst case is n) 95MB
var findLonely = function(nums) {
  let count = new Map();
  for (let num of nums) count.set(num, (count.get(num) || 0) + 1);

  let res = [];
  for (let num of nums) {
    if (count.get(num) === 1 && !count.has(num - 1) && !count.has(num + 1)) res.push(num);
  }
  return res;
};

// Two test cases
console.log(findLonely([10,6,5,8])) // [10,8]
console.log(findLonely([1,3,5,3])) // [1,5]