// 3528. Unit Conversion I
// There are n types of units indexed from 0 to n - 1. You are given a 2D integer array conversions of length n - 1, where conversions[i] = [sourceUniti, targetUniti, conversionFactori]. This indicates that a single unit of type sourceUniti is equivalent to conversionFactori units of type targetUniti.
// Return an array baseUnitConversion of length n, where baseUnitConversion[i] is the number of units of type i equivalent to a single unit of type 0. Since the answer may be large, return each baseUnitConversion[i] modulo 10^9 + 7.


// Solution: DFS

// Build up the graph based on the edges in conversions.
// DFS starting from node 0, while keeping track of the current unit conversion - multiply the conversion factors together as we visit neighbors.

// Time Complexity: O(n) 494ms
// Space Complexity: O(n) 155MB
function baseUnitConversions(conversions) {
  const n = conversions.length + 1, graph = Array(n).fill(0).map(() => []);
  for (let [source, target, conversionFactor] of conversions) {
    graph[source].push([target, conversionFactor]);
  }
  const baseUnitConversion = Array(n), MOD = 1000000007n;
  dfs(0, -1, 1n);
  return baseUnitConversion;

  function dfs(node, parent, unitConversion) {
    baseUnitConversion[node] = Number(unitConversion);
    for (let [target, conversionFactor] of graph[node]) {
      if (target === parent) continue;
      dfs(target, node, (unitConversion * BigInt(conversionFactor)) % MOD);
    }
  }
};

// Two test cases
console.log(baseUnitConversions([[0,1,2],[1,2,3]])) // [1,2,6]
console.log(baseUnitConversions([[0,1,2],[0,2,3],[1,3,4],[1,4,5],[2,5,2],[4,6,3],[5,7,4]])) // [1,2,3,8,10,6,30,24]