// 1023. Camelcase Matching
// Given an array of strings queries and a string pattern, return a boolean array answer where answer[i] is true if queries[i] matches pattern, and false otherwise.
// A query word queries[i] matches pattern if you can insert lowercase English letters pattern so that it equals the query. You may insert each character at any position and you may not insert any characters.


// Solution: Two Pointers

// Check whether each query is a subsequence of pattern.
// However, only lowercase letters may be skipped in the query.

// 1. If query[i] matches pattern[j], increment j.
// 2. If they don't match and query[i] is lowercase, increment i. (in this case, the for loop increments it automatically)
// 3. If they don't match and query[i] is uppercase, return false. 

// At the end of the match, the pattern is fully matched is j is equal to pattern.length

// n = queries.length, m = length of longest query
// Time Complexity: O(nm)
// Space Complexity: O(1) (not including output)
var camelMatch = function(queries, pattern) {
  let n = queries.length, res = Array(n);
  for (let i = 0; i < n; i++) {
    res[i] = isMatch(queries[i], pattern);
  }
  return res;
  
  function isMatch(query, pattern) {
    let j = 0;
    for (let i = 0; i < query.length; i++) {
      if (query[i] === pattern[j]) j++;
      else if (query[i] >= 'A' && query[i] <= 'Z') return false;
    }
    return j === pattern.length;
  }
};

// Two test cases 
console.log(camelMatch(["FooBar","FooBarTest","FootBall","FrameBuffer","ForceFeedBack"], "FB")) // [true,false,true,true,false]
console.log(camelMatch(["FooBar","FooBarTest","FootBall","FrameBuffer","ForceFeedBack"], "FoBa")) // [true,false,true,false,false]