// 440. K-th Smallest in Lexicographical Order
// Given two integers n and k, return the kth lexicographically smallest integer in the range [1, n].


// Solution: Prefix Tree / Trie

// Turn it into a tree structure, where each subtree consists of nodes whose values contain the same prefix as the root.
//     1            2
//  10 11 12 ... 20 21 22 ...
// 100....

// Keep reducing k to 1, 
  // If the number of nodes in the subtree is greater than or equal to k, the kth number is within the subtree and we should move to the leftmost child node.
  // Otherwise, the kth number is outside the current subtree and we should move to the right child.

// Time Complexity: O(log(n) * log(n)) 42ms
// Space Complexity: O(1) 48.8MB
function findKthNumber(n, k) {
  let num = 1;
  while (k > 1) {
    let count = getCount(num, n);
    if (count >= k) { // kth number is within this subtree
      num *= 10; // go downwards
      k--;
    } else {
      num++; // go to the right child
      k -= count;
    }
  } 
  return num;
};

// level-by-level
function getCount(start, max) {
  let end = start + 1;
  let count = 0;
  while (start <= max) {
    count += Math.min(end, max + 1) - start;
    start *= 10, end *= 10;
  }
  return count;
}

// Two test cases
console.log(findKthNumber(13, 2)) // 10
console.log(findKthNumber(1, 1)) // 1