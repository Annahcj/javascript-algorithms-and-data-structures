// 2033. Minimum Operations to Make a Uni-Value Grid
// You are given a 2D integer grid of size m x n and an integer x. In one operation, you can add x to or subtract x from any element in the grid.
// A uni-value grid is a grid where all the elements of it are equal.
// Return the minimum number of operations to make the grid uni-value. If it is not possible, return -1.


// Solution: Sort & Find Median

// 1. Take all the numbers out of the grid and put them in an array 'arr'
// 2. Sort arr in asc order
// 3. Filter -> if diff of two adjacent numbers are not divisible by x, return -1
// 4. Find the median -> 
  // a. even length of arr -> find both lower median (Math.floor(arr.length / 2) - 1) and higher median (Math.floor(arr.length / 2)), and take the one with smaller amount of moves.
  // b. odd length of arr -> only one median (Math.floor(arr.length / 2)): get the number of moves to turn all nums in arr

var minOperations = function(grid, x) {
  let arr = [];
  for (var i = 0; i < grid.length; i++) {
    for (var j = 0; j < grid[0].length; j++) {
      arr.push(grid[i][j]);
    }
  }  
  arr = arr.sort((a, b) => a - b);
  for (var i = 1; i < arr.length; i++) {
    let diff = arr[i] - arr[i - 1];
    if (diff % x !== 0) return -1;
  }
  function getDiff(median) {
    let ans = 0;
    for (var num of arr) {
      let diff = Math.abs(num - median);
      ans += diff / x;
    }
    return ans;
  }
  let n = arr.length;
  if (n % 2 === 0) {
    // check both lower median and higher median
    let lIdx = Math.floor(arr.length / 2) - 1;
    let rIdx = lIdx + 1;

    let lAns = getDiff(arr[lIdx]);
    let rAns = getDiff(arr[rIdx]);
    return Math.min(lAns, rAns);
  } else {
    // check just the one median
    let mIdx = Math.floor(arr.length / 2);
    return getDiff(arr[mIdx]);
  }
};

// Three test cases to run function on
console.log(minOperations([[2,4],[6,8]], 2)) // 4
console.log(minOperations([[1,5],[2,3]], 1)) // 5
console.log(minOperations([[1,2],[3,4]], 2)) // -1