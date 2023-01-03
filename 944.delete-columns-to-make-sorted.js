// 944. Delete Columns to Make Sorted
// You are given an array of n strings strs, all of the same length.
// The strings can be arranged such that there is one on each line, making a grid. 
// You want to delete the columns that are not sorted lexicographically. 
// Return the number of columns that you will delete.


// Solution: Column by Column

// If any character is smaller than the one directly above it, the column is not sorted.
// Go through each column and count the number of columns that are not sorted.

// m = number of rows, n = number of columns
// Time Complexity: O(nm) 127ms
// Space Complexity: O(1) 46MB
var minDeletionSize = function(strs) {
  let m = strs.length, n = strs[0].length;
  let toDelete = 0;
  for (let j = 0; j < n; j++) {
    let isSorted = true;
    for (let i = 1; i < m; i++) {
      if (strs[i][j] < strs[i - 1][j]) {
        isSorted = false;
        break;
      }
    }
    if (!isSorted) toDelete++;
  }
  return toDelete;
};

// Three test cases
console.log(minDeletionSize(["cba","daf","ghi"])) // 1
console.log(minDeletionSize(["a","b"])) // 0
console.log(minDeletionSize(["zyx","wvu","tsr"])) // 3