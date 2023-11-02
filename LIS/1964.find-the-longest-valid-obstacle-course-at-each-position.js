// 1964. Find the Longest Valid Obstacle Course at Each Position
// You want to build some obstacle courses. You are given a 0-indexed integer array obstacles of length n, where obstacles[i] describes the height of the ith obstacle.
// For every index i between 0 and n - 1 (inclusive), find the length of the longest obstacle course in obstacles such that:
// You choose any number of obstacles between 0 and i inclusive.
// You must include the ith obstacle in the course.
// You must put the chosen obstacles in the same order as they appear in obstacles.
// Every obstacle (except the first) is taller than or the same height as the obstacle immediately before it.
// Return an array ans of length n, where ans[i] is the length of the longest obstacle course for index i as described above.


// Solution: Longest Increasing Susequence w/ Binary Search

// Logic:
// Build up longest increasing subsequence as you go.
// Since you must include obstacles[i] in the subsequence, find the point where obstacles[i] would fit in.
// If the last item in the sequence is bigger than or equal to obstacles[i], we can simply push it in sequence, then get the length of the sequence.
// Otherwise, use binary search to find the index of the first number bigger than obstacles[i].
// Note: Keep updating the sequence as you go.

// Algorithm:
// The first longest course will always be 1, so we put that in res (result). Also store obstacles[0] in seq (sequence)
// Loop through obstacles from 1 to n - 1 (pointer = i)
  // If last item of seq is smaller than or equal to obstacles[i], push obstacles[i] into seq, push length of seq into res.
  // Else
    // Binary Search for the first item bigger than obstacles[i], calling it idx (index)
    // Replace seq[idx] with obstacles[i]
    // Push idx + 1 into res
// Return res.

// Time Complexity: O(n log(n)) 388ms
// Space Complexity: O(n) 75.1MB
var longestObstacleCourseAtEachPosition = function(obstacles) {
  let res = [1], seq = [obstacles[0]];
  for (let i = 1; i < obstacles.length; i++) {
    if (seq[seq.length - 1] <= obstacles[i]) seq.push(obstacles[i]), res.push(seq.length);
    else {
      let idx = binarySearch(obstacles[i]);
      seq[idx] = obstacles[i];
      res.push(idx + 1);
    }
  }
  return res;

  function binarySearch(num) {
    let l = 0, r = seq.length;
    while (l <= r) {
      let mid = Math.floor((l + r) / 2);
      if (seq[mid] <= num) l = mid + 1;
      else r = mid - 1;
    }
    return l;
  }
};

// Three test cases
console.log(longestObstacleCourseAtEachPosition([1,2,3,2])) // [1,2,3,3]
console.log(longestObstacleCourseAtEachPosition([2,2,1])) // [1,2,1]
console.log(longestObstacleCourseAtEachPosition([3,1,5,6,4,2])) // [1,1,2,3,2,2]