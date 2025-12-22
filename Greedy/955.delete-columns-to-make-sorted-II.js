// 955. Delete Columns to Make Sorted II
// You are given an array of n strings strs, all of the same length.
// We may choose any deletion indices, and we delete all the characters in those indices for each string.
// For example, if we have strs = ["abcdef","uvwxyz"] and deletion indices {0, 2, 3}, then the final array after deletions is ["bef", "vyz"].
// Suppose we chose a set of deletion indices answer such that after deletions, the final array has its elements in lexicographic order (i.e., strs[0] <= strs[1] <= strs[2] <= ... <= strs[n - 1]). Return the minimum possible value of answer.length.


// Solution: Greedy

// Deleting from the front is the priority, because it has more signifiance.
// Starting from the front, check if each string is in lexicographic order:
  // If an index i is in lexicographic order, not equal but a<b<c, then return the current answer, we don't need to remove any other indices.
  // If an index i is in lexicographic order, including equals, then record the equal indices for the next index.
    // For those indices, they must either stay equal, or can be removed if a<b. If a>b, we must remove i.
  // If an index i is not in lexicographic order, we MUST remove it.

// n = length of strs, m = length of strs[0]
// Time complexity: O(nm) 3ms
// Space Complexity: O(n) 58MB
function minDeletionSize(strs) {
  const n = strs.length, m = strs[0].length;
  let deleted = [], equal = new Set(Array(n - 1).fill(0).map((_, i) => i + 1));
  for (let j = 0; j < m; j++) {
    const equalDeleted = [];
    for (let i = 1; i < n; i++) {
      if (strs[i][j] > strs[i - 1][j]) {
        // do not remove these from the equal set immediately as we may remove this entire index
        equalDeleted.push(i);
      } else if (equal.has(i) && strs[i][j] < strs[i - 1][j]) {
        deleted.push(j);
        break;
      }
    }
    if (!deleted.length || deleted[deleted.length - 1] !== j) {
      for (let index of equalDeleted) {
        equal.delete(index);
      }
    }
    if (equal.size === 0) {
      return deleted.length;
    }
  }
  return deleted.length;
};

// Three test cases
console.log(minDeletionSize(["ca","bb","ac"])) // 1
console.log(minDeletionSize(["xc","yb","za"])) // 0
console.log(minDeletionSize(["zyx","wvu","tsr"])) // 3