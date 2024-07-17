// 3219. Minimum Cost for Cutting Cake II
// There is an m x n cake that needs to be cut into 1 x 1 pieces.
// You are given integers m, n, and two arrays:
  // horizontalCut of size m - 1, where horizontalCut[i] represents the cost to cut along the horizontal line i.
  // verticalCut of size n - 1, where verticalCut[j] represents the cost to cut along the vertical line j.
// In one operation, you can choose any piece of cake that is not yet a 1 x 1 square and perform one of the following cuts:
  // Cut along a horizontal line i at a cost of horizontalCut[i].
  // Cut along a vertical line j at a cost of verticalCut[j].
// After the cut, the piece of cake is divided into two distinct pieces.
// The cost of a cut depends only on the initial cost of the line and does not change.
// Return the minimum total cost to cut the entire cake into 1 x 1 pieces.


// Solution: Greedy

// Always cut most expensive first.
// Cutting the most expensive first will always guarantee the minimum total cost because if done later, it will be multiplied to an even greater cost.

// Time Complexity: O((m + n) log(m + n)) 908ms
// Space Complexity: O(m + n) 112.3MB
function minimumCost(m, n, horizontalCut, verticalCut) {
  let cuts = [];
  for (let i = 0; i < m - 1; i++) {
    cuts.push([true, horizontalCut[i]]);
  }
  for (let i = 0; i < n - 1; i++) {
    cuts.push([false, verticalCut[i]]);
  }
  cuts.sort((a, b) => b[1] - a[1]);
  let vertCount = 1, horiCount = 1;
  let cost = 0;
  for (let [isHorizontal, cutCost] of cuts) {
    if (isHorizontal) {
      cost += (cutCost * vertCount);
      horiCount++;
    } else {
      cost += (cutCost * horiCount);
      vertCount++;
    }
  }
  return cost;
};

// Two test cases
console.log(minimumCost(3, 2, [1,3], [5])) // 13
console.log(minimumCost(2, 2, [7], [4])) // 15