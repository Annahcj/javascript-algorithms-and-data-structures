// 3439. Reschedule Meetings for Maximum Free Time I
// You are given an integer eventTime denoting the duration of an event, where the event occurs from time t = 0 to time t = eventTime.
// You are also given two integer arrays startTime and endTime, each of length n. These represent the start and end time of n non-overlapping meetings, where the ith meeting occurs during the time [startTime[i], endTime[i]].
// You can reschedule at most k meetings by moving their start time while maintaining the same duration, to maximize the longest continuous period of free time during the event.
// The relative order of all the meetings should stay the same and they should remain non-overlapping.
// Return the maximum amount of free time possible after rearranging the meetings.
// Note that the meetings can not be rescheduled to a time outside the event.


// Solution: Sliding Window

// Maintain a sliding window of size k + 2 and store the running sum of meetings within the window.
// Within each window, move all meetings as left as possible or right as possible such that there is no space in between the meetings.
// This maximizes the longest continuous gap.
// This can be calculated by: last meeting start time - first meeting end time - sum of meeting durations in between first and last meetings.

// Time Complexity: O(n) 3ms
// Space Complexity: O(1) 66.36MB
function maxFreeTime(eventTime, k, startTime, endTime) {
  const n = startTime.length;
  let durationSum = 0, maxGap = 0;
  for (let i = 0; i < n; i++) {
    durationSum += endTime[i] - startTime[i];
    if (i >= k) {
      durationSum -= endTime[i - k] - startTime[i - k];
    }
    if (i >= k - 1) {
      const lastMeetingStart = i === n - 1 ? eventTime : startTime[i + 1];
      const firstMeetingEnd = i - k < 0 ? 0 : endTime[i - k];
      const gap = lastMeetingStart - firstMeetingEnd - durationSum;
      maxGap = Math.max(maxGap, gap);
    }
  }
  return maxGap;
};

// Two test cases
console.log(maxFreeTime(5, 1, [1,3], [2,5])) // 2
console.log(maxFreeTime(10, 1, [0,2,9], [1,4,10])) // 6