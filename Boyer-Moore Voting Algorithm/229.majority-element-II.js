// 229. Majority Element II
// Given an integer array of size n, find all elements that appear more than ⌊ n/3 ⌋ times.


// Solution 1: Sorting

// 1. Sort nums
// 2. For each number, check whether the ith number is equal to the number at index i - majority. 
  // If it is, push it into res.
  // Skip over duplicates

// Time Complexity: O(n log(n)) 73ms
// Space Complexity: O(log(n)) (space for sorting) 45.1MB
var majorityElement = function(nums) {
  let n = nums.length, majority = Math.floor(n / 3), res = [];
  nums.sort((a, b) => a - b);
  
  let i = majority;
  while (i < n) {
    if (nums[i] === nums[i - majority]) {
      res.push(nums[i]);
      let num = nums[i];
      while (i < n && nums[i] === num) i++; // skip over duplicates
    } else {
      i++;
    }
  }
  return res;
};

// Solution 2: Map & Set

// Use a map to count the frequency of each number.
// Use a set to collect the unique majority elements.

// Time Complexity: O(n) 76ms
// Space Complexity: O(n) 45.1MB
var majorityElement = function(nums) {
  let n = nums.length, majority = Math.floor(n / 3), res = [];
  let map = new Map();
  for (let num of nums) {
    map.set(num, (map.get(num) || 0) + 1);
    if (map.get(num) > majority) res.add(num);
  }
  return [...res];
};


// Solution 3: Boyer Moore Voting Algorithm

// There is a maximum of 2 elements with a count > majority.
// The idea of the algorithm is for elements to cancel each other out.

// 1. Find majority elements
// 2. Verify the majority elements (check whether they really occur more than n / 3 times)

// Time Complexity: O(n) 100ms
// Space Complexity: O(1) 44.8MB
var majorityElement = function(nums) {
  let num1 = null, num2 = null;
  let cnt1 = 0, cnt2 = 0;
  for (let num of nums) {
    if (num === num1) cnt1++;
    else if (num === num2) cnt2++;
    else if (cnt1 === 0 && num2 !== num) {
      num1 = num;
      cnt1 = 1;
    } else if (cnt2 === 0 && num1 !== num) {
      num2 = num;
      cnt2 = 1;
    } else {
      cnt1--, cnt2--; 
    }
  }
  
  let count1 = 0, count2 = 0;
  for (let num of nums) {
    count1 += num === num1 ? 1 : 0;
    count2 += num === num2 ? 1 : 0;
  }
  let majority = nums.length / 3, res = [];
  if (count1 > majority) res.push(num1);
  if (count2 > majority) res.push(num2);
  return res;
};

// Three test cases to run function on
console.log(majorityElement([3,2,3])) // [3]
console.log(majorityElement([1])) // [1]
console.log(majorityElement([1,2])) // [1,2]