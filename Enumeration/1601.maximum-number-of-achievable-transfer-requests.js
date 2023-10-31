// 1601. Maximum Number of Achievable Transfer Requests
// We have n buildings numbered from 0 to n - 1. Each building has a number of employees. It's transfer season, and some employees want to change the building they reside in.
// You are given an array requests where requests[i] = [fromi, toi] represents an employee's request to transfer from building fromi to building toi.
// All buildings are full, so a list of requests is achievable only if for each building, the net change in employee transfers is zero. This means the number of employees leaving is equal to the number of employees moving in. For example if n = 3 and two employees are leaving building 0, one is leaving building 1, and one is leaving building 2, there should be two employees moving to building 0, one employee moving to building 1, and one employee moving to building 2.
// Return the maximum number of achievable requests.


// Solution: Try All Combinations 

// Enumerate all possible combinations of requests (for the ith request, we either take it or don't take it).
// For each combination, check whether it is possible to meet the requests.
  // It is only possible if the number of outgoing edges is equal to the number of incoming edges for every building.

// n = number of buildings, m = number of requests
// Time Complexity: O(2^m * (n + m)) 436ms
// Space Complexity: O(n) 47.9MB
var maximumRequests = function(n, requests) {
  let m = requests.length, maxRequests = 0;
  for (let mask = 1; mask < (1 << m); mask++) {
    let degrees = Array(n).fill(0);
    let numRequests = 0;
    for (let i = 0; i < m; i++) {
      if ((mask >> i) & 1) {
        let [from, to] = requests[i];
        degrees[from]--;
        degrees[to]++;
        numRequests++;
      }
    }
    let allBalanced = degrees.every((degree) => degree === 0);
    if (allBalanced) {
      maxRequests = Math.max(maxRequests, numRequests);
    }
  }
  return maxRequests;
};

// Three test cases
console.log(maximumRequests(5, [[0,1],[1,0],[0,1],[1,2],[2,0],[3,4]])) // 5
console.log(maximumRequests(3, [[0,0],[1,2],[2,1]])) // 3
console.log(maximumRequests(4, [[0,3],[3,1],[1,2],[2,0]])) // 4