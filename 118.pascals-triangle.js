// 118. Pascal's Triangle
// Given an integer numRows, return the first numRows of Pascal's triangle.
// In Pascal's triangle, each number is the sum of the two numbers directly above it as shown:


// Solution: Dynamic Programming

// Each row will have two 1's on the outside, and the rest is each the sum of adjacent numbers of the previous row.

// Time Complexity: O(n^2) 72ms
// Space Complexity: O(n) (not including output) 38.9MB 
var generate = function(numRows) {
  let res = [[1]];
  for (var i = 1; i < numRows; i++) {
    let row = [1], prevRow = res[i - 1];
    for (var j = 0; j < prevRow.length - 1; j++) {
      row.push(prevRow[j] + prevRow[j + 1]);
    }
    row.push(1);
    res.push(row);
  }
  return res;
};

// Two test cases to run function on
console.log(generate(5)) // [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]
console.log(generate(1)) // [[1]]