// 817. Linked List Components
// You are given the head of a linked list containing unique integer values and an integer array nums that is a subset of the linked list values.
// Return the number of connected components in nums where two values are connected if they appear consecutively in the linked list.


// Solution: Hashset

// Use a hashset for nums for quick lookup.
// Once we find a value that isn't in nums, the linked list is split.
  // If we currently tracking a connected component, increase the count of connected components.

// Time Complexity: O(n) 74ms
// Space Complexity: O(n) 42.2MB
var numComponents = function(head, nums) {
  nums = new Set(nums);
  let count = 0, isComponent = false;
  while (head) {
    if (!nums.has(head.val)) {
      if (isComponent) count++;
      isComponent = false;
    } else {
      isComponent = true;
    }
    head = head.next;
  }
  if (isComponent) count++;
  return count;
};