// 1944. Number of Visible People in a Queue
// There are n people standing in a queue, and they numbered from 0 to n - 1 in left to right order. You are given an array heights of distinct integers where heights[i] represents the height of the ith person.
// A person can see another person to their right in the queue if everybody in between is shorter than both of them. More formally, the ith person can see the jth person if i < j and min(heights[i], heights[j]) > max(heights[i+1], heights[i+2], ..., heights[j-1]).
// Return an array answer of length n where answer[i] is the number of people the ith person can see to their right in the queue.


// Solution: Monotonic Decreasing Stack

// Traverse heights from right-left (pointer = i) *
  // keep track of count of popped elements, save heights[i] in variable height (we will be modifying heights)
  // Loop while stack is not empty AND last element of stack is smaller than height **
    // Pop from the stack
    // Increment count
  // **
  // set heights[i] to count + (if stack is not empty, 1, otherwise 0)
  // Push height into stack
// *
// return heights.

// Time Complexity: O(n) 228ms
// Space Complexity: O(n) 60.4MB
var canSeePersonsCount = function(heights) {
  let stack = [];
  for (let i = heights.length - 1; i >= 0; i--) {
    let count = 0, height = heights[i];
    while (stack.length && stack[stack.length - 1] < height) {
      stack.pop();
      count++;
    }
    heights[i] = count + (stack.length ? 1 : 0);
    stack.push(height);
  }
  return heights;
};

// Two test cases
console.log(canSeePersonsCount([10,6,8,5,11,9])) // [3,1,2,1,1,0]
console.log(canSeePersonsCount([5,1,2,3,10])) // [4,1,1,1,0]