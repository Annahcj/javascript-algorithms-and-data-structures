// 1229. Meeting Scheduler
// Given the availability time slots arrays slots1 and slots2 of two people and a meeting duration duration, return the earliest time slot that works for both of them and is of duration duration.
// If there is no common time slot that satisfies the requirements, return an empty array.
// The format of a time slot is an array of two elements [start, end] representing an inclusive time range from start to end.
// It is guaranteed that no two availability slots of the same person intersect with each other. That is, for any two time slots [start1, end1] and [start2, end2] of the same person, either start1 > end2 or start2 > end1.


// Solution: Two Pointers w/ Sort

// 1. Sort slots1 and slots2 in asc order by their start times
// 2. Two pointers: i, j
  // get largest possible interval in slots1[i] and slots2[j]
  // if that interval is long enough (>= duration), return [start, start + duration]
  // otherwise, if slots[i]'s end is smaller than slots[j]'s end, increment i
  // otherwise increment j


// Proof of 'slots1[i][1] < slots2[j][1]':
// If slots1[i][1] < slots2[j][1], that means slots1[i] will not intersect with slots2[j + 1] at all since no two intervals overlap AND they are sorted by their start times.

// For e.g: 
// slots1: [[10,15], [16,30]]
// slots2: [[0,30], [40,50]]
// if i = 0 and j = 0, since slots1[0][1] < slots2[0][1], we increment i.
// slots1[0][1] (15) is smaller than slots2[1][0], which means they don't intersect at all.

// Time Complexity: O(n log(n) + m log(m)) 204ms
// Space Complexity: O(log(n)) (sorting) 49MB
var minAvailableDuration = function(slots1, slots2, duration) {
  slots1.sort((a, b) => a[0] - b[0]);
  slots2.sort((a, b) => a[0] - b[0]);
  let i = 0, j = 0;
  while (i < slots1.length && j < slots2.length) {
    let start = Math.max(slots1[i][0], slots2[j][0]);
    let end = Math.min(slots1[i][1], slots2[j][1]);
    if (end - start >= duration) return [start, start + duration];
    if (slots1[i][1] < slots2[j][1]) i++;
    else j++;
  }  
  return [];
};

// Two test cases to run function on
console.log(minAvailableDuration([[10,50],[60,120],[140,210]], [[0,15],[60,70]], 8)) // [60,68]
console.log(minAvailableDuration([[10,50],[60,120],[140,210]], [[0,15],[60,70]], 12)) // []