// 1326. Minimum Number of Taps to Open to Water a Garden


// Solution: Greedy Approach

// set arr to a new array of size n + 1, filled with 0's
// (construct intervals -> for ranges[i], left bound is i - ranges[i], right bound is i + ranges[i])
// set left to Math.max(0, i - ranges[i]) (we only need to water from 0 to n)
// set right to Math.min(n, i + ranges[i]) (we don't need to go past n)
// set arr[left] to Math.max(arr[left], right)
// (arr[i] is equal to maximum index we can get to, not extra distance])

// set currReach to 0, maxReach to 0, openTaps to 0, and i to 0 (pointer)
// loop while i is smaller than n + 1 AND currReach is smaller than n
  // increment openTaps by one
  // loop while i is smaller than n + 1 AND i is smaller than or equal to currReach
    // maxReach is Math.max(maxReach, arr[i])
    // increment i by one
  // if currReach is equal to maxReach (we can't move forward at all)
    // return -1 (unreachable)
  // update currReach to maxReach
// Return openTaps

// Time Complexity: O(n) 72ms
// Space Complexity: O(n) 41.4MB
var minTaps = function(n, ranges) {
  let arr = Array(n + 1).fill(0);
  for (var i = 0; i < ranges.length; i++) {
    if (ranges[i] === 0) continue;
    let left = Math.max(0, i - ranges[i]);
    let right = Math.min(n, i + ranges[i]);
    arr[left] = Math.max(arr[left], right);
  }  
  let currReach = 0, maxReach = 0, openTaps = 0;
  i = 0;
  // loop while i is smaller than n + 1 AND we haven't reached target (n)
  while (i < n + 1 && currReach < n) {
    openTaps++;
    // loop while within range of current reach and i is within bounds -> to find the next maximum reach/position
    while (i < n + 1 && currReach >= i) {
      maxReach = Math.max(maxReach, arr[i]);
      i++;
    }
    // if we can't move forward at all
    if (currReach === maxReach) return -1;
    currReach = maxReach;
  }
  return openTaps;
};

// Five test cases to run function on
console.log(minTaps(5, [3,4,1,1,0,0])) // 1
console.log(minTaps(3, [0,0,0,0])) // -1
console.log(minTaps(7, [1,2,1,0,2,1,0,1])) // 3
console.log(minTaps(8, [4,0,0,0,0,0,0,0,4])) // 2
console.log(minTaps(8, [4,0,0,0,4,0,0,0,4])) // 1