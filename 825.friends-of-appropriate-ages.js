// 825. Friends Of Appropriate Ages
// There are n persons on a social media website. You are given an integer array ages where ages[i] is the age of the ith person.
// A Person x will not send a friend request to a person y (x != y) if any of the following conditions is true:
  // age[y] <= 0.5 * age[x] + 7
  // age[y] > age[x]
  // age[y] > 100 && age[x] < 100
// Otherwise, x will send a friend request to y.
// Note that if x sends a request to y, y will not necessarily send a request to x. Also, a person will not send a friend request to themself.
// Return the total number of friend requests made.


// Solution: Binary Search & Sorting

// Sort ages in asc order.
// For each person (ages[i]), binary search for:
  // The first index j where ages[j] > 0.5 * age[i] + 7
  // The last index j where ages[j] <= ages[i]

// The number of friends that person i will make a friend request to is: Math.max(0, last index j - first index j).
// Note that the third condition is covered by the second condition.

// Time Complexity: O(n log(n)) 191ms
// Space Complexity: O(log(n)) (space for sorting) 49.1MB
var numFriendRequests = function(ages) {
  let n = ages.length, ans = 0;
  ages.sort((a, b) => a - b);
  for (let i = 0; i < n; i++) {
    let lower_bound_index = lower_bound(ages, 0.5 * ages[i] + 7);
    let upper_bound_index = upper_bound(ages, ages[i]);
    ans += Math.max(0, upper_bound_index - lower_bound_index);
  }
  return ans;
};

function lower_bound(arr, targ) { // find first index where arr[index] > targ
  let low = 0, high = arr.length - 1;
  while (low < high) {
    let mid = Math.floor((low + high) / 2);
    if (arr[mid] > targ) high = mid;
    else low = mid + 1;
  }
  return low;
}

function upper_bound(arr, targ) { // find last index where arr[index] <= targ
  let low = 0, high = arr.length - 1;
  while (low < high) {
    let mid = Math.ceil((low + high) / 2);
    if (arr[mid] <= targ) low = mid;
    else high = mid - 1;
  }
  return low;
}

// Three test cases
console.log(numFriendRequests([16,16])) // 2
console.log(numFriendRequests([16,17,18])) // 2
console.log(numFriendRequests([20,30,100,110,120])) // 3