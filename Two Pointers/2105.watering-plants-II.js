// 2105. Watering Plants II
// Given a 0-indexed integer array plants of n integers, where plants[i] is the amount of water the ith plant needs, and two integers capacityA and capacityB representing the capacities of Alice's and Bob's watering cans respectively, return the number of times they have to refill to water all the plants.


// Solution: Two Pointers

// Note: The maximum of plnats is never larger than capacityA and capacityB.
// Use two pointers, start and end.
// Keep two variables capA and capB which indicate the amount of water Alice and Bob have left respectively.

// Time Complexity: O(n) 157ms
// Space Complexity: O(1) 51.1MB
var minimumRefill = function(plants, capacityA, capacityB) {
  let start = 0, end = plants.length - 1;
  let capA = capacityA, capB = capacityB;
  let ans = 0;
  while (start < end) {
    if (plants[start] > capA) capA = capacityA, ans++; // if Alice doesn't have enough water, fill up the can.
    if (plants[end] > capB) capB = capacityB, ans++; // if Bob doesn't have enough water, fill up the can.
    capA -= plants[start++];
    capB -= plants[end--];
  }
  if (start === end) {
    if (capB > capA) {
      if (plants[start] > capB) ans++;
    } else {
      if (plants[start] > capA) ans++;
    }
  }
  return ans;
};

// Two test cases
console.log(minimumRefill([2,2,3,3], 5, 5)) // 1
console.log(minimumRefill([1,2,4,4,5], 6, 5)) // 2