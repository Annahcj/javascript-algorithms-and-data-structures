// 2285. Maximum Total Importance of Roads
// You are given an integer n denoting the number of cities in a country. The cities are numbered from 0 to n - 1.
// You are also given a 2D integer array roads where roads[i] = [ai, bi] denotes that there exists a bidirectional road connecting cities ai and bi.
// You need to assign each city with an integer value from 1 to n, where each value can only be used once. The importance of a road is then defined as the sum of the values of the two cities it connects.
// Return the maximum total importance of all roads possible after assigning the values optimally.


// Solution: Sorting

// It is optimal to assign the highest values to the cities with the most roads.
// When there are ties, the order doesn't matter.

// 1. Get the number of roads each city has, in an array "freq".
// 2. Sort freq in descending order.
// 3. Assign values to each city in descending order.
  // The total importance for each city = number of roads * value

// n = number of cities, m = number of roads
// Time Complexity: O(n log(n) + m) 363ms
// Space Complexity: O(n) 70.7MB
var maximumImportance = function(n, roads) {
  let freq = Array(n).fill(0);
  for (let [a, b] of roads) {
    freq[a]++;
    freq[b]++;
  }
  freq.sort((a, b) => b - a);
  let value = n, ans = 0;
  for (let i = 0; i < n; i++) {
    ans += freq[i] * value;
    value--;
  }
  return ans;
};

// Two test cases to run function on
console.log(maximumImportance(5, [[0,1],[1,2],[2,3],[0,2],[1,3],[2,4]])) // 43
console.log(maximumImportance(5, [[0,3],[2,4],[1,3]])) // 20