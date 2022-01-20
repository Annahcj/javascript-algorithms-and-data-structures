// 1395. Count Number of Teams
// There are n soldiers standing in a line. Each soldier is assigned a unique rating value.
// You have to form a team of 3 soldiers amongst them under the following rules:
  // Choose 3 soldiers with index (i, j, k) with rating (rating[i], rating[j], rating[k]).
  // A team is valid if: (rating[i] < rating[j] < rating[k]) or (rating[i] > rating[j] > rating[k]) where (0 <= i < j < k < n).
// Return the number of teams you can form given the conditions. (soldiers can be part of multiple teams).


// Solution: Count in Left & Right

// Calculate combinations with j as middle element, find:
  // smaller on the left, bigger on the right
  // bigger on the left, smaller on the right

// The number of teams the middle soldier can be in is: 
  // 1. Increasing: smaller left * bigger right
  // 2. Decreasing: bigger left * smaller right

// Time Complexity: O(n^2) 100ms
// Space Complexity: O(1) 39.5MB
var numTeams = function(rating) {
  let n = rating.length, res = 0;
  for (var j = 1; j < n - 1; j++) {
    let smallerLeft = 0, biggerRight = 0;
    let biggerLeft = 0, smallerRight = 0;
    for (var i = 0; i < n; i++) {
      if (rating[i] < rating[j]) {
        if (i < j) smallerLeft++;
        else smallerRight++;
      } else if (rating[i] > rating[j]) {
        if (i < j) biggerLeft++;
        else biggerRight++;
      }
    }
    res += smallerLeft * biggerRight + biggerLeft * smallerRight;
  }
  return res;
};

// Three test cases to run function on
console.log(numTeams([2,5,3,4,1])) // 3
console.log(numTeams([2,1,3])) // 0
console.log(numTeams([1,2,3,4])) // 4