// 2280. Minimum Lines to Represent a Line Chart
// You are given a 2D integer array stockPrices where stockPrices[i] = [dayi, pricei] indicates the price of the stock on day dayi is pricei. A line chart is created from the array by plotting the points on an XY plane with the X-axis representing the day and the Y-axis representing the price and connecting adjacent points.


// Solution: Sorting & Slope w/ GCD

// To find the slope between two points, first get the difference between 
  // 1. the two x coordinates
  // 2. the two y coordinates
// Then, find the GCD between these two differences.
// Get the slope as two coordinates: [dayDiff / gcd, priceDiff / gcd]
// We are basically simplifying the two differences down as small as possible so that we will know whether the points are on the same slope.

// Time Complexity: O(n log(n)) 462ms
// Space Complexity: O(log(n)) (space for sorting) 76.1MB
var minimumLines = function(stockPrices) {
  stockPrices.sort((a, b) => a[0] - b[0]);
  let n = stockPrices.length, ans = 0, dayDiff = Infinity, priceDiff = Infinity;
  for (let i = 1; i < n; i++) {
    let diffs = getSlope(stockPrices[i - 1], stockPrices[i]);
    if (dayDiff !== diffs[0] || priceDiff !== diffs[1]) {
      ans++;
      dayDiff = diffs[0], priceDiff = diffs[1];
    }
  }
  return ans;

  function getSlope(stock1, stock2) {
    let dayDiff = stock2[0] - stock1[0];
    let priceDiff = stock2[1] - stock1[1];
    let slopeGCD = gcd(dayDiff, priceDiff);
    return [dayDiff / slopeGCD, priceDiff / slopeGCD];
  }
  
  function gcd(a, b) {
    if (b === 0) return a;
    return gcd(b, a % b);
  }
};

// Three test cases
console.log(minimumLines([[1,7],[2,6],[3,5],[4,4],[5,4],[6,3],[7,2],[8,1]])) // 3
console.log(minimumLines([[3,4],[1,2],[7,8],[2,3]])) // 1
console.log(minimumLines([[1,10]])) // 0