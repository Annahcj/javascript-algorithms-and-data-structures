// 2216. Minimum Deletions to Make Array Beautiful
// You are given a 0-indexed integer array nums. The array nums is beautiful if:
  // nums.length is even.
  // nums[i] != nums[i + 1] for all i % 2 == 0.
// Note that an empty array is considered beautiful.
// You can delete any number of elements from nums. When you delete an element, all the elements to the right of the deleted element will be shifted one unit to the left to fill the gap created and all the elements to the left of the deleted element will remain unchanged.
// Return the minimum number of elements to delete from nums to make it beautiful.


// Solution: Greedy w/ Stack

// Proof: We can delete elements in a left-to-right order because we only care if nums[i] != nums[i + 1].
  // Deleting an element elsewhere will not affect the result.

// When the current length of the stack is odd, that means nums[i] will have an odd index.
  // If nums[i] is equal to the element before it, pop it out of the stack.
// Edge case: Since the array length must be even, if the length of the stack is odd at the end, pop out the last character.

// Time Complexity: O(n) 165ms
// Space Complexity: O(n) 59.7MB
var minDeletion = function(nums) {
  let stack = [], n = nums.length;
  for (let i = 0; i < n; i++) {
    if (stack.length % 2 === 1) {
      if (stack[stack.length - 1] === nums[i]) stack.pop();
    } 
    stack.push(nums[i]);
  }
  if (stack.length % 2 === 1) stack.pop();
  return n - stack.length;
};

// Two test cases
console.log(minDeletion([1,1,2,3,5])) // 1
console.log(minDeletion([1,1,2,2,3,3])) // 2