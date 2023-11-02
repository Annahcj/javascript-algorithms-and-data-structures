// 2483. Minimum Penalty for a Shop
// You are given the customer visit log of a shop represented by a 0-indexed string customers consisting only of characters 'N' and 'Y':
  // if the ith character is 'Y', it means that customers come at the ith hour
  // whereas 'N' indicates that no customers come at the ith hour.
// If the shop closes at the jth hour (0 <= j <= n), the penalty is calculated as follows:
  // For every hour when the shop is open and no customers come, the penalty increases by 1.
  // For every hour when the shop is closed and customers come, the penalty increases by 1.
// Return the earliest hour at which the shop must be closed to incur a minimum penalty.
// Note that if a shop closes at the jth hour, it means the shop is closed at the hour j.


// Solution: Left & Right Penalty 

// Go through each customers[j], simulate closing the shop at hour j+1
  // keep track of the penalty on the left and right of each index j.
    // leftPenalty: penalty for when shop is open, for hours on the left of j
    // rightPenalty: penalty for when shop is closed, for hours on the right of j
  // update the left and right penalty as we move j.
  // store the minimum penalty and the hour.
  // update the minimum penalty and hour if we get a smaller penalty.

// Time Complexity: O(n) 121ms
// Space Complexity: O(1) 45.4MB
var bestClosingTime = function(customers) {
  let n = customers.length, leftPenalty = 0, rightPenalty = 0;
  for (let j = 0; j < n; j++) {
    rightPenalty += customers[j] === 'Y' ? 1 : 0;
  }
  
  let minPenalty = rightPenalty, hour = 0;
  for (let j = 0; j < n; j++) {
    leftPenalty += customers[j] === 'N' ? 1 : 0;
    rightPenalty -= customers[j] === 'Y' ? 1 : 0;
    if (leftPenalty + rightPenalty < minPenalty) {
      minPenalty = leftPenalty + rightPenalty;
      hour = j + 1;
    }
  }
  return hour;
};

// Three test cases
console.log(bestClosingTime("YYNY")) // 2
console.log(bestClosingTime("NNNNN")) // 0
console.log(bestClosingTime("YYYY")) // 4