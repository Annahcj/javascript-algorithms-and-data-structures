// 984. String Without AAA or BBB
// Given two integers a and b, return any string s such that:
  // s has length a + b and contains exactly a 'a' letters, and exactly b 'b' letters,
  // The substring 'aaa' does not occur in s, and
  // The substring 'bbb' does not occur in s.


// Solution: Greedy 

// If the last two characters were equal, we must use the other character.
// Otherwise, we can use the character with more occurances (to balance out the two counts as much as possible).

// Time Complexity: O(n^2) 71ms
  // Appending to a string costs O(n) each time
// Space Complexity: O(1) (not including output) 43.2MB
var strWithout3a3b = function(a, b) {
  let res = "";
  while (a > 0 || b > 0) {
    let lastTwo = res.slice(res.length - 2);
    if (lastTwo === 'aa') {
      res += 'b';
      b--;
    } else if (lastTwo === 'bb') {
      res += 'a';
      a--;
    } else if (a > b) {
      res += 'a';
      a--;
    } else {
      res += 'b';
      b--;
    }
  }
  return res;
};

// Two test cases 
console.log(strWithout3a3b(1, 2)) // "bba"
console.log(strWithout3a3b(4, 1)) // "aabaa"