// 3076. Shortest Uncommon Substring in an Array
// You are given an array arr of size n consisting of non-empty strings.
// Find a string array answer of size n such that:
  // answer[i] is the shortest substring of arr[i] that does not occur as a substring in any other string in arr. If multiple such substrings exist, answer[i] should be the lexicographically smallest. And if no such substring exists, answer[i] should be an empty string.
// Return the array answer.


// Solution: Global & Local Hashmap

// 1. Generate each substring in every string and store the count in a hashmap.
// 2. For each string, generate each substring again and keep track of another hashmap to store counts for this string.
  // If the total count of a substring excluding the counts for the current string, is 0, then this substring only exists in this string. 
  // Store the lexicographically smallest string where this is true.

// n = length of arr, k = max(arr[i].length)
// Time Complexity: O(n * k^3) 346ms
// Space Complexity: O(n * k^2) 81.2MB
var shortestSubstrings = function(arr) {
  let substrCount = {}, n = arr.length;
  for (let str of arr) {
    for (let i = 0; i < str.length; i++) {
      for (let j = i; j < str.length; j++) {
        let substr = str.slice(i, j + 1);
        substrCount[substr] = (substrCount[substr] || 0) + 1;
      }
    }
  }
  let ans = Array(n).fill("");
  for (let i = 0; i < n; i++) {
    let str = arr[i];
    for (let len = 1; len <= str.length; len++) {
      let count = {}, res = "";
      for (let j = 0; j <= str.length - len; j++) {
        let substr = str.slice(j, j + len);
        count[substr] = (count[substr] || 0) + 1;
        
        let countOthers = substrCount[substr] - count[substr];
        if (countOthers === 0) {
          if (res.length === 0 || substr.localeCompare(res) <= 0) {
            res = substr;
          }
        }
      }
      if (res.length > 0) {
        ans[i] = res;
        break;
      }
    }
  }
  return ans;
};

// Two test cases
console.log(shortestSubstrings(["cab","ad","bad","c"])) // ["ab","","ba",""]
console.log(shortestSubstrings(["abc","bcd","abcd"])) // ["","","abcd"]