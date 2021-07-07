// 15. 3Sum
// Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0

// Solution 1: Two Pointers

// Loop through nums, set two pointers (i+1 and last item of nums).,
// increment left if sum is smaller than 0, decrement right if sum is bigger than 0. 
// If sum is 0, push triplet into result.  
// Extra info: Two while loops handle duplicate values, incrementing until different number is found.

// Time Complexity: O(n^2) 136 ms
// Space Complexity: O(logn) (built-in sorting algo) 49.3 MB 

var threeSum = function(nums) {
    let result = [];
    nums = nums.sort((a, b) => a - b);
    for (var i = 0; i < nums.length; i++) {
      if (nums[i] > 0) break;
      while (nums[i] === nums[i-1]) i++;
      let l = i + 1, r = nums.length - 1;
      while (l < r) {
        let sum = nums[i] + nums[l] + nums[r];
        if (sum === 0) {
          result.push([nums[i], nums[l], nums[r]]);
          l++, r--;
          while (nums[l] === nums[l - 1] && l < r) l++;
        }
        else if (sum < 0) l++;
        else r--;
      }
    }
    return result;
  };
  // Five test cases to run function on
  console.log(threeSum([-2,0,0,2,2])) // [[-2,0,2]]
  console.log(threeSum([-2,0,1,1,2])) // [[-2,0,2],[-2,1,1]]
  console.log(threeSum([-1,0,1,2,-1,-4])) // [[-1,-1,2],[-1,0,1]]
  console.log(threeSum([-1,0,0,0,0,0])) // [[0,0,0]]
  console.log(threeSum([0])) // []