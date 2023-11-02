// 2305. Fair Distribution of Cookies
// You are given an integer array cookies, where cookies[i] denotes the number of cookies in the ith bag. You are also given an integer k that denotes the number of children to distribute all the bags of cookies to. All the cookies in the same bag must go to the same child and cannot be split up.
// The unfairness of a distribution is defined as the maximum total cookies obtained by a single child in the distribution.
// Return the minimum unfairness of all distributions.


// Solution: Brute Force w/ Backtracking

// Keep track of k "buckets".
// For each cookie, try to put it in each of the k buckets.
// Get the minimum maximum sum out of the k buckets (each bucket must not be empty).

// Time Complexity: O(k^n) 522ms
// Space Complexity: O(n + k) 42.4MB
var distributeCookies = function(cookies, k) {
  let res = Infinity, n = cookies.length;
  backtrack(0, Array(k).fill(0));
  return res;

  function backtrack(i, sum) {
    if (i === n) {
      for (let j = 0; j < k; j++) {
        if (sum[j] === 0) return; // one bucket is empty
      }
      let max = Math.max(...sum);
      res = Math.min(res, max);
      return;
    }
    for (let j = 0; j < k; j++) {
      sum[j] += cookies[i];
      backtrack(i + 1, sum);
      sum[j] -= cookies[i];
    }
  }  
};

// Two test cases
console.log(distributeCookies([8,15,10,20,8], 2)) // 31
console.log(distributeCookies([6,1,3,2,2,4,1,2], 3)) // 7