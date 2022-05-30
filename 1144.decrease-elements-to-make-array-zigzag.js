// 1144. Decrease Elements To Make Array Zigzag
// Given an array nums of integers, a move consists of choosing any element and decreasing it by 1.
// An array A is a zigzag array if either:
  // Every even-indexed element is greater than adjacent elements, ie. A[0] > A[1] < A[2] > A[3] < A[4] > ...
  // OR, every odd-indexed element is greater than adjacent elements, ie. A[0] < A[1] > A[2] < A[3] > A[4] < ...
// Return the minimum number of moves to transform the given array nums into a zigzag array.


// Solution: Greedy

// In the case of:
  // Every even-indexed element is greater than adjacent elements -> make every odd-indexed element smaller than its adjacent numbers
  // Every odd-indexed element is greater than adjacent elements -> make every even-indexed element smaller than its adjacent numbers
// Get the minimum number of moves out of these two cases.

// Proof: 
// e.g: [1,2,3,4]
// Case 1: Decrease odd-indexed elements. So we change 3 to 1 -> [1,2,1,4]
  // If we decrease 2 or 4, we now have to decrease the odd-indexed elements further, so there is no point.
// Case 2: Decrease even-indexed elements. Change 2 to 0 and change 4 to 2 -> [1,0,3,2]
  // Again, if we decrease 1 or 3, we have to decrease the even-indexed elements even further.
// The best out of these two cases is case 1, with 2 moves (change 3 to 1).

// Solution credit: Lee215

// Time Complexity: O(n) 105ms
// Space Complexity: O(1) 41.8MB
var movesToMakeZigzag = function(nums) {
  let res = Array(2).fill(0), n = nums.length;
  for (let i = 0; i < n; i++) {
    let left = i === 0 ? Infinity : nums[i - 1];
    let right = i === n - 1 ? Infinity : nums[i + 1];
    let moves = Math.max(0, nums[i] - Math.min(left, right) + 1);
    res[i % 2] += moves;
  }
  return Math.min(res[0], res[1]);
};

// Two test cases to run function on
console.log(movesToMakeZigzag([1,2,3])) // 2
console.log(movesToMakeZigzag([9,6,1,6,2])) // 4