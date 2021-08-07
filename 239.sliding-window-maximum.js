// 239. Sliding Window Maximum
// You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position.
// Return the max sliding window.


// Solution: Monotonic Queue

// We can use a decreasing monotonic queue.
// How a monotonic queue works: 
// To push in an item: pop off all items until we find an item that is smaller than the one we are inserting, then we push in the new number.
// This way, the first item in the queue is always the biggest.
// When the window moves out of range (the first item in queue is left-most in the window), we shift it off the queue.

// e.g: nums = [1,3,-1,-3,5,3,6,7], k = 3
// 0 - queue: [1], res = []
// 1 - queue: [3], res = []
// 2 - queue: [3, -1], res = [3]
// 3 - queue: [3, -1, -3], res = [3, 3]
// 4 - queue: [5], res = [3, 3, 5]
// 5 - queue: [5, 3], res = [3, 3, 5, 5]
// 6 - queue: [6], res = [3, 3, 5, 5, 6]
// 7 - queue: [7], res = [3, 3, 5, 5, 6, 7]

// Algorithm:
// Keep a queue (the monotonic queue), and an array 'res' for the results.
// Loop through nums (pointer = i)
  // Loop through the queue while the last item of the queue is smaller than nums[i]
    // Keep popping last item off queue
  // Push nums[i] into the queue.
  // Calculate the left edge of the window (i + 1 - k), save it in a variable 'idx'
  // If idx is bigger than or equal to 0 (if the window size is as least k)
    // Push the first item of the queue into res
    // If nums[idx] is equal to queue[0] (if number goes out of range of the window), shift it off the queue.
// Return res.

// Time Complexity: O(n) 1016ms
// Space Complexity: O(k) 75.3MB (monotonic queue's length will never be bigger than k)
  var maxSlidingWindow = function(nums, k) {
    let queue = [], res = [];
    for (var i = 0; i < nums.length; i++) {
      while (nums[i] > queue[queue.length - 1]) queue.pop();
      queue.push(nums[i]);
      let idx = i + 1 - k;
      if (idx >= 0) {
        res.push(queue[0]);
        if (nums[idx] === queue[0]) queue.shift();
      }
    }  
    return res;
  };
  
  // Two test cases to run function on
  console.log(maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3)) // [3,3,5,5,6,7]
  console.log(maxSlidingWindow([9, 11], 2)) // [11]