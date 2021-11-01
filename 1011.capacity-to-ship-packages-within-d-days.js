// 1011. Capacity To Ship Packages Within D Days
// A conveyor belt has packages that must be shipped from one port to another within days days.
// The ith package on the conveyor belt has a weight of weights[i]. Each day, we load the ship with packages on the conveyor belt (in the order given by weights). We may not load more weight than the maximum weight capacity of the ship.
// Return the least weight capacity of the ship that will result in all the packages on the conveyor belt being shipped within days days.


// Solution: Binary Search

// Time Complexity: O(n log(sum - max)) 96ms
// Space Complexity: O(1) 42.7MB
var shipWithinDays = function(weights, days) {
  // left = max weight, right = sum of weights
  let left = -Infinity, right = 0;
  for (var weight of weights) {
    left = Math.max(left, weight);
    right += weight;
  }
  // get as much weight as possible until exceeding, count number of groups
  while (left < right) {
    let mid = Math.floor((left + right) / 2);
    let groups = 1, sum = 0;
    for (var weight of weights) {
      sum += weight;
      if (sum > mid) {
        groups++;
        sum = weight;
      }
    }
    // if groups is less than or equal to days, answer is between left and mid -> right to mid
    // if groups is more than days, we need more weight, answer is between mid + 1 and right -> left to mid + 1  
    if (groups <= days) right = mid;
    else left = mid + 1;
  }
  return left;
};

// Three test cases to run function on
console.log(shipWithinDays([1,2,3,4,5,6,7,8,9,10], 5)) // 15
console.log(shipWithinDays([3,2,2,4,1,4], 3)) // 6
console.log(shipWithinDays([1,2,3,1,1], 4)) // 3