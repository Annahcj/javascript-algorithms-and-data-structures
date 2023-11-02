// 2747. Count Zero Request Servers
// You are given an integer n denoting the total number of servers and a 2D 0-indexed integer array logs, where logs[i] = [server_id, time] denotes that the server with id server_id received a request at time time.
// You are also given an integer x and a 0-indexed integer array queries.
// Return a 0-indexed integer array arr of length queries.length where arr[i] represents the number of servers that did not receive any requests during the time interval [queries[i] - x, queries[i]].
// Note that the time intervals are inclusive.


// Solution: Sorting, Sliding Window, and Two Pointers 

// For each request, think of the request expiry time as request time + x.

// 1. Sort the queries in asc order by time. 
// 2. Sort the logs in asc order by time.
// 3. Go through each query, while maintaining a sliding window of non-expired requests.
  // a. Expand the right side of the window while request time <= queryTime
  // b. Move up left side of the window while requests are expired
  // Keep updating activeCount, where activeCount[server_id] = the number of active logs for the given server_id
  // Keep track of the global count of active servers.

// k = number of logs, m = number of queries
// Time Complexity: O(m log(m) + k log(k) + n) 463ms
// Space Complexity: O(n + m) 118.5MB
var countServers = function(n, logs, x, queries) {
  queries = queries.map((time, idx) => [time, idx]).sort((a, b) => a[0] - b[0]);
  logs.sort((a, b) => a[1] - b[1]);
  let activeCount = Array(n + 1).fill(0), activeServers = 0, j = 0, i = 0, res = Array(queries.length);
  for (let [queryTime, queryIndex] of queries) {
    // expand the right side of the window while request time <= queryTime
    while (j < logs.length && logs[j][1] <= queryTime) {
      let [server_id] = logs[j];
      if (++activeCount[server_id] === 1) activeServers++;
      j++;
    }
    // move up left pointer of window while requests are expired
    while (i < j && logs[i][1] + x < queryTime) {
      let [server_id] = logs[i];
      if (--activeCount[server_id] === 0) activeServers--;
      i++;
    }
    res[queryIndex] = n - activeServers;
  }
  return res;
};

// Two test cases
console.log(countServers(3, [[1,3],[2,6],[1,5]], 5, [10,11])) // [1,2]
console.log(countServers(3, [[2,4],[2,1],[1,2],[3,1]], 2, [3,4])) // [0,1]