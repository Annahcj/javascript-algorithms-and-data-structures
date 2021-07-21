// 821. Shortest Distance to a Character
// Given a string s and a character c that occurs in s, return an array of integers answer where answer.length == s.length and answer[i] is the distance from index i to the closest occurrence of character c in s.
// The distance between two indices i and j is abs(i - j), where abs is the absolute value function.


// Solution 1: Two Pass

// Keep a previous index (prev) which records the last recorded index of c, and an empty result array which we will return as the answer at the end.
// Loop from left to right (pointer = i), 
  // If s[i] is equal to c, update prev to i.
  // Push Infinity if prev is equal to Infinity, otherwise push current index - last index of c (i - prev)
// Reset prev to Infinity (since we are coming from the right side).
// Now loop from right to left (pointer = j),
  // If s[j] is equal to c, update prev to i.
  // If prev - j is smaller than result[j] (distance recorded when looping from left to right), replace result[j] with prev - j.
// When iteration is done, return result.

// Time Complexity: O(n) (technically O(2n)) 76ms
// Space Complexity: O(n) (length of answer array) 41.3MB
var shortestToChar = function(s, c) {
    let result = [], prev = Infinity;
    for (var i = 0; i < s.length; i++) {
      if (s[i] === c) prev = i;
      result.push(prev === Infinity ? Infinity : i - prev);
    }
    prev = Infinity;
    for (var j = s.length - 1; j >= 0; j--) {
      if (s[j] === c) prev = j;
      result[j] = Math.min(result[j], prev - j);
    }
    return result;
  };
  
  // Two test cases to run function on
  console.log(shortestToChar("loveleetcode", "e")) // [3,2,1,0,1,0,0,1,2,2,1,0]
  console.log(shortestToChar("aaab", "b")) // [3,2,1,0]