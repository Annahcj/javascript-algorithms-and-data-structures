// 2746. Decremental String Concatenation
// You are given a 0-indexed array words containing n strings.
// Let's define a join operation join(x, y) between two strings x and y as concatenating them into xy. However, if the last character of x is equal to the first character of y, one of them is deleted.
// For example join("ab", "ba") = "aba" and join("ab", "cde") = "abcde".
// You are to perform n - 1 join operations. Let str0 = words[0]. Starting from i = 1 up to i = n - 1, for the ith operation, you can do one of the following:
  // Make str[i] = join(str[i - 1], words[i])
  // Make str[i] = join(words[i], str[i - 1])
// Your task is to minimize the length of strn - 1.
// Return an integer denoting the minimum possible length of str[n - 1].


// Solution: DP 

// Memoize each dp(i, firstChar, lastChar), where 
  // i = index in words
  // firstChar = the first character of the current str
  // lastChar = the last character of the current str

// For each dp(i, firstChar, lastChar), either join words[i] at the front or back of the current string.
// Record and return the option with the minimum length.

// Time Complexity: O(n * 26^2) 298ms
// Space Complexity: O(n * 26^2) 68.2MB
var minimizeConcatenatedLength = function(words) {
  let n = words.length, memo = new Map();
  return words[0].length + dp(1, words[0][0], words[0][words[0].length - 1]);
  
  function dp(i, firstChar, lastChar) {
    if (i === n) return 0;
    let key = `${i},${firstChar},${lastChar}`;
    if (memo.has(key)) return memo.get(key);
    
    let costToAppendFront = words[i][words[i].length - 1] === firstChar ? words[i].length - 1 : words[i].length;
    let appendFront = costToAppendFront + dp(i + 1, words[i][0], lastChar);
    let costToAppendBack = words[i][0] === lastChar ? words[i].length - 1 : words[i].length;
    let appendBack = costToAppendBack + dp(i + 1, firstChar, words[i][words[i].length - 1]);
    let ans = Math.min(appendFront, appendBack);
    memo.set(key, ans);
    return ans;
  }
}; 

// Three test cases
console.log(minimizeConcatenatedLength(["aa","ab","bc"])) // 4
console.log(minimizeConcatenatedLength(["ab","b"])) // 2
console.log(minimizeConcatenatedLength(["aaa","c","aba"])) // 6