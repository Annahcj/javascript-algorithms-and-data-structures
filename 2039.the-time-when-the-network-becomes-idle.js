// 2039. The Time When the Network Becomes Idle
// There is a network of n servers, labeled from 0 to n - 1. You are given a 2D integer array edges, where edges[i] = [ui, vi] indicates there is a message channel between servers ui and vi, and they can pass any number of messages to each other directly in one second. You are also given a 0-indexed integer array patience of length n.
// All servers are connected, i.e., a message can be passed from one server to any other server(s) directly or indirectly through the message channels.
// The server labeled 0 is the master server. The rest are data servers. Each data server needs to send its message to the master server for processing and wait for a reply. Messages move between servers optimally, so every message takes the least amount of time to arrive at the master server. The master server will process all newly arrived messages instantly and send a reply to the originating server via the reversed path the message had gone through.
// At the beginning of second 0, each data server sends its message to be processed. Starting from second 1, at the beginning of every second, each data server will check if it has received a reply to the message it sent (including any newly arrived replies) from the master server:
  // If it has not, it will resend the message periodically. The data server i will resend the message every patience[i] second(s), i.e., the data server i will resend the message if patience[i] second(s) have elapsed since the last time the message was sent from this server.
  // Otherwise, no more resending will occur from this server.
// The network becomes idle when there are no messages passing between servers or arriving at servers.
// Return the earliest second starting from which the network becomes idle.


// Solution: BFS

// Use level by level BFS from node 0 to find the shortest distance to every other node.
// For every data server, 
  // Get the time to receive the reply of the first request it makes to the master server (dist[i]).
  // It will keep sending messages every patience[i] seconds until it receives the first reply.
  // We will send Math.floor(dist[i] / patience[i]) + 1 messages.
  // Calculate the time to receive a reply from the last message.
  // The last send time = dist[i] - (dist[i] % patience[i])
  // The time to receive a reply from the last message = last send time + dist[i].

// n = number of servers, m = number of edges
// Time Complexity: O(n + m) 1359ms
// Space Complexity: O(n + m) 91.7MB
var networkBecomesIdle = function(edges, patience) {
  let n = patience.length, graph = Array(n).fill(0).map(() => []);
  for (let [u, v] of edges) {
    graph[u].push(v);
    graph[v].push(u);
  }
  let dist = getDistances(graph).map((dist) => dist * 2);
  let maxTime = 0;
  for (let i = 1; i < n; i++) {
    let diff = dist[i] % patience[i] === 0 ? patience[i] : dist[i] % patience[i];
    let lastSendTime = dist[i] - diff;
    let lastReplyTime = lastSendTime + dist[i];
    maxTime = Math.max(maxTime, lastReplyTime + 1);
  }
  return maxTime;
};

function getDistances(graph) {
  let queue = [0], dist = 0, n = graph.length;
  let distances = Array(n).fill(Infinity), seen = Array(n).fill(0);
  seen[0] = 1;
  while (queue.length) {
    for (let i = queue.length; i > 0; i--) {
      let node = queue.shift();
      distances[node] = dist;
      for (let nei of graph[node]) {
        if (seen[nei]) continue;
        seen[nei] = 1;
        queue.push(nei);
      }
    }
    dist++;
  }
  return distances;
}

// Two test cases
console.log(networkBecomesIdle([[0,1],[1,2]], [0,2,1])) // 8
console.log(networkBecomesIdle([[0,1],[0,2],[1,2]], [0,10,10])) // 3