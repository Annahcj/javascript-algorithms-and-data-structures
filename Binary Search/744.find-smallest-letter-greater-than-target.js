// 744. Find Smallest Letter Greater Than Target
// You are given an array of characters letters that is sorted in non-decreasing order, and a character target. There are at least two different characters in letters.
// Return the smallest character in letters that is lexicographically greater than target. If such a character does not exist, return the first character in letters.


// Solution: Binary Search

// Binary search for the leftmost letter which is larger than target.

// Time Complexity: O(log(n)) 63ms
// Space Complexity: O(1) 43.2MB
var nextGreatestLetter = function(letters, target) {
  let low = 0, high = letters.length;
  while (low < high) {
    let mid = Math.floor((low + high) / 2);
    if (letters[mid] > target) high = mid;
    else low = mid + 1;
  }
  return letters[low] > target ? letters[low] : letters[0];
};

// Three test cases
console.log(nextGreatestLetter(["c","f","j"], "a")) // "c"
console.log(nextGreatestLetter(["c","f","j"], "c")) // "f"
console.log(nextGreatestLetter(["x","x","y","y"], "z")) // "x"