// 15. 3Sum
// Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0


// Solution: Sorting 

// First sort the numbers in ascending order. 
// Loop through nums (pointer = i)
  // perform a binary search-like operation to find a total sum of 0
  // set two pointers l and r at i + 1 and the end of nums
  // loop while l is smaller than r
    // sum = nums[i] + nums[l] + nums[r]
    // if sum is equal to 0
      // push the triplet into res
      // increment i, decrement r
      // to avoid using duplicates, increment l while l is smaller than r and nums[l] is equal to nums[l - 1]
    // otherwise if sum is smaller than 0,
      // increment l
    // otherwise if sum is bigger than 0, 
      // decrement r
// Return res


// Time Complexity: O(n^2) 136 ms
// Space Complexity: O(logn) (built-in sorting algo) 49.3 MB 

var threeSum = function(nums) {
  nums = nums.sort((a, b) => a - b);
  let res = [];
  for (var i = 0; i < nums.length - 2 && nums[i] <= 0; i++) {
    // increment i while prev number is a duplicate
    while (nums[i] === nums[i - 1]) i++;
    let l = i + 1, r = nums.length - 1;
    while (l < r) {
      let sum = nums[i] + nums[l] + nums[r];
      if (sum === 0) {
        res.push([nums[i], nums[l], nums[r]]);
        l++, r--;
        // increment l while prev number is a duplicate
        while (l < r && nums[l] === nums[l - 1]) l++;
      } else if (sum < 0) l++;
      else r--;
    }
  }  
  return res;
};

// Five test cases to run function on
console.log(threeSum([-2,0,0,2,2])) // [[-2,0,2]]
console.log(threeSum([-2,0,1,1,2])) // [[-2,0,2],[-2,1,1]]
console.log(threeSum([-1,0,1,2,-1,-4])) // [[-1,-1,2],[-1,0,1]]
console.log(threeSum([-1,0,0,0,0,0])) // [[0,0,0]]
console.log(threeSum([0])) // []