// 1762. Buildings With an Ocean View
// There are n buildings in a line. You are given an integer array heights of size n that represents the heights of the buildings in the line.
// The ocean is to the right of the buildings. A building has an ocean view if the building can see the ocean without obstructions. Formally, a building has an ocean view if all the buildings to its right have a smaller height.
// Return a list of indices (0-indexed) of buildings that have an ocean view, sorted in increasing order.


// Solution 1: Traverse Right-Left w/ Built-In Reverse

// Loop through heights from right to left (pointer = i)
// keep track of the height of the current tallest building 
  // if heights[i] is bigger than max (tallest building) (that means the building has an ocean view)
    // push i into res
  // update max if necessary
// (use built-in reverse function) return res.reverse()

// Time Complexity: O(n) 116ms
// Space Complexity: O(1) (res is O(n)) 60.1MB
var findBuildings = function(heights) {
  let max = 0, res = [];
  for (var i = heights.length - 1; i >= 0; i--) {
    if (heights[i] > max) {
      res.push(i);
    }
    max = Math.max(max, heights[i]);
  }  
  return res.reverse();
};

// Solution 2: Traverse Right-Left w/ Two-Pointer Reverse Function

// The exact same as solution 1, except we write our own reverse function.

// reverse: (arr)
  // set two pointers i to 0, j to arr.length - 1
  // Loop while i is smaller than j
    // swap arr[i] with arr[j]
    // increment i, decrement j

// Time Complexity: O(n) 132ms
// Space Complexity: O(1) (res is O(n)) 60MB
var findBuildings = function(heights) {
  let max = 0, res = [];
  for (var i = heights.length - 1; i >= 0; i--) {
    if (heights[i] > max) {
      res.push(i);
    }
    max = Math.max(max, heights[i]);
  }  
  reverse(res);
  return res;
};
function reverse(arr) {
  let i = 0, j = arr.length - 1;
  while (i < j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
    i++, j--;
  }
}

// Solution 3: Monotonic Decreasing Stack

// Traverse heights from left-right (pointer = i)
  // pop elements off the stack until the last item of stack is bigger than heights[i] OR stack is empty
  // push i into stack
  
// Time Complexity: O(n) 124ms
// Space Complexity: O(1) (res is O(n)) 59.9MB
var findBuildings = function(heights) {
  let stack = [];
  for (var i = 0; i < heights.length; i++) {
    while (stack.length && heights[i] >= heights[stack[stack.length - 1]]) {
      stack.pop();
    }
    stack.push(i);
  }
  return stack;
};

// Two test cases to run function on
console.log(findBuildings([4,2,3,1])) // [0,2,3]
console.log(findBuildings([1,3,2,4])) // [3]