// 2940. Find Building Where Alice and Bob Can Meet
// You are given a 0-indexed array heights of positive integers, where heights[i] represents the height of the ith building.
// If a person is in building i, they can move to any other building j if and only if i < j and heights[i] < heights[j].
// You are also given another array queries where queries[i] = [a[i], b[i]]. On the ith query, Alice is in building ai while Bob is in building b[i].
// Return an array ans where ans[i] is the index of the leftmost building where Alice and Bob can meet on the ith query. If Alice and Bob cannot move to a common building on query i, set ans[i] to -1.


// Solution: Monotonic Stack & Sorting

// 1. Sort (a, b) in asc order for each query.
  // If a === b: ans[i] = b
  // If heights[a] < heights[b]: Since (a, b) is in asc order, both conditions are met, so ans[i] = b

// Basically, each query (a, b) boils down to: Find the leftmost building with indices in range (b + 1, n), where heights[index] > heights[a].
  // Explanation: We only need to check against heights[a] since we know the condition heights[a] >= heights[b] at this point.
  // Maintain a monotonic decreasing stack of building indices to achieve this.

// 2. Sort queries by `b` in desc order, after assigning the original index before sorting.
// 3. Use two pointers to go through queries and heights.
  // Go through queries in desc order.
  // Starting from the end of heights, move the heights pointer down while queries[queryIndex][1] > heightsIndex.
  // Pop from the back of the monostack while monostack[monostack.length - 1] <= heights[heightsIndex] (it's optimal to have a left-er index with a taller height).

// n = length of heights, m = number of queries
// Time Complexity: O(n + m log(m)) 285ms
// Space Complexity: O(n + m) 84.5MB
var leftmostBuildingQueries = function(heights, queries) {
  let n = heights.length, m = queries.length;
  queries = queries.map(([a, b], idx) => [Math.min(a, b), Math.max(a, b), idx]).sort((a, b) => b[1] - a[1]);

  let heightIndex = n - 1, stack = [], ans = Array(m);
  for (let queryIndex = 0; queryIndex < m; queryIndex++) {
    let [a, b, originalIndex] = queries[queryIndex];
    while (heightIndex > b) {
      while (stack.length && heights[stack[stack.length - 1]] <= heights[heightIndex]) {
        stack.pop();
      }
      stack.push(heightIndex);
      heightIndex--;
    }
    if (a === b || heights[a] < heights[b]) {
      ans[originalIndex] = b;
    } else {
      let nextTallestIndex = getNextTallest(stack, heights, a);
      ans[originalIndex] = nextTallestIndex;
    }
  }
  return ans;
};

// stack is in desc order, find the rightmost heights[index] in the stack where heights[index] > heights[a]
function getNextTallest(stack, heights, a) {
  let low = 0, high = stack.length - 1;
  while (low < high) {
    let mid = Math.ceil((low + high) / 2);
    if (heights[stack[mid]] > heights[a]) low = mid;
    else high = mid - 1;
  }
  return heights[stack[low]] > heights[a] ? stack[low] : -1;
}

// Two test cases
console.log(leftmostBuildingQueries([6,4,8,5,2,7], [[0,1],[0,3],[2,4],[3,4],[2,2]])) // [2,5,-1,5,2]
console.log(leftmostBuildingQueries([5,3,8,2,6,1,4,6], [[0,7],[3,5],[5,2],[3,0],[1,6]])) // [7,6,-1,4,6]