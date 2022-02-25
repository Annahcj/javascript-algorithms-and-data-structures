// 1095. Find in Mountain Array
// You may recall that an array arr is a mountain array if and only if:
  // arr.length >= 3
  // There exists some i with 0 < i < arr.length - 1 such that:
    // arr[0] < arr[1] < ... < arr[i - 1] < arr[i]
    // arr[i] > arr[i + 1] > ... > arr[arr.length - 1]
// Given a mountain array mountainArr, return the minimum index such that mountainArr.get(index) == target. If such an index does not exist, return -1.
// You cannot access the mountain array directly. You may only access the array using a MountainArray interface:
  // MountainArray.get(k) returns the element of the array at index k (0-indexed).
  // MountainArray.length() returns the length of the array.
// Submissions making more than 100 calls to MountainArray.get will be judged Wrong Answer. Also, any solutions that attempt to circumvent the judge will result in disqualification.


// Solution: Three Binary Searches

// 1. Find the peak index
// 2. Binary search on the left/incline
// 3. Binary search on right/decline

// Time Complexity: O(log(n)) 80ms
// Space Complexity: O(1) 42.4MB
var findInMountainArray = function(target, mountainArr) {
  let n = mountainArr.length();
  let low = 0, high = n - 1;
  // find the peak
  while (low < high) {
    let mid = Math.floor((low + high) / 2);
    let val = mountainArr.get(mid);
    if (mountainArr.get(mid - 1) < val) low = mid + 1;
    else high = mid;
  }
  let peak = low;
  
  // binary search on the left
  low = 0, high = peak;
  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    let val = mountainArr.get(mid);
    if (val === target) return mid;
    else if (val < target) low = mid + 1;
    else high = mid - 1;
  }
  
  // binary search on the right
  low = peak, high = n - 1;
  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    let val = mountainArr.get(mid);
    if (val === target) return mid;
    else if (val > target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
};