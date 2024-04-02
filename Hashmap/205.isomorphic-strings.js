// 205. Isomorphic Strings
// Given two strings s and t, determine if they are isomorphic.


// Solution: Hashmap

// Maintain a two-way mapping between s[i] -> t[i] and t[i] -> s[i].
// If at any point, stMap[s[i]] is not equal to t[i] or tsMap[t[i]] is not equal to s[i].

// Time Complexity: O(n) 63ms
// Space Complexity: O(n) 50.8MB
var isIsomorphic = function(s, t) {
  let stMap = {}, tsMap = {};
  for (let i = 0; i < s.length; i++) {
    if (!stMap[s[i]]) stMap[s[i]] = t[i];
    if (!tsMap[t[i]]) tsMap[t[i]] = s[i];
    // two-way mapping
    if (stMap[s[i]] !== t[i] || tsMap[t[i]] !== s[i]) return false;
  }
  return true;
};
  
// Four test cases
console.log(isIsomorphic("egg", "add")) // true
console.log(isIsomorphic("foo", "bar")) // false
console.log(isIsomorphic("paper", "title")) // true
console.log(isIsomorphic("badc", "baba")) // false