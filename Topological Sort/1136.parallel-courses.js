// 1136. Parallel Courses
// You are given an integer n, which indicates that there are n courses labeled from 1 to n. You are also given an array relations where relations[i] = [prevCoursei, nextCoursei], representing a prerequisite relationship between course prevCoursei and course nextCoursei: course prevCoursei has to be taken before course nextCoursei.
// In one semester, you can take any number of courses as long as you have taken all the prerequisites in the previous semester for the courses you are taking.
// Return the minimum number of semesters needed to take all courses. If there is no way to take all the courses, return -1.


// Solution: Topological Sort

// 1. Construct a graph from the edges in relations
// 2. Get all the nodes with an indegree of 0 and push them into the queue.
// 3. For each batch of nodes in the queue, take them out, decrement the total count and decrement the indegree count for all its neighbors.
  // Push any neighbors with an indegree of 0 into a temporary queue 'next'.
// 4. Set queue to next and increment the semester count.
// Repeat steps 2,3, and 4 until we have gone through all the nodes.

// If the total nodes are now equal to 0, return the semester count, otherwise return -1.

// Time Complexity: O(V + E) 92ms
// Space Complexity: O(V + E) 45.8MB
var minimumSemesters = function(n, relations) {
  let graph = {};
  for (let i = 1; i <= n; i++) graph[i] = [];
  let indegrees = Array(n + 1).fill(0);
  for (let [x, y] of relations) {
    graph[x].push(y);
    indegrees[y]++;
  }  
  let queue = [];
  for (let i = 1; i <= n; i++) {
    if (indegrees[i] === 0) queue.push(i);
  }
  let semesters = 0;
  while (queue.length) {
    let next = [];
    while (queue.length) {
      let course = queue.shift();
      n--;
      for (let nextCourse of graph[course]) {
        indegrees[nextCourse]--;
        if (indegrees[nextCourse] === 0) next.push(nextCourse);
      }
    }
    queue = next;
    semesters++;
  }
  return n === 0 ? semesters : -1;
};

// Two test cases
console.log(minimumSemesters(3, [[1,3],[2,3]])) // 2
console.log(minimumSemesters(3, [[1,2],[2,3],[3,1]])) // -1