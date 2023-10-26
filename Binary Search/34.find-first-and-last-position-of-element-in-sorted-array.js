// 34. Find First and Last Position of Element in Sorted Array
// Given an array of integers nums sorted in ascending order, find the starting and ending position of a given target value.


// Solution 1: Two Binary Searches

// Create a function 'findPos' which accepts a boolean parameter to find either the first or last position of an element.
// findPos: if we find an element that is equal to target,
// for first position: check whether it's the first element by checking the element before it. If it's not the first, set the upper bound to be mid - 1.
// for last position: check for the last element by checking the element after it. If it's not the last, set the lower bound to be mid + 1.
// call findPos(true) and findPos(false) and return the indexes.

// Time Complexity: O(log n) 100ms
// Space Complexity: O(1) 39.7MB

var searchRange = function(nums, target) {
    const findPos = first => {
      let low = 0, high = nums.length - 1;
      let mid;
      while (low <= high) {
        mid = Math.floor((low + high) / 2);
        if (nums[mid] > target) high = mid - 1;
        else if (nums[mid] < target) low = mid + 1;
        else {
          if (first) {
            if (nums[mid - 1] !== target) return mid;
            else high = mid - 1;
          } else {
            if (nums[mid + 1] !== target) return mid;
            else low = mid + 1;
          }
        }
      }
      return -1;
    }
    let firstPos = findPos(true);
    if (firstPos == -1) return [-1, -1];
    return [firstPos, findPos(false)];
  };
  
  // Four test cases to run function on
  console.log(searchRange([1,2,2,3,4,5,6,7], 2)) // [1,2]
  console.log(searchRange([5,7,7,8,8,10], 8)) // [3,4]
  console.log(searchRange([5,7,7,8,8,10], 6)) // [-1,-1]
  console.log(searchRange([], 0)) // [-1,-1]