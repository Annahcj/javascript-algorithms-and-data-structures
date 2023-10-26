// 207. Course Schedule
// There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.
// For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.
// Return true if you can finish all courses. Otherwise, return false.


// Solution: Topological Sort

// What we need:
  // 1. array of indegrees of each course (number of prerequisites is the indegree)
  // 2. graph to keep track of connections of each course to prerequisite
  // 3. queue to keep track of the next course we need to look at

// 1. construct graph for prerequisites: (course, pre) -> set course to pre, also simutaneously count indegrees of each course.
// 2. push courses with indegree of 0 to queue.
// 3. loop while queue is not empty
  // shift from queue -> currCourse
  // decrement numCourses by one
  // loop through the courses connected to currCourse,
    // decrement the indegree for each course (since we are now completing this course, we can minus one off the indegree)
    // if the indegree for the course is 0, push into queue
// return true if the number of courses remaining is 0, otherwise return false.

// p = prequisites.length, n = numCourses
// Time Complexity: O(n + p) 96ms
// Space Complexity: O(n + p) 44.9MB
var canFinish = function(numCourses, prerequisites) {
  let graph = {};
  let indegrees = Array(numCourses).fill(0);

  for (var [course, pre] of prerequisites) {
    if (!graph[pre]) graph[pre] = [];
    graph[pre].push(course);
    indegrees[course]++;
  }

  let queue = [];
  for (var i = 0; i < indegrees.length; i++) {
    if (indegrees[i] === 0) queue.push(i);
  }  

  while (queue.length) {
    let currCourse = queue.shift();
    numCourses--;
    for (var course of (graph[currCourse] || [])) {
      indegrees[course]--;
      if (indegrees[course] === 0) queue.push(course);
    }
  }

  return numCourses === 0 ? true : false;
};

// Two test cases to run function on
console.log(canFinish(2, [[1,0]])) // true
console.log(canFinish(2, [[1,0],[0,1]])) // false