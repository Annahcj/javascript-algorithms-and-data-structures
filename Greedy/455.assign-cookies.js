// 455. Assign Cookies
// Assume you are an awesome parent and want to give your children some cookies. But, you should give each child at most one cookie.
// Each child i has a greed factor g[i], which is the minimum size of a cookie that the child will be content with; and each cookie j has a size s[j]. If s[j] >= g[i], we can assign the cookie j to the child i, and the child i will be content. Your goal is to maximize the number of your content children and output the maximum number.

 
// Solution: Greedy w/ Sorting & Two Pointers

// It's optimal to give cookies to children with the smallest greed factors.
// Sort g and s in asc order.
// Use two pointers to iterate through g and s:
  // Move the pointer in g up incrementally, this is the anchor.
  // Move the pointer in s up while s[j] < g[i] (it's optimal to assign the smallest possible cookie to the current child. and since g is sorted in asc order, if s[j] can't satisfy g[i], then it will not satisfy any other children coming up).

// n = length of g, m = length of s
// Time Complexity: O(n log(n) + m log(m)) 123ms
// Space Complexity: O(log(n) + log(m)) 44.7MB
var findContentChildren = function(g, s) {
  g.sort((a, b) => a - b);
  s.sort((a, b) => a - b);
  let n = g.length, m = s.length;
  for (let i = 0, j = 0; i < n; i++) {
    while (j < m && s[j] < g[i]) j++;
    if (j === m) return i;
    j++;
  }
  return n;
};

// Two test cases
console.log(findContentChildren([1,2,3], [1,1])) // 1
console.log(findContentChildren([1,2], [1,2,3])) // 2