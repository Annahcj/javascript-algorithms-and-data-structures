// 210. Course Schedule II
// There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.
// For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.
// Return the ordering of courses you should take to finish all courses. If there are many valid answers, return any of them. If it is impossible to finish all courses, return an empty array.


// Solution: Indegrees + BFS

// Thoughts:
// We calculate and use each course's indegree, or in other words, the number of prerequisites for a course.
// We can use an array to store the indegrees. Since the courses will be numbered from 0 to numCourses - 1, we can store each course in the index of itself.

// Algorithm:
// Initialize an array (inDegrees) the length of numCourses, initialize queue to an empty array.
// Loop through prerequisites and increment the number of indegrees of each course.
// Loop through inDegrees and push courses with an indegree of 0 to the queue.
// Initialize the result array (the one we will return)
// Perform bfs, loop while queue is not empty
  // Take the first item from the queue, store it in a variable 'curr'.
  // Decrement numCourses by one (we need this to check whether we can complete all courses).
  // Push curr into result.
  // Loop through prerequisites (variable is course)
    // If course[1] (the prerequisite of course) is equal to curr,
      // Decrement the indegree of course by one
      // If the new indegree of course is 0, push it into queue.
// If numCourses is not zero (is impossible to complete all courses), return an empty array, otherwise return result.

// Time Complexity: O(V + E) 96ms
// Space Complexity: O(V + E) 41.4MB
  var findOrder = function(numCourses, prerequisites) {
    let inDegrees = Array(numCourses).fill(0), queue = [];
    for (var course of prerequisites) {
      inDegrees[course[0]]++;
    }
    for (var i = 0; i < inDegrees.length; i++) {
      if (inDegrees[i] === 0) queue.push(i);
    }
    let result = [];
    while (queue.length) {
      let curr = queue.shift();
      numCourses--;
      result.push(curr);
      for (var course of prerequisites) {
        if (course[1] === curr) {
          inDegrees[course[0]]--;
          if (inDegrees[course[0]] === 0) queue.push(course[0]);
        }
      }
    }
    return numCourses === 0 ? result : [];
  };
  
  // Three test cases to run function on
  console.log(findOrder(2, [[1,0]])) // [0,1]
  console.log(findOrder(4, [[1,0],[2,0],[3,1],[3,2]])) // [0,1,2,3] or [0,2,1,3]
  console.log(findOrder(1, [])) // [0]