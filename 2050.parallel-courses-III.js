// 2050. Parallel Courses III
// You are given an integer n, which indicates that there are n courses labeled from 1 to n. You are also given a 2D integer array relations where relations[j] = [prevCoursej, nextCoursej] denotes that course prevCoursej has to be completed before course nextCoursej (prerequisite relationship). Furthermore, you are given a 0-indexed integer array time where time[i] denotes how many months it takes to complete the (i+1)th course.
// You must find the minimum number of months needed to complete all the courses following these rules:
// You may start taking a course at any time if the prerequisites are met.
// Any number of courses can be taken at the same time.
// Return the minimum number of months needed to complete all the courses.


// Solution: Topological Sort 

// 1. Create indegrees array filled with 0's (size of n + 1, since they are 1-indexed)
// 2. Build reversed graph (pre -> course), and count indegrees for each course. 
// 3. Create DP array 'maxTimes' (size of n + 1, filled with -Infinity) which indicates the max time to complete the ith course.
// 4. Create Queue, push all indegree 0 courses into queue, and set maxtime of indegree 0 courses to their time in the time array.
// 5. Traverse Courses in Topological Order, also update the maxTime of neighboring courses (pre -> course)
// 6. Return the maximum time in the maxTime array

// n = number of courses, m = number of relations
// Time Complexity: O(n + m) 406ms
// Space Complexity: O(n + m) 85.8MB
var minimumTime = function(n, relations, time) {
  let graph = {};
  let indegrees = Array(n + 1).fill(0);
  for (var [pre, course] of relations) {
    if (!graph[pre]) graph[pre] = [];
    graph[pre].push(course);
    indegrees[course]++;
  }
  let maxTimes = Array(n + 1).fill(-Infinity);
  let queue = [];
  for (var i = 1; i <= n; i++) {
    if (indegrees[i] === 0) {
      queue.push(i);
      maxTimes[i] = time[i - 1];
    }
  } 
  while (queue.length) {
    let currCourse = queue.shift();
    for (var course of (graph[currCourse] || [])) {
      maxTimes[course] = Math.max(maxTimes[course], time[course - 1] + maxTimes[currCourse]);
      indegrees[course]--;
      if (indegrees[course] === 0) queue.push(course);
    }
  }
  let max = -Infinity;
  for (var t of maxTimes) max = Math.max(max, t);
  return max;
};

// Four test cases to run function on
console.log(minimumTime(2, [[2,1]], [10000,10000])) // 20000
console.log(minimumTime(3, [[1,3],[2,3]], [3,2,5])) // 8
console.log(minimumTime(5, [[1,5],[2,5],[3,5],[3,4],[4,5]], [1,2,3,4,5])) // 12
console.log(minimumTime(7, [[1,7],[1,4],[1,3],[2,3],[4,3],[5,3],[7,3],[7,6]], [6,5,1,8,2,9,4])) // 19