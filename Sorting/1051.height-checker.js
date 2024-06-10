// 1051. Height Checker
// A school is trying to take an annual photo of all the students. The students are asked to stand in a single file line in non-decreasing order by height. Let this ordering be represented by the integer array expected where expected[i] is the expected height of the ith student in line.
// You are given an integer array heights representing the current order that the students are standing in. Each heights[i] is the height of the ith student in line (0-indexed).
// Return the number of indices where heights[i] != expected[i].


// Solution: Sorting

// Create another array expected of heights sorted in ascending order.
// Count the number of indices where heights[i] !== expected[i].

// Time Complexity: O(n log(n)) 55ms
// Space Complexity: O(n) 49.7MB
const heightChecker = (heights) => {
  const expected = [...heights].sort((a, b) => a - b);
  return heights.reduce((sum, height, i) => sum + (height !== expected[i] ? 1 : 0), 0);
};

// Three test cases
console.log(heightChecker([1,1,4,2,1,3])) // 3
console.log(heightChecker([5,1,2,3,4])) // 5
console.log(heightChecker([1,2,3,4,5])) // 0