// 997. Find the Town Judge
// In a town, there are n people labeled from 1 to n. There is a rumor that one of these people is secretly the town judge.
// If the town judge exists, then:
  // 1. The town judge trusts nobody.
  // 2. Everybody (except for the town judge) trusts the town judge.
  // 3. There is exactly one person that satisfies properties 1 and 2.
// You are given an array trust where trust[i] = [ai, bi] representing that the person labeled ai trusts the person labeled bi.
// Return the label of the town judge if the town judge exists and can be identified, or return -1 otherwise.


// Solution: Count Indegrees & Outdegrees

// Count the indegrees and outdegrees for each vertex.
// The vertex with n - 1 indegrees and 0 outdegrees is the town judge.

// Time Complexity: O(V + E) 112ms
// Space Complexity: O(V) 47MB
var findJudge = function(n, trust) {
  let indegrees = Array(n + 1).fill(0), outdegrees = Array(n + 1).fill(0);
  for (let [x, y] of trust) {
    outdegrees[x]++;
    indegrees[y]++;
  }
  for (let i = 1; i <= n; i++) {
    if (indegrees[i] === n - 1 && outdegrees[i] === 0) return i;
  }
  return -1;
};

// Three test cases 
console.log(findJudge(2, [[1,2]])) // 2
console.log(findJudge(3, [[1,3],[2,3]])) // 3
console.log(findJudge(3, [[1,3],[2,3],[3,1]])) // -1