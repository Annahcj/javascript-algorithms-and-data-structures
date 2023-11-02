// 1578. Minimum Time to Make Rope Colorful
// Alice has n balloons arranged on a rope. You are given a 0-indexed string colors where colors[i] is the color of the ith balloon.
// Alice wants the rope to be colorful. She does not want two consecutive balloons to be of the same color, so she asks Bob for help. Bob can remove some balloons from the rope to make it colorful. You are given a 0-indexed integer array neededTime where neededTime[i] is the time (in seconds) that Bob needs to remove the ith balloon from the rope.
// Return the minimum time Bob needs to make the rope colorful.


// Solution: One pass

// While colors are consecutive, count the total time and the max time.
// Take the total time - max time.

// Time Complexity: O(n) 190ms
// Space Complexity: O(1) 50.4MB
var minCost = function(colors, neededTime) {
  let time = 0, maxTime = neededTime[0], totalTime = neededTime[0];
  for (let i = 1; i <= colors.length; i++) {
    if (colors[i] !== colors[i - 1]) {
      time += totalTime - maxTime;
      totalTime = neededTime[i];
      maxTime = neededTime[i];
    } else {
      totalTime += neededTime[i];
      maxTime = Math.max(maxTime, neededTime[i]);
    }
  }  
  return time;
};

// Three test cases
console.log(minCost("abaac", [1,2,3,4,5])) // 3
console.log(minCost("abc", [1,2,3])) // 0
console.log(minCost("aabaa", [1,2,3,4,1])) // 2