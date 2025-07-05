// 1394. Find Lucky Integer in an Array
// Given an array of integers arr, a lucky integer is an integer that has a frequency in the array equal to its value.
// Return the largest lucky integer in the array. If there is no lucky integer return -1.


// Solution: Counting

// Count the occurrances of each number and store it in a hashmap.
// Go through each entry in the hashmap and record the maximum number which is equal to its frequency.

// Time Complexity: O(n) 1ms
// Space Complexity: O(n) 56MB
function findLucky(arr) {
  const count = {};
  for (let num of arr) {
    count[num] = (count[num] || 0) + 1;
  }
  let max = -1;
  for (let num in count) {
    if (num == count[num]) {
      max = Math.max(max, Number(num));
    }
  }
  return max;
};

// Two test cases
console.log(findLucky([2,2,3,4])) // 2
console.log(findLucky([1,2,2,3,3,3])) // 3