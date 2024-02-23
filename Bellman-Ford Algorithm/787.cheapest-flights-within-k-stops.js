// 787. Cheapest Flights Within K Stops
// There are n cities connected by some number of flights. You are given an array flights where flights[i] = [fromi, toi, pricei] indicates that there is a flight from city fromi to city toi with cost pricei.
// You are also given three integers src, dst, and k, return the cheapest price from src to dst with at most k stops. If there is no such route, return -1.


// Solution: Bellman-Ford Algorithm

// Keep track of the minimum distance from src to each other city.
// Initialize the distance from src -> src = 0.

// Iterate through flights k + 1 times, updating the minimum distances from src -> each node at each iteration.
// This algorithm ensures that at each iteration i, we use at most i stops.

// k = number of stops, m = number of flights
// Time Complexity: O(k * (m + n)) 95ms
// Space Complexity: O(n) 57.6MB
var findCheapestPrice = function(n, flights, src, dst, k) {
  let prevDist = Array(n).fill(Infinity);
  prevDist[src] = 0; // src -> src = 0
  for (let i = 0; i <= k; i++) {
    let dist = [...prevDist];
    for (let [from, to, price] of flights) {
      dist[to] = Math.min(dist[to], prevDist[from] + price);
    }
    prevDist = dist;
  }
  return prevDist[dst] === Infinity ? -1 : prevDist[dst];
};

// Two test cases
console.log(findCheapestPrice(3, [[0,1,100],[1,2,100],[0,2,500]], 0, 2, 1)) // 200
console.log(findCheapestPrice(3, [[0,1,100],[1,2,100],[0,2,500]], 0, 2, 0)) // 500