// 547. Number of Provinces
// There are n cities. Some of them are connected, while some are not. If city a is connected directly with city b, and city b is connected directly with city c, then city a is connected indirectly with city c.
// A province is a group of directly or indirectly connected cities and no other cities outside of the group.
// You are given an n x n matrix isConnected where isConnected[i][j] = 1 if the ith city and the jth city are directly connected, and isConnected[i][j] = 0 otherwise.
// Return the total number of provinces.


// Solution: BFS

// Logic:
// We loop through isConnected, if we haven't been there before, bfs through isConnected[i] and ALL its connections and all their connections.
// If we haven't been to isConnected[i], increase the count.

// Algorithm
// keep a province count 'provinces', let visited be a hashmap to check whether we have been to a node yet
// Loop through isConnected (pointer = i)
  // if i has not been visited yet
    // call bfs for i
    // increment provinces by one
// bfs: (idx)
  // set a queue to [idx]
  // loop while queue is not empty *
    // let next = [] (instead of shifting from queue, we pop from queue and reassign queue to next for each level)
    // loop while queue is not empty **
      // pop the last item from queue, save it in 'curr'
      // mark curr as visited
      // loop through isConnected[curr] (pointer = i)
        // if isConnected[curr][i] is 1 (is a connection) AND we haven't visited i before
          // push i into next
    // **
    // update queue to be next
  // *

// n = length of isConnected
// Time Complexity: O(n^2) 80ms
// Space Complexity: O(n) 41.3MB
  var findCircleNum = function(isConnected) {
    let provinces = 0, visited = {};
    for (var i = 0; i < isConnected.length; i++) {
      if (!visited[i]) {
        bfs(i);
        provinces++;
      }
    }
    return provinces;
    function bfs(idx) {
      let queue = [idx];
      while (queue.length) {
        let next = [];
        while (queue.length) {
          let curr = queue.pop();
          visited[curr] = true;
          for (var i = 0; i < isConnected[curr].length; i++) {
            let cell = isConnected[curr][i];
            if (cell === 1 && !visited[i]) {
              next.push(i);
            }
          }
        }
        queue = next;
      }
    }
  };
  
  // Three test cases to run function on
  console.log(findCircleNum([[1,0,0,1],[0,1,1,0],[0,1,1,1],[1,0,1,1]])) // 1
  console.log(findCircleNum([[1,1,0],[1,1,0],[0,0,1]])) // 2
  console.log(findCircleNum([[1,0,0],[0,1,0],[0,0,1]])) // 3