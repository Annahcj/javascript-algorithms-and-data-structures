// 205. Isomorphic Strings
// Given two strings s and t, determine if they are isomorphic.


// Solution 1: Two Hash Maps

// Since the length of s and t are guaranteed to be equal, we can use one for-loop to traverse both strings.
// For each character in s and t, check if they are already mapped, map them if they aren't, or return false if they are different from their mapped values.

// e.g: 'foo' & 'bar' => 
// loop: 
// i = 0, first map doesn't contain 'f' and second map doesn't contain 'b', so we add them in.
// i = 1, first map doesn't contain 'o' and second map doesn't contain 'a', so we add them in.
// i = 2, first map contains 'o' but it's value ('a') is not equal to 'r', so we return false.

// Time Complexity: O(n) 112ms
// Space Complexity: O(1) 41.7MB (there are maximum 26 characters in each object)

var isIsomorphic = function(s, t) {
    let charsS = {}, charsT = {};
    for (var i = 0; i < s.length; i++) {
      if (!charsS[s[i]] && !charsT[t[i]]) {
        charsS[s[i]] = t[i];
        charsT[t[i]] = s[i];
      } else if (charsS[s[i]] !== t[i] || charsT[t[i]] !== s[i]) {
        return false;
      }
    }
    return true;
  };
  
  // Four test cases to run function on
  console.log(isIsomorphic("egg", "add")) // true
  console.log(isIsomorphic("foo", "bar")) // false
  console.log(isIsomorphic("paper", "title")) // true
  console.log(isIsomorphic("badc", "baba")) // false