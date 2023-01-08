// 1494. Parallel Courses II
// You are given an integer n, which indicates that there are n courses labeled from 1 to n. You are also given an array relations where relations[i] = [prevCoursei, nextCoursei], representing a prerequisite relationship between course prevCoursei and course nextCoursei: course prevCoursei has to be taken before course nextCoursei. Also, you are given the integer k.
// In one semester, you can take at most k courses as long as you have taken all the prerequisites in the previous semesters for the courses you are taking.
// Return the minimum number of semesters needed to take all courses. The testcases will be generated such that it is possible to take every course.


// Solution: DP w/ Bitmasks

// Memoize each dp(mask), where mask = the bitmask of courses we have taken

// For each dp(mask),
  // 1. Find the indegrees of each course based on the current state of the bitmask.
  // 2. Generate a bitmask of the current courses with indegree of 0
  // 3. Try all combinations of taking at most k courses with indegrees of 0:
    // a. If number of courses with indegree of 0 <= k, then take all the courses.
    // b. If number of courses with indegree of 0 > k, then try taking all submasks of the bitmask with exactly k courses, and record the minimum result.

var minNumberOfSemesters = function(n, relations, k) {
  let graph = Array(n).fill(0).map(() => []);
  for (let [prevCourse, nextCourse] of relations) {
    graph[prevCourse - 1].push(nextCourse - 1);
  }
  let memo = Array(1 << n).fill(-1), allTaken = (1 << n) - 1;
  return dp(0);
  
  function dp(mask) {
    if (mask === allTaken) {
      return 0;
    } 
    if (memo[mask] !== -1) return memo[mask];
    
    // 1. Find the indegrees based on the current state of the bitmask
    let indegrees = getIndegrees(mask);
    let availableCourses = mask, coursesCount = 0; 
    // 2. Generate a bitmask of the current courses with indegree of 0
    for (let i = 0; i < n; i++) {
      if (((mask >> i) & 1) || indegrees[i] > 0) continue; // course i is already taken or indegrees is not 0
      availableCourses |= (1 << i);
      coursesCount++;
    }
    
    if (coursesCount <= k) {
      return memo[mask] = 1 + dp(availableCourses);
    }
    
    let ans = Infinity;
    // 3. Generate all submasks of the availableCourses bitmask and take submasks with exactly k courses
    for (let submask = availableCourses; submask > 0; submask = (submask - 1) & availableCourses) {
      let courses = getOneBits(submask);
      if (courses !== k) continue; 
      ans = Math.min(ans, 1 + dp(submask | mask));
    }
    return memo[mask] = ans;
  }  
  
  function getIndegrees(mask) {
    let indegrees = Array(n).fill(0);
    for (let i = 0; i < n; i++) {
      if ((mask >> i) & 1) continue; // course i already taken
      for (let course of graph[i]) {
        indegrees[course]++;
      }
    }
    return indegrees;
  }
  
  function getOneBits(mask) {
    let count = 0;
    while (mask > 0) {
      count += mask & 1;
      mask >>= 1;
    }
    return count;
  }
};

// Two test cases
console.log(minNumberOfSemesters(4, [[2,1],[3,1],[1,4]], 2)) // 3
console.log(minNumberOfSemesters(5, [[2,1],[3,1],[4,1],[1,5]], 2)) // 4