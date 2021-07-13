// 1347. Minimum Number of Steps to Make Two Strings Anagram
// Given two equal-size strings s and t. In one step you can choose any character of t and replace it with another character.
// Return the minimum number of steps to make t an anagram of s.


// Solution 1: Count Same Characters

// Basically, we count the number of characters in 't' that match the ones in 's', then we subtract length of 's' off the number of matching characters.

// Steps =>
// Store number of occurance for each letter in s in an object.
// Traverse t, incrementing counter and decrementing off map["character"] if character is in map.
// Return the length of s - counter.

// Time Complexity: O(n) 236ms
// Space Complexity: O(s) (all unique characters in s) 44.3MB
var minSteps = function(s, t) {
    let sMap = {};
    let sameCharCount = 0;
    for (var i = 0; i < s.length; i++) sMap[s[i]] = (sMap[s[i]] || 0) + 1; 
    for (var j = 0; j < t.length; j++) {
      if (sMap[t[j]]) {
        sameCharCount++;
        sMap[t[j]]--;
      }
    }
    return s.length - sameCharCount;
  };
  
  // Four test cases to run function on
  console.log(minSteps("bab", "aba")) // 1
  console.log(minSteps("leetcode", "practice")) // 5
  console.log(minSteps("anagram", "mangaar")) // 0
  console.log(minSteps("friend", "family")) // 4