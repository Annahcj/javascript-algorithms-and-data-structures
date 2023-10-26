// 19. Remove Nth Node From End of List
// Given the head of a linked list, remove the nth node from the end of the list and return its head.

// Leetcode-provided linked list node structure
function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
  }
  // function to make linked list for testing purposes
  const makeList = arr => {
    let node, head = node = new ListNode(arr[0]);
    for (var i = 1; i < arr.length; i++) {
      node.next = new ListNode(arr[i]);
      node = node.next;
    }
    return head;
  }
  
  // Solution 1: Two pointers
  
  // We keep two pointers, keep one pointer n steps behind.
  // Loop to send the faster pointer n steps ahead, then set the slower pointer to head.
  // Loop again, moving both pointers forward until the faster pointer's next element is null,
  // then we can get rid of the next element of the slower pointer.
  // Return head.
  
  // Time Complexity: O(n) 108ms
  // Space Complexity: O(1) 40.2MB
  
  var removeNthFromEnd = function(head, n) {
    let p2 = head, p1;
    for (var i = 0; i < n; i++) {
      p2 = p2.next;
    }
    if (!p2) return head.next;
    p1 = head;
    while (p2.next) {
      p2 = p2.next, p1 = p1.next;
    }
    p1.next = p1.next.next;
    return head;
  };
  
  // Three test cases to run function on
  console.log(removeNthFromEnd(makeList([1,2,3,4]), 4)) // 2 -> 3 -> 4
  console.log(removeNthFromEnd(makeList([1,2,3,4,5,6,7]), 6)) // 1 -> 3 -> 4 -> 5 -> 6 -> 7
  console.log(removeNthFromEnd(makeList([1,2,3,4,5]), 2)) // 1 -> 2 -> 4 -> 5