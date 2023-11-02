// 995. Minimum Number of K Consecutive Bit Flips
// You are given a binary array nums and an integer k.
// A k-bit flip is choosing a subarray of length k from nums and simultaneously changing every 0 in the subarray to 1, and every 1 in the subarray to 0.
// Return the minimum number of k-bit flips required so that there is no 0 in the array. If it is not possible, return -1.


// Solution 1: Brute Force [TLE]

// Loop through nums
  // if nums[i] is 0, flip all bits in the range of i, i + k - 1 (inclusive). If i + k - 1 is out of bounds, return -1 (impossible to turn all into 1's)

// Time Complexity: O(nk)
// Space Complexity: O(1)
var minKBitFlips = function(nums, k) {
  let n = nums.length, flips = 0;
  for (let i = 0; i < n; i++) {
    if (nums[i] !== 1) {
      if (i + k - 1 >= n) return -1;
      for (let j = i; j < i + k; j++) nums[j] = nums[j] === 0 ? 1 : 0;
      flips++;
    }
  }  
  return flips;
};

// Solution 2: Queue

// Instead of physically flipping the bits, we keep the indexes of the end of each flip-range in a queue.
// The length of the queue is the number of flips we have made for nums[i].
// Remove any indexes that have moved out of range.

// e.g: [0,0,1], k = 2
// i = 0: nums[i] is 0, and the length of queue is 0, so increment count and push i + k - 1 (1) to the queue.
// (count = 1, queue = [1])
// i = 1: nums[i] is 0, and the length of queue is 1 (since they are not equal, the bit is actually 1). queue[0] is equal to i, so we remove it from the queue.
// (count = 1, queue = [])
// i = 2: nums[i] is 1, and the length of queue is 0 (since they are not equal, the bit is 1). 

// count = 1, queue = [].
// since the queue is empty (meaning there are no out-of-range flips), return count, otherwise return -1.

// Time Complexity: O(n) 512ms
// Space Complexity: O(k) 52.7MB
var minKBitFlips = function(nums, k) {
  let n = nums.length, count = 0, queue = [];
  for (let i = 0; i < n; i++) {
    let flips = queue.length % 2;
    if (nums[i] === flips) {
      count++;
      queue.push(i + k - 1);
    }
    while (queue.length && queue[0] <= i) queue.shift();
  }
  return queue.length ? -1 : count;
};

// Three test cases 
console.log(minKBitFlips([0,1,0], 1)) // 2
console.log(minKBitFlips([1,1,0], 2)) // -1
console.log(minKBitFlips([0,0,0,1,0,1,1,0], 3)) // 3