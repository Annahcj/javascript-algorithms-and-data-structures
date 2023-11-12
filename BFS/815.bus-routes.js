// 815. Bus Routes
// ou are given an array routes representing bus routes where routes[i] is a bus route that the ith bus repeats forever.
// For example, if routes[0] = [1, 5, 7], this means that the 0th bus travels in the sequence 1 -> 5 -> 7 -> 1 -> 5 -> 7 -> 1 -> ... forever.
// You will start at the bus stop source (You are not on any bus initially), and you want to go to the bus stop target. You can travel between bus stops by buses only.
// Return the least number of buses you must take to travel from source to target. Return -1 if it is not possible.


// Solution 1: BFS over Stops

// 1. Create a map of stops to buses: {bus stop: [bus, bus, ...], bus stop: [bus, ...], ...}
// 2. Use BFS to find the minimum number of buses to take from bus stop source to target.
  // Use a hashset to keep track of stops we have visited already, and avoid revisiting them.
  // When we reach a stop, go through each bus that is connected to the current stop, then go through each stop connected to each bus.

// n = number of buses, m = number of bus stops
// Time Complexity: O(m^2 * n) 579ms
// Space Complexity: O(n + m) 114.8MB
var numBusesToDestination = function(routes, source, target) {
  let stopToBusMap = {};
  for (let bus = 0; bus < routes.length; bus++) {
    for (let stop of routes[bus]) {
      if (!stopToBusMap[stop]) stopToBusMap[stop] = [];
      stopToBusMap[stop].push(bus);
    }
  }
  let queue = [source], buses = 0;
  let seen = new Set([source]);
  while (queue.length) {
    for (let i = queue.length - 1; i >= 0; i--) {
      let stop = queue.shift();
      if (stop === target) return buses;
      for (let bus of stopToBusMap[stop]) {
        for (let nextStop of routes[bus]) {
          if (!seen.has(nextStop)) {
            queue.push(nextStop);
            seen.add(nextStop);
          }
        }
        routes[bus] = [];
      }
    }
    buses++;
  }
  return -1;
};


// Solution 2: BFS over Buses

// 1. Map buses to stops: {bus stop: [bus, bus, bus], ...}
// 2. Map buses to a hashset of buses it's connected to.
// 3. Use level-by-level BFS to find the minimum number of buses to reach each bus (not bus stop).
  // Initial the queue with buses directly connected to the source bus stop.
  // We have found a path when we reach a bus directly connected to the target bus stop.

// n = number of buses, m = number of bus stops
// Time Complexity: O(m * n^2) 656ms
// Space Complexity: O(n + m) 112.5MB
var numBusesToDestination = function(routes, source, target) {
  if (source === target) return 0;
  let n = routes.length, stopToBusMap = {}; // {bus stop: [bus, bus, bus], ...}
  for (let bus = 0; bus < n; bus++) {
    for (let stop of routes[bus]) {
      if (!stopToBusMap[stop]) stopToBusMap[stop] = [];
      stopToBusMap[stop].push(bus);
    }
  }
  let busMap = Array(n).fill(0).map(() => new Set());
  for (let stop in stopToBusMap) {
    for (let bus of stopToBusMap[stop]) {
      for (let nextBus of stopToBusMap[stop]) {
        busMap[bus].add(nextBus);
      }
    }
  }
  let queue = [...stopToBusMap[source]], buses = 1;
  let seen = Array(n).fill(false), targetBuses = new Set(stopToBusMap[target]);
  for (let bus of queue) seen[bus] = true;
  while (queue.length) {
    for (let i = queue.length - 1; i >= 0; i--) {
      let bus = queue.shift();
      if (targetBuses.has(bus)) return buses;
      for (let nextBus of busMap[bus]) {
        if (seen[nextBus]) continue;
        seen[nextBus] = true;
        queue.push(nextBus);
      }
    }
    buses++;
  }
  return -1;
};

// Two test cases
console.log(numBusesToDestination([[1,2,7],[3,6,7]], 1, 6)) // 2
console.log(numBusesToDestination([[7,12],[4,5,15],[6],[15,19],[9,12,13]], 15, 12)) // -1