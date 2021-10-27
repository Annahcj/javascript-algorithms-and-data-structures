// 75. Sort Colors
// Given an array nums with n objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue.
// We will use the integers 0, 1, and 2 to represent the color red, white, and blue, respectively.
// You must solve this problem without using the library's sort function.


// Solution 1: Counting Sort

// Keep count of the number of 0's, 1's and 2's.
// Loop through the counts of 0, 1, and 2 and replace each individual number.

// Time Complexity: O(n) 76ms
// Space Complexity: O(1) 38.9MB
var sortColors = function(nums) {
  let count = Array(3).fill(0);
  for (var num of nums) {
    count[num]++;
  }
  let idx = 0;
  for (var i = 0; i <= 2; i++) { 
    for (var j = 0; j < count[i]; j++) {
      nums[idx] = i;
      idx++;
    }
  }
  return nums;
};

// Solution 2: Dutch National Flag 

// Two pointers -> 
  // p0 -> last position of 0 (closest to curr)
  // p2 -> last position of 2 (closest to curr)
// increment curr pointer ->
  // if curr is 0,
    // swap curr and p0 (now that we know that p0 is 0, we can increment p0)
    // increment curr also
  // if curr is 2,
    // swap curr and p2 (we know p2 is 2 now, so decrement p2)
    // (curr could be 0 or 2 so we don't increment)
  // if curr is 1, increment curr

// Time Complexity: O(n) 72ms
// Space Complexity: O(1) 38.9MB
var sortColors = function(nums) {
  let p0 = 0, p2 = nums.length - 1;
  let curr = 0;
  while (curr <= p2) {
    console.log(nums[curr])
    if (nums[curr] === 0) {
      swap(curr++, p0++);
    } else if (nums[curr] === 2) {
      swap(curr, p2--);
    } else curr++;
  }
  return nums;
  function swap(idx1, idx2) {
    let temp = nums[idx1];
    nums[idx1] = nums[idx2];
    nums[idx2] = temp;
  }
};

// Three test cases to run function on
console.log(sortColors([1,2,0])) // [0,1,2]
console.log(sortColors([2,0,2,1,1,0])) // [0,0,1,1,2,2]
console.log(sortColors([2,0,1])) // [0,1,2]