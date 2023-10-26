// 179. Largest Number
// Given a list of non-negative integers nums, arrange them such that they form the largest number and return it.
// Since the result may be very large, so you need to return a string instead of an integer.


// Solution: Greedy w/ Sorting

// Greedy logic: e.g: 3 > 2 and 3 > 30.
// 3 > 30 because 330 > 303.
// 3 > 2 because 32 > 23.

// Compare a and b by b+a < a+b.

// Time Complexity: O(n log(n)) 72ms
// Space Complexity: O(n) 40.7MB
var largestNumber = function(nums) {
  let allZeros = true;
  for (var i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) allZeros = false;
    nums[i] = nums[i].toString();
  }
  
  nums.sort((a, b) => {
    let ab = a + b, ba = b + a;
    return ba < ab ? -1 : 1;
  });
  
  let res = "";
  if (allZeros) return "0";
  for (var num of nums) res += num;
  return res;
};

// Two test cases to run function on
console.log(largestNumber([10,2])) // "210"
console.log(largestNumber([3,30,34,5,9])) // "9534330"