// 1547. Minimum Cost to Cut a Stick
// Given a wooden stick of length n units. The stick is labelled from 0 to n. For example, a stick of length 6 is labelled as follows:
// Given an integer array cuts where cuts[i] denotes a position you should perform a cut at.
// You should perform the cuts in order, you can change the order of the cuts as you wish.
// The cost of one cut is the length of the stick to be cut, the total cost is the sum of costs of all cuts. When you cut a stick, it will be split into two smaller sticks (i.e. the sum of their lengths is the length of the stick before the cut). Please refer to the first example for a better explanation.
// Return the minimum total cost of the cuts.


// Solution: Recursion w/ Memoization

// start and end indicates the portion of the stick from [start, ..., end]
// memo[start][end] represents the minimum cost of performing all the cuts within the boundaries of start and end.

// n = number of cuts
// Time Complexity: O(n^3) 1084ms
// Space Complexity: O(n^2) 52.7MB
var minCost = function(n, cuts) {
  let memo = new Map();
  cuts.sort((a, b) => a - b); // sort the cuts to save time.
  return dfs(0, n);
  
  function dfs(start, end) {
    if (end <= 0 || start >= n) return 0; // out of bounds
    if (memo.has(`${start},${end}`)) return memo.get(`${start},${end}`);
    let ans = Infinity;
    for (var cut of cuts) {
      if (cut >= end) break; // out of range, save time by breaking early.
      if (cut <= start) continue; // not in range, but following cuts may be in range, so we only continue.
      let cost = end - start;
      ans = Math.min(ans, dfs(start, cut) + cost + dfs(cut, end));
    }
    if (ans === Infinity) ans = 0; // if there are no cuts in this portion, the cost is 0.
    memo.set(`${start},${end}`, ans);
    return ans;
  }  
};

// Two test cases to run function on
console.log(minCost(7, [1,3,4,5])) // 16
console.log(minCost(9, [5,6,1,4,2])) // 22