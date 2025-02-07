// 3440. Reschedule Meetings for Maximum Free Time II
// You are given an integer eventTime denoting the duration of an event. You are also given two integer arrays startTime and endTime, each of length n.
// These represent the start and end times of n non-overlapping meetings that occur during the event between time t = 0 and time t = eventTime, where the ith meeting occurs during the time [startTime[i], endTime[i]].
// You can reschedule at most one meeting by moving its start time while maintaining the same duration, such that the meetings remain non-overlapping, to maximize the longest continuous period of free time during the event.
// Return the maximum amount of free time possible after rearranging the meetings.
// Note that the meetings can not be rescheduled to a time outside the event and they should remain non-overlapping.
// Note: In this version, it is valid for the relative ordering of the meetings to change after rescheduling one meeting.


// Solution: Prefix Maximum Gap

// 1. Collect meetings into a tuple (startTime, endTime) and sort by either start or end.
// 2. Two passes to calculate the maximum gap between meetings on the left and right of every index.
  // maxGapRight[i] = maximum gap between meetings to the right of index i.
  // maxGapLeft = maximum gap between meetings to the left of the current index.
// 3. Iterate through every three adjacent meetings and calculate the largest gap:
  // a. Move the middle meeting outside of the window. Use the precalculated maximum gap on the left and right to determine if there is a gap available.
  // b. Move the middle meeting to the position immediately left of the rightmost meeting or immediately right of the leftmost meeting.
    // Calculated by taking the gap between the third and first meeting and subtracting the middle meeting's duration. 

// n = number of meetings
// Time Complexity: O(n log(n)) 101ms
// Space Complexity: O(n) 87.32MB
function maxFreeTime(eventTime, startTime, endTime) {
  const meetings = [[0, 0]];
  for (let i = 0; i < startTime.length; i++) {
    meetings.push([startTime[i], endTime[i]]);
  }
  meetings.sort((a, b) => a[0] - b[0]);
  meetings.push([eventTime, eventTime]);
  const n = meetings.length, maxGapRight = Array(n + 1).fill(0);
  for (let i = n - 2; i >= 0; i--) {
    // gap = next meeting's start time - current meeting's end time
    maxGapRight[i] = Math.max(maxGapRight[i + 1], meetings[i + 1][0] - meetings[i][1]);
  }
  let maxGapLeft = 0, maxGap = 0;
  for (let i = 2; i < n; i++) {
    if (i > 2) {
      maxGapLeft = Math.max(maxGapLeft, meetings[i - 2][0] - meetings[i - 3][1]);
    }
    // gap between right meeting and left meeting minus the duration of the middle meeting
    const middleMeetingDuration = meetings[i - 1][1] - meetings[i - 1][0];
    maxGap = Math.max(maxGap, meetings[i][0] - meetings[i - 2][1] - middleMeetingDuration);
    // if there is a big enough gap outside of this window, move the middle meeting out
    if (Math.max(maxGapLeft, maxGapRight[i]) >= middleMeetingDuration) {
      maxGap = Math.max(maxGap, meetings[i][0] - meetings[i - 2][1]);
    }
  }
  return maxGap;
};

// Two test cases
console.log(maxFreeTime(5, [1,3], [2,5])) // 2
console.log(maxFreeTime(10, [0,7,9], [1,8,10])) // 7