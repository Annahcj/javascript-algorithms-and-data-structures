// 1889. Minimum Space Wasted From Packaging
// You have n packages that you are trying to place in boxes, one package in each box. There are m suppliers that each produce boxes of different sizes (with infinite supply). A package can be placed in a box if the size of the package is less than or equal to the size of the box.
// The package sizes are given as an integer array packages, where packages[i] is the size of the ith package. The suppliers are given as a 2D integer array boxes, where boxes[j] is an array of box sizes that the jth supplier produces.
// You want to choose a single supplier and use boxes from them such that the total wasted space is minimized. For each package in a box, we define the space wasted to be size of the box - size of the package. The total wasted space is the sum of the space wasted in all the boxes.
  // For example, if you have to fit packages with sizes [2,3,5] and the supplier offers boxes of sizes [4,8], you can fit the packages of size-2 and size-3 into two boxes of size-4 and the package with size-5 into a box of size-8. This would result in a waste of (4-2) + (4-3) + (8-5) = 6.
// Return the minimum total wasted space by choosing the box supplier optimally, or -1 if it is impossible to fit all the packages inside boxes. Since the answer may be large, return it modulo 10^9 + 7.


// Solution: Sorting, Binary Search & Prefix Sum

// Sort packages in asc order.
// Sort each boxes[i] in asc order.
// For each boxes[i][j], 
  // binary search through packages for the largest index where packages[i] <= boxes[i][j]
  // the space wasted = box size * current number of packages - sum of current packages (current packages = the packages between prevIndex and nextIndex)
  // to get the sum of the current packages, use prefix sum for efficient querying of subarray sums.

// n = number of packages, m = total number of boxes
// Time Complexity: O(n log(n) + m log(m) + m log(n)) 793ms
// Space Complexity: O(n) 91.6MB
var minWastedSpace = function(packages, boxes) {
  packages.sort((a, b) => a - b);
  let n = packages.length, m = boxes.length;
  let packagePrefixSum = [...packages];
  for (let i = 1; i < n; i++) {
    packagePrefixSum[i] += packagePrefixSum[i - 1];
  }
  
  let minSpaceWasted = Infinity, MOD = 10 ** 9 + 7;
  for (let i = 0; i < m; i++) {
    boxes[i].sort((a, b) => a - b);
    let prevIndex = 0, spaceWasted = 0, canFit = false;
    for (let size of boxes[i]) {
      let nextIndex = getNextIndex(size);
      let packageSum = getPackageSum(prevIndex, nextIndex);
      let boxSizeSum = size * (nextIndex - prevIndex + 1);
      spaceWasted += boxSizeSum - packageSum;
      if (nextIndex === n - 1) {
        canFit = true;
        break;
      }
      prevIndex = nextIndex + 1;
    }
    if (canFit) {
      minSpaceWasted = Math.min(minSpaceWasted, spaceWasted);
    }
  }
  return minSpaceWasted === Infinity ? -1 : minSpaceWasted % MOD;
  
  function getPackageSum(i, j) { // get prefix sum of packages from index i to j inclusive
    if (j === -1) return 0;
    return i === 0 ? packagePrefixSum[j] : packagePrefixSum[j] - packagePrefixSum[i - 1];
  }
  
  function getNextIndex(size) {
    let low = 0, high = n - 1;
    while (low < high) {
      let mid = Math.ceil((low + high) / 2);
      if (packages[mid] <= size) low = mid;
      else high = mid - 1;
    }
    return packages[low] <= size ? low : -1;
  }
};

// Three test cases
console.log(minWastedSpace([2,3,5], [[4,8],[2,8]])) // 6
console.log(minWastedSpace([2,3,5], [[1,4],[2,3],[3,4]])) // -1
console.log(minWastedSpace([3,5,8,10,11,12], [[12],[11,9],[10,5,14]])) // 9