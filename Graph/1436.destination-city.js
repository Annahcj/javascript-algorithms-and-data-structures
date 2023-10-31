// 1436. Destination City
// You are given the array paths, where paths[i] = [cityAi, cityBi] means there exists a direct path going from cityAi to cityBi. Return the destination city, that is, the city without any path outgoing to another city.
// It is guaranteed that the graph of paths forms a line without any loop, therefore, there will be exactly one destination city.


// Solution: Hashset

// We only need to find the city with no outgoing edges.
// Store cities which have outgoing edges in a hashset.
// Return the city which is not present in the hashset.

// Time Complexity: O(n) 76ms
// Space Complexity: O(n) 45.1MB
var destCity = function(paths) {
  let outgoing = new Set();
  for (let [x, y] of paths) {
    outgoing.add(x);
  } 
  for (let [x, y] of paths) {
    if (!outgoing.has(y)) return y;
  }
};

// Two test cases
console.log(destCity([["London","New York"],["New York","Lima"],["Lima","Sao Paulo"]])) // "Sao Paulo"
console.log(destCity([["B","C"],["D","B"],["C","A"]])) // "A"