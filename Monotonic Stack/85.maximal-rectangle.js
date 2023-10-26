// 85. Maximal Rectangle
// Given a rows x cols binary matrix filled with 0's and 1's, find the largest rectangle containing only 1's and return its area.


// Solution: Monotonic Increasing Stack

// For each row, get the number of consecutive 1's in each column up to the current row.
// For e.g: [
//   ["1","0","1","0","0"],
//   ["1","0","1","1","1"],
//   ["1","1","1","1","1"],
//   ["1","0","0","1","0"]
// ]
// Row 1: [1,0,1,0,0]
// Row 2: [2,0,2,1,1]
// Row 3: [3,1,3,2,2]
// Row 4: [4,0,0,3,0]

// Find the row with the maximum area and return that area.

// Time Complexity: O(nm) 96ms
// Space Complexity: O(m) 41.6MB
var maximalRectangle = function(matrix) {
  if (!matrix.length) return 0;
  let n = matrix.length, m = matrix[0].length;
  let row = Array(m).fill(0), ans = 0;
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < m; j++) {
      if (matrix[i][j] === '1') row[j] += 1;
      else row[j] = 0;
    }
    ans = Math.max(ans, maxArea(row));
  }  
  return ans;

  function maxArea(arr) {
    let stack = [-1];
    let ans = 0;
    for (var i = 0; i < m; i++) {
      while (stack.length > 1 && arr[stack[stack.length - 1]] > arr[i]) { // pop out all elements larger than arr[i]
        let height = arr[stack.pop()];
        let width = i - stack[stack.length - 1] - 1; // width: current index - last index in stack - 1 (not including current element)
        ans = Math.max(ans, height * width);
      }
      stack.push(i);
    }
    while (stack.length > 1) { // for elements still in the stack
      let height = arr[stack.pop()];
      let width = m - stack[stack.length - 1] - 1; // width: length of arr - last index in stack - 1
      ans = Math.max(ans, height * width);
    }
    return ans;
  }
};

// Two test cases to run function on
console.log(maximalRectangle([["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]])) // 6
console.log(maximalRectangle([])) // 0