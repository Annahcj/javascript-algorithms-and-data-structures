// 2975. Maximum Square Area by Removing Fences From a Field
// There is a large (m - 1) x (n - 1) rectangular field with corners at (1, 1) and (m, n) containing some horizontal and vertical fences given in arrays hFences and vFences respectively.
// Horizontal fences are from the coordinates (hFences[i], 1) to (hFences[i], n) and vertical fences are from the coordinates (1, vFences[i]) to (m, vFences[i]).
// Return the maximum area of a square field that can be formed by removing some fences (possibly none) or -1 if it is impossible to make a square field.
// Since the answer may be large, return it modulo 10^9 + 7.
// Note: The field is surrounded by two horizontal fences from the coordinates (1, 1) to (1, n) and (m, 1) to (m, n) and two vertical fences from the coordinates (1, 1) to (m, 1) and (1, n) to (m, n). These fences cannot be removed.


// Solution: Hashsets on Fence Diffs

// Use a hashset to store the differences between each pair of horizontal fences.
// Find any common fence differences between the horizontal and vertical fences, and record the maximum such difference.

// h = length of hFences, v = length of vFences
// Time Complexity: O(h^2 + v^2) 524ms
// Space Complexity: O(h^2) 94.7MB
var maximizeSquareArea = function(m, n, hFences, vFences) {
  hFences.push(1), hFences.push(m);
  vFences.push(1), vFences.push(n);
  let hDiffs = new Set();
  for (let i = 0; i < hFences.length; i++) {
    for (let j = i + 1; j < hFences.length; j++) {
      let diff = Math.abs(hFences[i] - hFences[j]);
      hDiffs.add(diff);
    }
  }
  let maxDiff = 0;
  for (let i = 0; i < vFences.length; i++) {
    for (let j = i + 1; j < vFences.length; j++) {
      let diff = Math.abs(vFences[i] - vFences[j]);
      if (hDiffs.has(diff)) maxDiff = Math.max(maxDiff, diff);
    }
  }
  return maxDiff === 0 ? -1 : (BigInt(maxDiff) * BigInt(maxDiff)) % 1000000007n;
};

// Two test cases
console.log(maximizeSquareArea(4, 3, [2,3], [2])) // 4
console.log(maximizeSquareArea(6, 7, [2], [4])) // -1