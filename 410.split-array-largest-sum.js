// 410. Split Array Largest Sum

// Solution: Binary Search

// n = length of nums, sum = sum of nums, max = max of nums
// Time Complexity: O(n log(sum - max)) 72ms
// Space Complexity: O(1) 40.3MB
var splitArray = function(nums, m) {
  // set range to be:
    // left: max of nums
    // right: sum of nums
  let left = -Infinity, right = 0;
  for (var num of nums) {
    left = Math.max(left, num);
    right += num;
  }
  while (left < right) {
    let mid = Math.floor((left + right) / 2);
    // split nums into groups with sum no larger than mid
    let sum = 0, groups = 1;
    for (var num of nums) {
      sum += num;
      if (sum > mid) {
        groups++;
        sum = num;
      }
    }
    // if groups is smaller or equal, mid could be our anwer, or could be smaller: ans is within left to mid
    // if groups is larger, we need to increase mid: ans is within mid + 1 to right
    if (groups <= m) {
      right = mid;
    } else left = mid + 1;
  }
  return left;
};

// Three test cases to run function on
console.log(splitArray([7,2,5,10,8], 2)) // 18
console.log(splitArray([1,2,3,4,5], 2)) // 9
console.log(splitArray([1,4,4], 3)) // 4