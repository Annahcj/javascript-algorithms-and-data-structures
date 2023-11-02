// 2167. Minimum Time to Remove All Cars Containing Illegal Goods
// You are given a 0-indexed binary string s which represents a sequence of train cars. s[i] = '0' denotes that the ith car does not contain illegal goods and s[i] = '1' denotes that the ith car does contain illegal goods.
// As the train conductor, you would like to get rid of all the cars containing illegal goods. You can do any of the following three operations any number of times:
  // 1. Remove a train car from the left end (i.e., remove s[0]) which takes 1 unit of time.
  // 2. Remove a train car from the right end (i.e., remove s[s.length - 1]) which takes 1 unit of time.
  // 3. Remove a train car from anywhere in the sequence which takes 2 units of time.
// Return the minimum time to remove all the cars containing illegal goods.
// Note that an empty sequence of cars is considered to have no cars containing illegal goods.


// Solution: One Pass

// leftCnt = minimum time to remove all 1's from 0 to i.
// If s[i] is 1, set leftCnt to the minimum of:
  // 1. Remove from middle: leftCnt + 2
  // 2. Remove incrementally from left side: i + 1 
// Remove from the right side incrementally: n - i - 1 
// So the cost is leftCnt + n - i - 1.

// Take the minimum leftCnt + n - i - 1.

// Time Complexity: O(n) 147ms
// Space Complexity: O(1) 53.6MB
var minimumTime = function(s) {
  let leftCnt = 0, ans = Infinity, n = s.length;
  for (let i = 0; i < n; i++) {
    if (s[i] === '1') {
      leftCnt = Math.min(leftCnt + 2, i + 1);
    }
    ans = Math.min(ans, leftCnt + n - i - 1);
  }
  return ans;
};

// Three test cases
console.log(minimumTime("1100101")) // 5
console.log(minimumTime("0010")) // 2
console.log(minimumTime("0100110")) // 5