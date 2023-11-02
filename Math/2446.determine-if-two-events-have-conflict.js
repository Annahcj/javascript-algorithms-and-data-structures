// 2446. Determine if Two Events Have Conflict
// You are given two arrays of strings that represent two inclusive events that happened on the same day, event1 and event2, where:
  // event1 = [startTime1, endTime1] and
  // event2 = [startTime2, endTime2].
// Event times are valid 24 hours format in the form of HH:MM.
// A conflict happens when two events have some non-empty intersection (i.e., some moment is common to both events).
// Return true if there is a conflict between two events. Otherwise, return false.


// Solution: Convert to Minutes & Compare

// Convert each time string into minutes.
// If end1 >= start1, we know there can be overlap.
// For the case where event1 is completely out of range of event2, we additionally check that start1 <= end2.

// Time Complexity: O(1) 79ms
// Space Complexity: O(1) 42.3MB
var haveConflict = function(event1, event2) {
  let start1 = getMinutes(event1[0]), end1 = getMinutes(event1[1]);
  let start2 = getMinutes(event2[0]), end2 = getMinutes(event2[1]);
  return end1 >= start2 && start1 <= end2;
};

function getMinutes(timeStr) {
  let hours = Number(timeStr.slice(0, 2));
  let mins = Number(timeStr.slice(3));
  return hours * 60 + mins;
}

// Three test cases
console.log(haveConflict(["01:15","02:00"], ["02:00","03:00"])) // true
console.log(haveConflict(["01:00","02:00"], ["01:20","03:00"])) // true
console.log(haveConflict(["10:00","11:00"], ["14:00","15:00"])) // false