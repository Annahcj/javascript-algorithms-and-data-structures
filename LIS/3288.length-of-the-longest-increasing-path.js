// 3288.length-of-the-longest-increasing-path.js
// 3288. Length of the Longest Increasing Path
// You are given a 2D array of integers coordinates of length n and an integer k, where 0 <= k < n.
// coordinates[i] = [x[i], y[i]] indicates the point (x[i], y[i]) in a 2D plane.
// An increasing path of length m is defined as a list of points (x1, y1), (x2, y2), (x3, y3), ..., (xm, ym) such that:
  // x[i] < x[i] + 1 and y[i] < y[i] + 1 for all i where 1 <= i < m.
  // (x[i], y[i]) is in the given coordinates for all i where 1 <= i <= m.
// Return the maximum length of an increasing path that contains coordinates[k].


// Solution: LIS w/ Binary Search

// LIS w/ binary search to find the longest increasing path starting from coordinate k, from left-to-right.
// Do the same from right-to-left starting from coordinate k, but this time to find the longest decreasing path.
// Sort coordinates by x to eliminate one dimension.

// LIS w/ binary search:
  // Keep track of the current longest increasing subsequence of coordinates.
  // For every coordinates[i], binary search for the rightmost position in the sequence where coordinates[i] is larger in both x and y.
  // Then, decide whether we should replace seq[binary searched index + 1] with coordinates[i], by checking if coordinates[i]'s y is smaller.
    // We don't need to check if x is smaller because it's already guaranteed to be smaller or equal, due to the sorting.
    // It's optimal to replace it with a smaller coordinate as that gives more chance of the sequence being extended.
  // Note that the actual sequence may not be valid, but this solution does give the accurate longest increasing subsequence length.

// Example:
  // e.g. sequence = [2,1],[3,3],[4,8]. remaining coords = [[5,2],[6,3],[7,4]]
  // [5,2]: Replace [3,3] with [5,2] since it has a smaller y. 
    // sequence = [2,1],[5,2],[4,8] - now this sequence may seem invalid, but the length is accurate. 
      // It's valid because for every sequence[i], we know there is a valid sequence up to that point, because we can only append if it's larger.
      // We can still append something behind [4,8] because we know there has been a valid sequence of length 3 up to that point.
  // [6,3]: Replace [4,8] with [6,3]. 
    // sequence = [2,1],[5,2],[6,3].
  // [7,4]: Append [7,4] to the end.
    // sequence = [2,1],[5,2],[6,3],[7,4].

// Why we need to sort by x in asc order, then y in desc order:
  // e.g. [4,8],[5,9],[5,3]
  // Sequence = [4,8]. 
  // If we process [5,9] before [5,3], we will append [5,9] to the sequence, making it [4,8],[5,9].
  // However, if we processed [5,3] first, it would have replaced [4,8] with [5,3], then we can't append [5,9] because it's larger.
  // Hence, it's optimal to process those with a larger y first, then try to optimize it by replacing with a smaller y.

// Time Complexity: O(n log(n)) 105ms
// Space Complexity: O(n) 84.83MB
function maxPathLength(coordinates, k) {
  const coordinateK = coordinates[k];
  coordinates.sort((a, b) => a[0] !== b[0] ? a[0] - b[0] : b[1] - a[1]);
  const startIndex = coordinates.indexOf(coordinateK);
  const rightSeq = [coordinateK], n = coordinates.length;
  for (let i = startIndex + 1; i < n; i++) {
    const [x, y] = coordinates[i];
    let low = 0, high = rightSeq.length - 1;
    while (low < high) {
      let mid = Math.ceil((low + high) / 2);
      if (x > rightSeq[mid][0] && y > rightSeq[mid][1]) {
        low = mid;
      } else {
        high = mid - 1;
      }
    }
    if (x <= rightSeq[low][0] || y <= rightSeq[low][1]) continue;
    // only add to the sequence if this coordinate is smaller overall - since x is already sorted, we only need to check that y is smaller.
    if (low === rightSeq.length - 1 || y < rightSeq[low + 1][1]) {
      rightSeq[low + 1] = coordinates[i];
    }
  }
  const leftSeq = [coordinateK];
  for (let i = startIndex - 1; i >= 0; i--) {
    const [x, y] = coordinates[i];
    let low = 0, high = leftSeq.length - 1;
    while (low < high) {
      let mid = Math.ceil((low + high) / 2);
      if (x < leftSeq[mid][0] && y < leftSeq[mid][1]) {
        low = mid;
      } else {
        high = mid - 1;
      }
    }
    if (x >= leftSeq[low][0] || y >= leftSeq[low][1]) continue;
    if (low === leftSeq.length - 1 || y > leftSeq[low + 1][1]) {
      leftSeq[low + 1] = coordinates[i];
    }
  }
  return leftSeq.length + rightSeq.length - 1;
};

// Two test cases
console.log(maxPathLength([[3,1],[2,2],[4,1],[0,0],[5,3]], 1)) // 3
console.log(maxPathLength([[2,1],[7,0],[5,6]], 2)) // 2