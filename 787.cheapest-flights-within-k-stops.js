// 787. Cheapest Flights Within K Stops
// There are n cities connected by some number of flights. You are given an array flights where flights[i] = [fromi, toi, pricei] indicates that there is a flight from city fromi to city toi with cost pricei.
// You are also given three integers src, dst, and k, return the cheapest price from src to dst with at most k stops. If there is no such route, return -1.


// Solution: Bellman-Ford Algorithm

// Dynamic Programming Approach
// Keep two arrays, prev and curr (Arrays with length of n)
// Fill up prev and curr with Infinity
// Set prev[src] to 0 (since we are already at the src)
// Note: K stops means a maximum of k + 1 edges, so we can loop k times (since we have already calculated 0 edges ^^).
// Loop from 1 to k + 1 *
    // set curr[src] to 0 (since that is the origin)
    // loop through each [source, dest, weight] in flights **
        // if prev[source] is smaller than Infinity (valid path before)
            // set curr[dest] to Math.min(curr[dest], prev[source] + weight)
    // **
    // set prev to deep copy of curr
// *
// If curr[dst] is Infinity (not found), return -1, otherwise return curr[dst]

// e = edges, n = number of nodes
// Time Complexity: O(k * e) 158ms
// Space Complexity: O(n) 44.7MB
var findCheapestPrice = function(n, flights, src, dst, k) {
  // edge case which isn't necessary for this problem
  if (src === dst) return 0; 
  let prev = Array(n);
  let curr = Array(n);
  for (var i = 0; i < n; i++) {
    prev[i] = Infinity;
    curr[i] = Infinity;
  }
  prev[src] = 0;
  for (var i = 1; i < k + 2; i++) {
    curr[src] = 0;
    for (var [source, dest, weight] of flights) {
      if (prev[source] < Infinity) {
        curr[dest] = Math.min(curr[dest], prev[source] + weight);
      }
    }
    prev = [...curr];
  }
  return curr[dst] === Infinity ? -1 : curr[dst];
};

// Two test cases to run function on
console.log(findCheapestPrice(3, [[0,1,100],[1,2,100],[0,2,500]], 0, 2, 1)) // 200
console.log(findCheapestPrice(3, [[0,1,100],[1,2,100],[0,2,500]], 0, 2, 0)) // 500