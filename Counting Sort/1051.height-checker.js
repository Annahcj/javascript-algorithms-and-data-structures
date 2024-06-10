// 1051. Height Checker
// A school is trying to take an annual photo of all the students. The students are asked to stand in a single file line in non-decreasing order by height. Let this ordering be represented by the integer array expected where expected[i] is the expected height of the ith student in line.
// You are given an integer array heights representing the current order that the students are standing in. Each heights[i] is the height of the ith student in line (0-indexed).
// Return the number of indices where heights[i] != expected[i].


// Solution: Counting Sort

// Since the maximum heights[i] is 100, we can use counting sort to bring the time complexity down to O(n + m).

// n = length of heights, m = max(heights[i])
// Time Complexity: O(n + m) 57ms
// Space Complexity: O(m) 48.7MB
const heightChecker = (heights) => {
  const maxHeight = Math.max(...heights);
  const count = Array(maxHeight + 1).fill(0);
  for (let height of heights) {
    count[height]++;
  }
  let height = 1, unexpectedHeights = 0;
  for (let i = 0; i < heights.length; i++) {
    while (count[height] === 0) height++;
    if (heights[i] !== height) unexpectedHeights++;
    count[height]--;
  }
  return unexpectedHeights;
};

// Three test cases
console.log(heightChecker([1,1,4,2,1,3])) // 3
console.log(heightChecker([5,1,2,3,4])) // 5
console.log(heightChecker([1,2,3,4,5])) // 0