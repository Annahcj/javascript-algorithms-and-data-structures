// 3296. Minimum Number of Seconds to Make Mountain Height Zero
// You are given an integer mountainHeight denoting the height of a mountain.
// You are also given an integer array workerTimes representing the work time of workers in seconds.
// The workers work simultaneously to reduce the height of the mountain. For worker i:
  // To decrease the mountain's height by x, it takes workerTimes[i] + workerTimes[i] * 2 + ... + workerTimes[i] * x seconds. For example:
    // To reduce the height of the mountain by 1, it takes workerTimes[i] seconds.
    // To reduce the height of the mountain by 2, it takes workerTimes[i] + workerTimes[i] * 2 seconds, and so on.
// Return an integer representing the minimum number of seconds required for the workers to make the height of the mountain 0.


// Solution: Binary Search

// Binary search for the minimum number of seconds s.
// To check if a number of seconds maxTime is feasible,
  // Go through every worker and binary search for the maximum height we can decrease where the worker time needed <= maxTime.
  // For a height x, it takes: workerTimes[i] * ((x + 1) * x / 2).
    // Explanation: workerTimes[i] + workerTimes[i] * 2 + ... + workerTimes[i] * x = workerTimes[i] * (x + x-1 + x-2 + x-3 + ... + 1)
  // If the sum of heights >= mountainHeight, return true.

// n = number of workers, m = mountainHeight
// Time Complexity: O(n log(n) * log(m)) 186ms
// Space Complexity: O(1) 52.52MB
function minNumberOfSeconds(mountainHeight, workerTimes) {
  const maxWorkerTime = Math.min(...workerTimes) * (mountainHeight * (mountainHeight + 1) / 2);
  let low = 1, high = maxWorkerTime;
  while (low < high) {
    const mid = low + Math.floor((high - low) / 2);
    if (isPossible(workerTimes, mountainHeight, mid)) high = mid;
    else low = mid + 1;
  }
  return low;
};

// Check if the sum of height to decrease the mountain >= mountainHeight, where each worker does not work longer than maxTime
function isPossible(workerTimes, mountainHeight, maxTime) {
  const n = workerTimes.length;
  let decreased = 0;
  for (let i = 0; i < n && decreased < mountainHeight; i++) {
    let low = 0, high = mountainHeight;
    while (low < high) {
      const mid = low + Math.ceil((high - low) / 2);
      const timeTaken = workerTimes[i] * (mid * (mid + 1) / 2);
      if (timeTaken <= maxTime) low = mid;
      else high = mid - 1;
    }
    decreased += low;
  }
  return decreased >= mountainHeight;
}

// Three test cases
console.log(minNumberOfSeconds(4, [2,1,1])) // 3
console.log(minNumberOfSeconds(10, [3,2,2,4])) // 12
console.log(minNumberOfSeconds(5, [1])) // 15