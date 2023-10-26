// 147. Insertion Sort List
// Given the head of a singly linked list, sort the list using insertion sort, and return the sorted list's head.
// The steps of the insertion sort algorithm:
  // 1. Insertion sort iterates, consuming one input element each repetition and growing a sorted output list.
  // 2. At each iteration, insertion sort removes one element from the input data, finds the location it belongs within the sorted list and inserts it there.
  // 3. It repeats until no input elements remain.


// LeetCode provided ListNode
function ListNode(val, next) {
  this.val = (val===undefined ? 0 : val)
  this.next = (next===undefined ? null : next)
}

// generates a linked list from an array (TESTING PURPOSES ONLY!)
function makeLL(arr) {
  let head = new ListNode(), node = head;
  for (var num of arr) {
    node.next = new ListNode(num);
    node = node.next;
  }
  return head.next;
}

// Solution: Insertion Sort w/ Dummy Head

// Create a dummy head with the value -Infinity so that nodes will always be placed after it.

// For each node in the list:
  // 1. Find the insert position in the dummy list 
  // 2. Insert it into the dummy list

var insertionSortList = function(head) {
  let dummy = new ListNode(-Infinity);
  while (head) {
    let next = head.next; // save the next node because we will be reassigning pointers before we move to the next node

    let node = dummy;
    while (node.next && node.next.val < head.val) {
      node = node.next;
    }
    head.next = node.next; 
    node.next = head; // insert head at the insert position

    head = next;
  }  
  return dummy.next;
};

// Two test cases to run function on
console.log(insertionSortList(makeLL([4,2,1,3]))) // [1,2,3,4]
console.log(insertionSortList(makeLL([-1,5,3,4,0]))) // [-1,0,3,4,5]