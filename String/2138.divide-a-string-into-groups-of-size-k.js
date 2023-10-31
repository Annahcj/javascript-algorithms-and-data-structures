// 2138. Divide a String Into Groups of Size k
// A string s can be partitioned into groups of size k using the following procedure:
// The first group consists of the first k characters of the string, the second group consists of the next k characters of the string, and so on. Each character can be a part of exactly one group.
// For the last group, if the string does not have k characters remaining, a character fill is used to complete the group.
// Note that the partition is done so that after removing the fill character from the last group (if it exists) and concatenating all the groups in order, the resultant string should be s.
// Given the string s, the size of each group k and the character fill, return a string array denoting the composition of every group s has been divided into, using the above procedure.


// Solution: Pad and Group

// e.g: s = abcd, k = 3
// number of groups: 2
// groups * k = 2 * 3 = 6.
// extraFill = groups * k - s.length = 6 - 4 = 2.
// fill s with extraFill number of fill: abcd -> abcdxx

// after filling, simply take groups of k.

// Time Complexity: O(n) 117ms
// Space Complexity: O(1) (not including output) 39.7MB
var divideString = function(s, k, fill) {
  let groups = Math.ceil(s.length / k);  
  let extraFill = groups * k - s.length; 
  if (extraFill > 0) {
    s += fill.repeat(extraFill);
  }
  let res = [];
  for (let i = 0; i < s.length; i += k) {
    res.push(s.slice(i, i + k));
  }
  return res;
};

// Two test cases
console.log(divideString("abcdefghi", 4, "x")) // ["abc","def","ghi"]
console.log(divideString("abcdefghij", 4, "x")) // ["abc","def","ghi","jxx"]