// 274. H-Index
// Given an array of integers citations where citations[i] is the number of citations a researcher received for their ith paper, return compute the researcher's h-index.
// According to the definition of h-index on Wikipedia: A scientist has an index h if h of their n papers have at least h citations each, and the other n − h papers have no more than h citations each.
// If there are several possible values for h, the maximum one is taken as the h-index.


// Solution 1: Sorting

// Time Complexity: O(n log(n)) 56ms
// Space Complexity: O(log(n)) (space for sorting) 42.4MB
var hIndex = function(citations) {
  citations.sort((a, b) => a - b);
  let n = citations.length, ans = 0;
  for (let i = 0; i < n; i++) {
    ans = Math.max(ans, Math.min(n - i, citations[i])); // n - i papers with citation >= citations[i]
  }
  return ans;
};

// Solution 2: Counting Sort

// count[i] = number of papers with a citation of i.
// Loop through count from back to front, keeping the running sum of all papers in count.
  // the maximum h-index is the maximum of Math.min(i, sum) for each i.
    // i: the citation
    // sum: the total number of papers with a citation >= i

// Time Complexity: O(n) 87ms
// Space Complexity: O(1000) 43.3MB
var hIndex = function(citations) {
  let count = Array(1001).fill(0);
  for (let citation of citations) count[citation]++;
  
  let papers = 0, ans = 0;
  for (let i = 1000; i >= 0; i--) {
    papers += count[i];
    ans = Math.max(ans, Math.min(i, papers));
  }
  return ans;
};

// Two test cases to run function on
console.log(hIndex([3,0,6,1,5])) // 3
console.log(hIndex([1,3,1])) // 1