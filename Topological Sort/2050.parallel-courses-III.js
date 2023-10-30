// 2050. Parallel Courses III
// You are given an integer n, which indicates that there are n courses labeled from 1 to n. You are also given a 2D integer array relations where relations[j] = [prevCoursej, nextCoursej] denotes that course prevCoursej has to be completed before course nextCoursej (prerequisite relationship). Furthermore, you are given a 0-indexed integer array time where time[i] denotes how many months it takes to complete the (i+1)th course.
// You must find the minimum number of months needed to complete all the courses following these rules:
// You may start taking a course at any time if the prerequisites are met.
// Any number of courses can be taken at the same time.
// Return the minimum number of months needed to complete all the courses.


// Solution: Topological Sort 

// Perform topological sort and keep track of the maximum number of months it takes to reach each node.
// months[i] = maximum months to get to node i, including node i

// n = number of nodes, m = number of edges
// Time Complexity: O(n + m) 220ms
// Space Complexity: O(n + m) 105.5MB
var minimumTime = function(n, relations, time) {
  let indegrees = Array(n + 1).fill(0), graph = Array(n + 1).fill(0).map(() => []);
  for (let i = 0; i < relations.length; i++) {
    let [prevCourse, nextCourse] = relations[i];
    indegrees[nextCourse]++;
    graph[prevCourse].push(nextCourse);
  }
  let queue = [];
  for (let i = 1; i <= n; i++) {
    if (indegrees[i] === 0) queue.push(i);
  }
  
  let months = Array(n + 1).fill(0); // months[i] = maximum months to get to node i, including node i
  for (let rootNode of queue) {
    months[rootNode] = time[rootNode - 1];
  }
  let maxMonths = 0;
  while (queue.length) {
    let node = queue.shift();
    maxMonths = Math.max(maxMonths, months[node]);
    for (let nei of graph[node]) {
      indegrees[nei]--;
      if (indegrees[nei] === 0) {
        queue.push(nei);
      }
      months[nei] = Math.max(months[nei], months[node] + time[nei - 1]);
    }
  }
  return maxMonths;
};

// Four test cases
console.log(minimumTime(2, [[2,1]], [10000,10000])) // 20000
console.log(minimumTime(3, [[1,3],[2,3]], [3,2,5])) // 8
console.log(minimumTime(5, [[1,5],[2,5],[3,5],[3,4],[4,5]], [1,2,3,4,5])) // 12
console.log(minimumTime(7, [[1,7],[1,4],[1,3],[2,3],[4,3],[5,3],[7,3],[7,6]], [6,5,1,8,2,9,4])) // 19