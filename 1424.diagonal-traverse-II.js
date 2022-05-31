// 1424. Diagonal Traverse II
// Given a 2D integer array nums, return all elements of nums in diagonal order as shown in the below images.


// Solution 1: Sort by Row + Column

// Cells along the same diagonal line all share the same (row + column) value.
// We can sort the cells by (row + column), then in descending order of the row if there is a tie.

// n = number of cells in nums
// Time Complexity: O(n log(n)) 314ms
// Space Complexity: O(n) 89.9MB
var findDiagonalOrder = function(nums) {
  let vals = []; // [row, diagonal value, actual value]
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums[i].length; j++) {
      vals.push([i, i + j, nums[i][j]]);
    }
  }
  vals.sort((a, b) => {
    if (a[1] === b[1]) return b[0] - a[0];
    return a[1] - b[1];
  })
  return vals.map(val => val[2]);
};

// Solution 2: Hashmap

// Since we know there are a limited amount of (row + column) values, we can use a counting sort like approach.
// Store the cell values in arrays in a hashmap, where the keys are the (row + column) values.
  // { 0: [val, val, ...], 1: [val, val, ...], ... }
// Since they needed to be sorted in decreasing order of the row number, we can traverse the rows backwards.

// Time Complexity: O(n) 385ms
// Space Complexity: O(n) 84.7MB
var findDiagonalOrder = function(nums) {
  let map = new Map(), max = 0;
  for (let i = nums.length - 1; i >= 0; i--) {
    for (let j = 0; j < nums[i].length; j++) {
      if (!map.has(i + j)) map.set(i + j, []);
      map.get(i + j).push(nums[i][j]);
      max = Math.max(max, i + j);
    }
  }
  let res = [];
  for (let i = 0; i <= max; i++) {
    if (map.has(i)) res.push(...map.get(i));
  }
  return res;
};


// Two test cases to run function on
console.log(findDiagonalOrder([[1,2,3],[4,5,6],[7,8,9]])) // [1,4,2,7,5,3,8,6,9]
console.log(findDiagonalOrder([[1,2,3,4,5],[6,7],[8],[9,10,11],[12,13,14,15,16]])) // [1,6,2,8,7,3,9,4,12,10,5,13,11,14,15,16]