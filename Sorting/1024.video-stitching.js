// 1024. Video Stitching
// You are given a series of video clips from a sporting event that lasted time seconds. These video clips can be overlapping with each other and have varying lengths.
// Each video clip is described by an array clips where clips[i] = [starti, endi] indicates that the ith clip started at starti and ended at endi.
// We can cut these clips into segments freely.
// For example, a clip [0, 7] can be cut into segments [0, 1] + [1, 3] + [3, 7].
// Return the minimum number of clips needed so that we can cut the clips into segments that cover the entire sporting event [0, time]. If the task is impossible, return -1.


// Solution 1: Sorting by Start Time

// Sort clips in asc order by their start time.
// Set currTime to 0, maxTime to 0, count (number of clips) to 0, and i (idx in clips) to 0
// Loop while i is in bounds AND currTime hasn't reached time yet
  // increment count by one
  // loop while i is in bounds AND clips[i][0] is in the bounds of currTime
    // set maxTime to Math.max(maxTime, clips[i][1])
    // increment i by one
  // if currTime is equal to maxTime (hasn't moved forward), return -1
  // update currTime to maxTime
// return -1 if currTime hasn't reached time, otherwise return count.

// Time Complexity: O(n log(n)) 93ms
// Space Complexity: O(1) 38.8MB
var videoStitching = function(clips, time) {
  clips = clips.sort((a, b) => a[0] - b[0]);
  let n = clips.length;
  let currTime = 0, maxTime = 0, count = 0, i = 0;
  while (i < n && currTime < time) {
    count++;
    while (i < n && clips[i][0] <= currTime) {
      maxTime = Math.max(maxTime, clips[i][1]);
      i++;
    }
    if (currTime === maxTime) return -1;
    currTime = maxTime;
  }
  return currTime < time ? -1 : count;
};


// Solution 2: Distance Array

// Construct an array 'arr' -> arr[i] means you can reach position arr[i]
// Note: arr is now like a timeline 

// (next part is similar to jump game 2)
// Set currTime to 0, maxTime to 0, count (number of clips) to 0, and i (idx in arr) to 0
// Loop while i is in bounds AND currTime hasn't reached time yet
  // increment count by one
  // loop while i is in bounds AND i is in the bounds of currTime
    // set maxTime to Math.max(maxTime, arr[i])
    // increment i by one
  // if currTime is equal to maxTime (hasn't moved forward), return -1
  // update currTime to maxTime
// return count

// t = time
// Time Complexity: O(n) 68ms
// Space Complexity: O(t) 40.1MB
var videoStitching = function(clips, time) {
  let arr = Array(time + 1).fill(0);
  for (let [start, end] of clips) {
    arr[start] = Math.max(arr[start], end);
  }
  let currTime = 0, maxTime = 0, count = 0, i = 0;
  while (i < time && currTime < time) {
    count++;
    while (i < time && i <= currTime) {
      maxTime = Math.max(maxTime, arr[i]);
      i++;
    }
    if (currTime === maxTime) return -1;
    currTime = maxTime;
  }
  return count;
};

// Three test cases 
console.log(videoStitching([[0,2],[4,6],[8,10],[1,9],[1,5],[5,9]], 10)) // 3
console.log(videoStitching([[0,1],[1,2]], 5)) // -1
console.log(videoStitching([[0,1],[6,8],[0,2],[5,6],[0,4],[0,3],[6,7],[1,3],[4,7],[1,4],[2,5],[2,6],[3,4],[4,5],[5,7],[6,9]], 9)) // 3