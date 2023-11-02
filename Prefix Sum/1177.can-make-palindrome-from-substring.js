// 1177. Can Make Palindrome from Substring
// You are given a string s and array queries where queries[i] = [lefti, righti, ki]. We may rearrange the substring s[lefti...righti] for each query and then choose up to ki of them to replace with any lowercase English letter.
// If the substring is possible to be a palindrome string after the operations above, the result of the query is true. Otherwise, the result is false.
// Return a boolean array answer where answer[i] is the result of the ith query queries[i].
// Note that each letter is counted individually for replacement, so if, for example s[lefti...righti] = "aaa", and ki = 2, we can only replace two of the letters. Also, note that no query modifies the initial string s.


// Solution: Prefix Sum & Bitmask

// Prefix sum of character counts.
// Since we only care about the character counts being odd/even, we can store the counts in a bitmask (0 = even, 1 = odd).
// To get the character counts for s[left, ..., right], get counts[right] XOR counts[left - 1].
  // (We can offset counts by +1 to handle the case of accessing index -1).

// If the substring has an even length, we need oddCount / 2 <= k to be a palindrome. (At most half of odd counts <= k)
// If the substring has an odd length, we need (oddCount - 1) / 2 <= k to be a palindrome. (We can have an extra odd count in the middle of the palindrome)

// n = length of s, m = number of queries
// Time Complexity: O(n + m) 327ms
// Space Complexity: O(n + m) 81.2MB
var canMakePaliQueries = function(s, queries) {
  let n = s.length, counts = Array(n + 1).fill(0);
  let runningCount = 0;
  for (let i = 0; i < n; i++) {
    let charcode = s.charCodeAt(i) - 97;
    runningCount ^= (1 << charcode);
    counts[i + 1] = runningCount;
  }
  
  let m = queries.length, ans = Array(m);
  for (let i = 0; i < m; i++) {
    let [left, right, k] = queries[i];
    let count = counts[right + 1] ^ counts[left];
    let oddCount = 0;
    for (let i = 0; i < 26; i++) {
      let bit = (count >> i) & 1;
      oddCount += bit;
    }
    let isOddLength = (right - left + 1) % 2 === 1;  
    ans[i] = isOddLength ? (oddCount - 1) / 2 <= k : oddCount / 2 <= k;
  }
  return ans;
};

// Two test cases
console.log(canMakePaliQueries("aacda", [[3,3,0],[1,2,0],[0,3,1],[0,3,2],[0,4,1]])) // [true,false,false,true,true]
console.log(canMakePaliQueries("lyb", [[0,1,0],[2,2,1]])) // [false,true]