// 2960. Count Tested Devices After Test Operations
// You are given a 0-indexed integer array batteryPercentages having length n, denoting the battery percentages of n 0-indexed devices.
// Your task is to test each device i in order from 0 to n - 1, by performing the following test operations:
  // If batteryPercentages[i] is greater than 0:
    // Increment the count of tested devices.
    // Decrease the battery percentage of all devices with indices j in the range [i + 1, n - 1] by 1, ensuring their battery percentage never goes below 0, i.e, batteryPercentages[j] = max(0, batteryPercentages[j] - 1).
    // Move to the next device.
  // Otherwise, move to the next device without performing any test.
// Return an integer denoting the number of devices that will be tested after performing the test operations in order.


// Solution: Counting

// Keep track of the amount of decrements that will be applied to future devices.
// When we reach a device, subtract `decrements` from the percentage.
// At the end, the number of decrements is the number of devices that have been tested.

// n = length of batteryPercentages
// Time Complexity: O(n) 71ms
// Space Complexity: O(1) 43.4MB
var countTestedDevices = function(batteryPercentages) {
  let decrements = 0;
  for (let percentage of batteryPercentages) {
    if (percentage - decrements > 0) {
      decrements++;
    }
  }
  return decrements;
};

// Two test cases
console.log(countTestedDevices([1,1,2,1,3])) // 3
console.log(countTestedDevices([0,1,2])) // 2