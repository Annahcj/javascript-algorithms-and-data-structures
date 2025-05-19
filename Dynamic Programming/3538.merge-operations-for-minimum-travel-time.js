// 3538. Merge Operations for Minimum Travel Time
// You are given a straight road of length l km, an integer n, an integer k, and two integer arrays, position and time, each of length n.
// The array position lists the positions (in km) of signs in strictly increasing order (with position[0] = 0 and position[n - 1] = l).
// Each time[i] represents the time (in minutes) required to travel 1 km between position[i] and position[i + 1].
// You must perform exactly k merge operations. In one merge, you can choose any two adjacent signs at indices i and i + 1 (with i > 0 and i + 1 < n) and:
  // Update the sign at index i + 1 so that its time becomes time[i] + time[i + 1].
  // Remove the sign at index i.
// Return the minimum total travel time (in minutes) to travel from 0 to l after exactly k merges.


// Solution: DP

// Key point is that we need to keep track of:
  // the previous sign
  // the time accumulated up to the previous sign
  // and the time accumulated up to the next sign.

// Memoize every dp(i, prevIndex, prevTime, k), where
  // i = index in position/time
  // prevIndex = previous index that we decided to keep
  // prevTime = time accumulated up to prevIndex
  // k = remaining k
  // currTime = time accumulated from prevIndex to i (derived)

// For each dp(i, prevIndex, prevTime, k), we have two choices:
  // 1. Keep i.
    // This locks in the current index i as a sign, so we stop accumulating time for this sign and start accumulating for the next one.
    // We need to calculate the time it takes to go from prevIndex to i, which takes (position[i] - position[prevIndex]) * prevTime.
  // 2. Merge i with the next sign we will take.
    // Keep accumulating time for the next sign.

// Return the minimum total travel time across both scenarios.

// m = sum(time[i])
// Time Complexity: O(n^2 * m * k) 170ms
// Space Complexity: O(n^2 * m * k) 68MB
function minTravelTime(l, n, k, position, time) {
  const timeSum = time.reduce((sum, t) => sum + t);
  const memo = new Map();
  return dp(1, 0, time[0], k, 0);

  function dp(i, prevIndex, prevTime, k, currTime) {
    if (i === n - 1) return k === 0 ? (position[i] - position[prevIndex]) * prevTime : Infinity;
    const key = `${i},${prevIndex},${prevTime},${k}`;
    if (memo.has(key)) return memo.get(key);

    let ans = (position[i] - position[prevIndex]) * prevTime + dp(i + 1, i, currTime + time[i], k, 0); // keep
    if (k > 0) {
      ans = Math.min(ans, dp(i + 1, prevIndex, prevTime, k - 1, currTime + time[i])); // merge
    }
    memo.set(key, ans);
    return ans;
  }
};

// Two test cases
console.log(minTravelTime(10, 4, 1, [0,3,8,10], [5,8,3,6])) // 62
console.log(minTravelTime(5, 5, 1, [0,1,2,3,5], [8,3,9,3,3])) // 34