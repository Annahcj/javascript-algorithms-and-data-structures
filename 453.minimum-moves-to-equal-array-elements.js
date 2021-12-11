// 453. Minimum Moves to Equal Array Elements
// Given an integer array nums of size n, return the minimum number of moves required to make all array elements equal.
// In one move, you can increment n - 1 elements of the array by 1.


// Solution: Math Logic

// Incrementing all elements (except the max) by 1 is equivalent to decreasing the max element by 1.
// It is equivalent because of the difference between numbers.
// If every element (except the max) increases by 1, that means the max element is the only element that doesn't change.
// Whether we increment n - 1 numbers or decrement 1 number is the same.

// With that being said, we can now focus on the decrementing part.
// Using a greedy approach, we can take the minimum number and find the number of moves to change all numbers to the minimum number.

// Time Complexity: O(n) 88ms
// Space Complexity: O(1) 42.8MB
var minMoves = function(nums) {
  let min = Infinity;
  for (var num of nums) min = Math.min(min, num);
  let ans = 0;
  for (var num of nums) ans += num - min;
  return ans;  
};

// Two test cases to run function on
console.log(minMoves([1,2,3])) // 3
console.log(minMoves([1,1,1])) // 0