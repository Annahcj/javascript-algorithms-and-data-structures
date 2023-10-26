// 815. Bus Routes
// ou are given an array routes representing bus routes where routes[i] is a bus route that the ith bus repeats forever.
// For example, if routes[0] = [1, 5, 7], this means that the 0th bus travels in the sequence 1 -> 5 -> 7 -> 1 -> 5 -> 7 -> 1 -> ... forever.
// You will start at the bus stop source (You are not on any bus initially), and you want to go to the bus stop target. You can travel between bus stops by buses only.
// Return the least number of buses you must take to travel from source to target. Return -1 if it is not possible.


// Solution: BFS

// Build the graph like : [busStop: [bus, bus, ...], busStop: [bus, ...]]
// From stops to buses, not the other way around.
// Create a queue with the initial [source, 0] (meaning [starting stop, number of steps])
// Keep a set to make sure we don't visit the same stop twice
// Loop while the queue is not empty
  // Shift out [stop, buses] from the queue
  // If stop is equal to the target, return buses.
  // Loop over each bus in graph[stop]
    // loop over each route (actually a stop) in routes[stop]
      // if route has not been visited yet,
        // push [route, buses + 1] to the queue
        // mark route as visited
    // clear out routes[stop] (time optimization, so that we don't loop over this again)
// If we didn't find a path, return -1.

// n = routes.length, m = routes[i].length
// Time Complexity: O(nm) 728ms
// Space Complexity: O(nm) 74.3B
var numBusesToDestination = function(routes, source, target) {
  let graph = {};
  for (var i = 0; i < routes.length; i++) {
    for (var route of routes[i]) {
      if (!graph[route]) graph[route] = [];
      graph[route].push(i);
    }
  }
  console.log(graph, source)
  let queue = [[source, 0]], seen = new Set([source]);
  while (queue.length) {
    let [stop, buses] = queue.shift();
    if (stop === target) return buses;
    for (var bus of graph[stop]) { // loop over each bus in graph[stop]
      for (var route of routes[bus]) { // loop over each stop in routes[bus]
        if (!seen.has(route)) { // if stop/route hasn't been visited before
          queue.push([route, buses + 1]); 
          seen.add(route); // mark as seen
        }
      }
      routes[bus] = []; // clear routes[bus] so that we won't loop over them again
    }
  }
  return -1;
};

// Two test cases to run function on
console.log(numBusesToDestination([[1,2,7],[3,6,7]], 1, 6)) // 2
console.log(numBusesToDestination([[7,12],[4,5,15],[6],[15,19],[9,12,13]], 15, 12)) // -1