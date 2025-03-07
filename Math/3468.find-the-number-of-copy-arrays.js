// 3468. Find the Number of Copy Arrays
// You are given an array original of length n and a 2D array bounds of length n x 2, where bounds[i] = [u[i], v[i]].
// You need to find the number of possible arrays copy of length n such that:
  // (copy[i] - copy[i - 1]) == (original[i] - original[i - 1]) for 1 <= i <= n - 1.
  // u[i] <= copy[i] <= v[i] for 0 <= i <= n - 1.
// Return the number of such arrays.


// Solution: Math

// Keep track of the overlapping range of numbers.

// Time Complexity: O(n) 9ms
// Space Complexity: O(1) 87.4MB
function countArrays(original, bounds) {
  const n = original.length;
  let prevRange = bounds[0];
  for (let i = 1; i < n; i++) {
    const diff = original[i] - original[i - 1];
    const overlappingRange = [Math.max(prevRange[0] + diff, bounds[i][0]), Math.min(prevRange[1] + diff, bounds[i][1])];
    if (overlappingRange[0] > overlappingRange[1]) {
      return 0;
    }
    prevRange = overlappingRange;
  }  
  return prevRange[1] - prevRange[0] + 1;
};

// Three test cases
console.log(countArrays([1,2,3,4], [[1,2],[2,3],[3,4],[4,5]])) // 2
console.log(countArrays([1,2,3,4], [[1,10],[2,9],[3,8],[4,7]])) // 4
console.log(countArrays([1,2,1,2], [[1,1],[2,3],[3,3],[2,3]])) // 0