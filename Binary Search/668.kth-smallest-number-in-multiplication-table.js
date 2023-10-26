// 668. Kth Smallest Number in Multiplication Table


// Solution: Binary Search

// Binary Search for the number where there are more than or equal to k numbers smaller than it.
// Create a function 'enough' that returns the count of numbers that are smaller than or equal to it.


// enough: (x)
// for each row (1-indexed), add Math.min(Math.floor(x / i), n)

// x / i means:
  // there are x / i numbers smaller than or equal to x on row i
  // for e.g: [1,2,3]
  //          [2,4,6]
  //          [3,6,9]
  // if x is 3
  // row 1: [1,2,3] -> x / i (3 / 1) : there are 3 numbers smaller than or equal to 3
  // row 2: [2,4,6] -> x / i (3 / 2) : there is 1 number smaller than or equal to 3
  // row 3: [3,6,9] -> x / i (3 / 3) : there is 1 number smaller than or equal to 3
  // count = 3 + 1 + 1 = 5 (1,2,3,2,3)

// We take the smaller of x / i or n because in some cases, x / i could be bigger than the length of the row, so we just take the length of the row.

var findKthNumber = function(m, n, k) {
  function enough(x) {
    let count = 0;
    for (var i = 1; i <= m; i++) {
      count += Math.min(Math.floor(x / i), n);
    }
    return count;
  }  
  let low = 1, high = m * n;
  while (low < high) {
    let mid = Math.floor((low + high) / 2);
    if (enough(mid) < k) low = mid + 1;
    else high = mid;
  }
  return low;
};

// Two test cases to run function on
console.log(findKthNumber(3,3,5)) // 3
console.log(findKthNumber(2,3,6)) // 6