// 2188. Minimum Time to Finish the Race
// You are given a 0-indexed 2D integer array tires where tires[i] = [fi, ri] indicates that the ith tire can finish its xth successive lap in fi * ri(x-1) seconds.
  // For example, if fi = 3 and ri = 2, then the tire would finish its 1st lap in 3 seconds, its 2nd lap in 3 * 2 = 6 seconds, its 3rd lap in 3 * 22 = 12 seconds, etc.
// You are also given an integer changeTime and an integer numLaps.
// The race consists of numLaps laps and you may start the race with any tire. You have an unlimited supply of each tire and after every lap, you may change to any given tire (including the current tire type) if you wait changeTime seconds.
// Return the minimum time to finish the race.


// Solution: Dynamic Programming

// 1. Populate bestTime, where bestTime[i] = minimum time to finish i laps using the same tire
// 2. Populate dp, where dp[i] = minimum time to finish i laps (using any combination of tires)

// Time Complexity: O(n * numLaps) 645ms
// Space Complexity: O(numLaps) 79.7MB
var minimumFinishTime = function(tires, changeTime, numLaps) {
  // bestTime[i] = minimum time to finish i laps using the same tire
  let bestTime = Array(numLaps + 1).fill(Infinity), maxLaps = 0;
  for (let tire of tires) {
    let [f, r] = tire, time = changeTime;
    // using the tire j times
    for (let j = 1; j <= numLaps; j++) {
      // optimization: only while the time is less than changing to a new tire (f + changeTime).
      let cost = f * (r ** (j - 1));
      if (cost > f + changeTime) break;
      time += cost;
      maxLaps = Math.max(maxLaps, j);
      bestTime[j] = Math.min(bestTime[j], time);
    }
  }
  
  let dp = Array(numLaps + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= numLaps; i++) { // i = laps
    for (let j = 1; j <= maxLaps && i >= j; j++) {
      dp[i] = Math.min(dp[i], bestTime[j] + dp[i - j]); // use the same tire for j laps
    }
  }
  return dp[numLaps] - changeTime;
};

// Two test cases
console.log(minimumFinishTime([[2,3],[3,4]], 5, 4)) // 21
console.log(minimumFinishTime([[1,10],[2,2],[3,4]], 6, 5)) // 25