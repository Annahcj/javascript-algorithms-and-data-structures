// 1282. Group the People Given the Group Size They Belong To
// There are n people that are split into some unknown number of groups. Each person is labeled with a unique ID from 0 to n - 1.
// You are given an integer array groupSizes, where groupSizes[i] is the size of the group that person i is in. For example, if groupSizes[1] = 3, then person 1 must be in a group of size 3.
// Return a list of groups such that each person i is in a group of size groupSizes[i].
// Each person should appear in exactly one group, and every person must be in a group. If there are multiple answers, return any of them. It is guaranteed that there will be at least one valid solution for the given input.


// Solution: Hashmap

// Keep track of ongoing groups grouped by group size as we go through each person.
// When a group of people with the same gropu size reaches the group size, we push the group of people to the result array and reset the group to an empty array.

// n = number of people
// Time Complexity: O(n) 70ms
// Space Complexity: O(n) 46.8MB
var groupThePeople = function(groupSizes) {
  let groupMap = {}, groups = [];
  for (let i = 0; i < groupSizes.length; i++) {
    let groupSize = groupSizes[i];
    if (!groupMap[groupSize]) groupMap[groupSize] = [];
    groupMap[groupSize].push(i);
    if (groupMap[groupSize].length === groupSize) {
      groups.push(groupMap[groupSize]);
      groupMap[groupSize] = [];
    }
  }
  return groups;
};

// Two test cases
console.log(groupThePeople([3,3,3,3,3,1,3])) // [[5],[0,1,2],[3,4,6]]
console.log(groupThePeople([2,1,3,3,3,2])) // [[1],[0,5],[2,3,4]]