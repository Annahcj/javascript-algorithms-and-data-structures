// 3733. Minimum Time to Complete All Deliveries
// You are given two integer arrays of size 2: d = [d1, d2] and r = [r1, r2].
// Two delivery drones are tasked with completing a specific number of deliveries. Drone i must complete di deliveries.
// Each delivery takes exactly one hour and only one drone can make a delivery at any given hour.
// Additionally, both drones require recharging at specific intervals during which they cannot make deliveries. Drone i must recharge every ri hours (i.e. at hours that are multiples of ri).
// Return an integer denoting the minimum total time (in hours) required to complete all deliveries.


// Solution: Binary Search

// Binary search for the minimum total time t.
// It is optimal to do deliveries on slots where only one drone is available.
// For slots where both drones are available, see if there is enough time left for both drones to finish their deliveries.

// both charging: multiples of lcm(r1, r2) -> t / lcm(r1, r2)
// only d1 charging: (t / r1) - (t / lcm(r1, r2))
// only d2 charging: (t / r2) - (t / lcm(r1, r2))
// both not charging: t - both charging - only d1 charging - only d2 charging.
  // t - (t / lcm(r1, r2)) - ((t / r1) - (t / lcm(r1, r2))) - ((t / r2) - (t / lcm(r1, r2)))

// Binary search upper bound:
  // A rough upper bound if r = [2, 3], d = [10^9, 10^9].
  // If r = 2, it would take 2 * 10^9.
  // Roughly, multiply that by 2 for the other drone.

// Example:
  // d1:    5    10   15
  // d2: 2 4 6 8 10
  // t = 10

// Time Complexity: O(log(max(d[0], d[1]))) 5ms
// Space Complexity: O(1) 57MB
function minimumTime(d, r) {
  let low = 1, high = Math.max(d[0], d[1]) * 4;
  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    if (isPossible(mid, d, r)) {
      high = mid;
    } else {
      low = mid + 1;
    }
  }
  return low;
};

function isPossible(t, d, r) {
  const bothCharging = Math.floor(t / lcm(r[0], r[1]));
  const onlyD1Charging = Math.floor(t / r[0]) - bothCharging;
  const onlyD2Charging = Math.floor(t / r[1]) - bothCharging;
  const bothNotCharging = t - bothCharging - onlyD1Charging - onlyD2Charging;
  const onlyD2Free = onlyD1Charging, onlyD1Free = onlyD2Charging;
  // it is optimal to do as many d1 deliveries when only d1 is free, likewise for d2.
  // check whether the remaining deliveries combined are less than or equal to the number of free slots where both are available.
  return Math.max(0, d[0] - onlyD1Free) + Math.max(0, d[1] - onlyD2Free) <= bothNotCharging;
}

function lcm(a, b) {
  return (a / gcd(a, b)) * b;
}

function gcd(a, b) {
  if (b === 0) return a;
  return gcd(b, a % b);
}

// Three test cases
console.log(minimumTime([3,1], [2,3])) // 5
console.log(minimumTime([1,3], [2,2])) // 7
console.log(minimumTime([2,1], [3,4])) // 3