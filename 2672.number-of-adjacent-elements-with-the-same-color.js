// 2672. Number of Adjacent Elements With the Same Color
// There is a 0-indexed array nums of length n. Initially, all elements are uncolored (has a value of 0).
// You are given a 2D integer array queries where queries[i] = [indexi, colori].
// For each query, you color the index indexi with the color colori in the array nums.
// Return an array answer of the same length as queries where answer[i] is the number of adjacent elements with the same color after the ith query.
// More formally, answer[i] is the number of indices j, such that 0 <= j < n - 1 and nums[j] == nums[j + 1] and nums[j] != 0 after the ith query.


// Solution: Counting

// Keep track of the colors array and the running count of adjacent colors.
// When we change a color, check the colors on the left and right:
  // subtract from the count if the colors were the same (except if they are uncolored)
  // add to the count if the new color is the same

// m = number of queries
// Time Complexity: O(n + m) 342ms
// Space Complexity: O(n + m) 108.2MB
var colorTheArray = function(n, queries) {
  let colors = Array(n).fill(0), ans = [], count = 0;
  for (let [index, color] of queries) {
    if (index > 0 && colors[index - 1] > 0 && colors[index - 1] === colors[index]) count--;
    if (index > 0 && color === colors[index - 1]) count++;
    if (index < n - 1 && colors[index + 1] > 0 && colors[index] === colors[index + 1]) count--;
    if (index < n - 1 && color === colors[index + 1]) count++;
    colors[index] = color;
    ans.push(count);
  }
  return ans;
};

// Two test cases
console.log(colorTheArray(4, [[0,2],[1,2],[3,1],[1,1],[2,1]])) // [0,1,1,0,2]
console.log(colorTheArray(1, [[0,100000]])) // [0]