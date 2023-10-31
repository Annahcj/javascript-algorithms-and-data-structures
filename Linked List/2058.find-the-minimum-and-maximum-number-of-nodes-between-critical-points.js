// 2058. Find the Minimum and Maximum Number of Nodes Between Critical Points


// Solution: Get Indexes

// Loop through head, keep track of the index of where we are, and push the index into an array everytime the conditions match.
// If length of the index array is smaller than 2, return [-1, -1]
// Otherwise, loop through the index array, and compare adjacent indexes to find the minimum difference.
// Return [minimum difference, last index - first index].

// Time Complexity: O(n) 188ms
// Space Complexity: O(n) 71.3MB
var nodesBetweenCriticalPoints = function(head) {
  let idxs = [];
  let i = 0, prev = null;
  while (head) {
    if (prev) {
      if (head.next) {
        if ((head.val < prev.val && head.val < head.next.val) || (head.val > prev.val && head.val > head.next.val)) idxs.push(i);
      }
    }
    i++;
    prev = head;
    head = head.next;
  }
  if (idxs.length < 2) return [-1, -1];
  let min = Infinity, max = idxs[idxs.length - 1] - idxs[0];
  for (i = 1; i < idxs.length; i++) {
    min = Math.min(min, idxs[i] - idxs[i - 1]);
  }
  return [min, max];
};