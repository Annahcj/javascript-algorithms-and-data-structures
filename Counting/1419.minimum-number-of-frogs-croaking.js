// 1419. Minimum Number of Frogs Croaking
// You are given the string croakOfFrogs, which represents a combination of the string "croak" from different frogs, that is, multiple frogs can croak at the same time, so multiple "croak" are mixed.
// Return the minimum number of different frogs to finish all the croaks in the given string.
// A valid "croak" means a frog is printing five letters 'c', 'r', 'o', 'a', and 'k' sequentially. The frogs have to print all five letters to finish a croak. If the given string is not a combination of a valid "croak" return -1.


// Solution: Counting

// Map an index to each character in "croak", { c: 0, r: 1, o: 2, a: 3, k: 4 }
// Each character should have the previous character in "croak" appear before it.
  // We can keep track of this by counting the past occurances of each character.
  // When we get to a character, we 'cancel' out the occurance of the preceding character.
    // Check to make sure we have an occurance of the preceding character, then subtract the count of it by 1.
    // We do this for all characters except k.

// To count the minimum frogs, keep track of the count of ongoing c's.
  // When we get to a 'k', subtract the count of 'c's by 1.
// The minimum number of frogs is the maximum state of this counter.

// Time Complexity: O(n) 105ms
// Space Complexity: O(1) 45MB
var minNumberOfFrogs = function(croakOfFrogs) {
  let counts = Array(4).fill(0); 
  let index = {
    'c': 0,
    'r': 1,
    'o': 2,
    'a': 3,
    'k': 4
  }
  let count = 0, ans = 0;
  for (let char of croakOfFrogs) {
    if (char !== 'c') {
      let prev = index[char] - 1; // preceding character in "croak"
      if (counts[prev] === 0) return -1;
      counts[prev]--;
    }
    if (char !== 'k') counts[index[char]]++;
    if (char === 'k') count--;
    else if (char === 'c') count++;
    ans = Math.max(ans, count);
  }
  return counts.some(cnt => cnt > 0) ? -1 : ans;
};

// Three test cases
console.log(minNumberOfFrogs("croakcroak")) // 1
console.log(minNumberOfFrogs("crcoakroak")) // 2
console.log(minNumberOfFrogs("croakcrook")) // -1