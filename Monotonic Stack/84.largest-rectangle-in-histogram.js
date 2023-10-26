// 84. Largest Rectangle in Histogram
// Given an array of integers heights representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.


// Solution: Monotonic Increasing Stack

// Keep a monotonic increasing stack -> keep the indices so that we can calculate the width.
// Put in a -1 in the stack.
// While the last item in the stack is bigger than the current height (i = current index)
  // pop them out and calculate the area.
  // height: heights[stack.pop()]
  // width: i - last index in stack - 1 (we don't include the current item)
  // update ans to Math.max(ans, width * height)
// Push in the current index

// Time Complexity: O(n) 108ms
// Space Complexity: O(n) 50.2MB
var largestRectangleArea = function(heights) {
  let stack = [-1];
  heights.push(0);
  let ans = 0, n = heights.length;
  for (var i = 0; i < n; i++) {
    while (stack.length > 1 && heights[stack[stack.length - 1]] > heights[i]) {
      let height = heights[stack.pop()]; 
      let width = i - stack[stack.length - 1] - 1;
      ans = Math.max(ans, width * height);
    }
    stack.push(i);
  }
  return ans;
};

// Three test cases to run function on
console.log(largestRectangleArea([2,1,5,6,2,3])) // 10
console.log(largestRectangleArea([2,4])) // 4
console.log(largestRectangleArea([2,1,2])) // 3