// 210. Course Schedule II
// There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.
// For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.
// Return the ordering of courses you should take to finish all courses. If there are many valid answers, return any of them. If it is impossible to finish all courses, return an empty array.


// Solution: Topological Sort / Kahn's Algorithm

// Thoughts:
// We calculate and use each course's indegree, or in other words, the number of prerequisites for a course.
// We can use an array to store the indegrees. Since the courses will be numbered from 0 to numCourses - 1, we can store each course in the index of itself.

// Set indegrees to an array the length of numCourses filled with 0's (num of prerequisites for courses [0, ..., numCourses - 1])
// Loop through each [a, b] in prerequisites
  // Increment indegrees of course a by one
// Make a new queue
// Loop through from 0...numCourses-1
  // if indegrees[i] is equal to 0, push i into queue
// Set result to [] (order of courses which we will return)
// Loop while queue is not empty *
  // Let course be queue.shift
  // Decrement numCourses by one (count to make sure it is possible to complete all courses)
  // push course into result
  // loop through each [a, b] of prerequisites **
    // if b is equal to course 
      // increment indegrees[a] by one
      // if indegrees[a] is 0, 
        // push course a into the queue
  // **
// *
// If numCourses is equal to 0, return result, otherwise return [] (impossible to complete all courses)

// Time Complexity: O(V + E) 96ms
// Space Complexity: O(V + E) 41.4MB
var findOrder = function(numCourses, prerequisites) {
  let indegrees = Array(numCourses).fill(0);
  for (let [a, _b] of prerequisites) {
    indegrees[a]++;
  }
  let queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (indegrees[i] === 0) queue.push(i);
  }
  let result = [];
  while (queue.length) {
    let course = queue.shift();
    numCourses--;
    result.push(course);
    for (let [a, b] of prerequisites) {
      if (b === course) {
        indegrees[a]--;
        if (indegrees[a] === 0) {
          queue.push(a);
        }
      }
    }
  }
  return numCourses === 0 ? result : [];
};
  
// Three test cases
console.log(findOrder(2, [[1,0]])) // [0,1]
console.log(findOrder(4, [[1,0],[2,0],[3,1],[3,2]])) // [0,1,2,3] or [0,2,1,3]
console.log(findOrder(1, [])) // [0]