// 2745. Construct the Longest New String
// You are given three integers x, y, and z.
// You have x strings equal to "AA", y strings equal to "BB", and z strings equal to "AB". You want to choose some (possibly all or none) of these strings and concactenate them in some order to form a new string. This new string must not contain "AAA" or "BBB" as a substring.
// Return the maximum possible length of the new string.
// A substring is a contiguous non-empty sequence of characters within a string.


// Solution: Greedy Logic

// "AB" can be put in three situations:
  // 1. In front of "AA" ("ABAA")
  // 2. Behind "BB" ("BBAB")
  // 3. Can make up the whole string if it's empty
// No matter the configurations of "AA" and "BB", we will always be able to place "AB" somewhere.
// And there are no limits to how many "AB"s we can put since we can just string them together.

// For "AA" and "BB", we need to take the same amount, with a maximum difference of 1.

// Time Complexity: O(1) 106ms
// Space Complexity: O(1) 45.9MB
var longestString = function(x, y, z) {
  let minCount = Math.min(x, y), maxCount = (x > minCount) || (y > minCount) ? minCount + 1 : minCount;
  return (minCount + maxCount + z) * 2;
};

// Two test cases
console.log(longestString(2, 5, 1)) // 12
console.log(longestString(3, 2, 2)) // 14