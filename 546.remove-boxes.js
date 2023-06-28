// 546. Remove Boxes
// You are given several boxes with different colors represented by different positive numbers.
// You may experience several rounds to remove boxes until there is no box left. Each time you can choose some continuous boxes with the same color (i.e., composed of k boxes, k >= 1), remove them and get k * k points.
// Return the maximum points you can get.


// Solution: DP

// Memoize each dp(left, right, count), where
  // left and right is the current range
  // count = the count of consecutive boxes equal to boxes[left] on the left

// For each dp(left, right, count), count the number of consecutive boxes equal to boxes[left] starting from the current index. Then, we have a few choices:
  // 1. Remove the current consecutive boxes, plus any consecutive boxes from the left side. We start new at dp(i, right, 0).
  // 2. Go through each boxes[j] where boxes[j] === boxes[left] and try to extend the consecutive chain. We are essentially removing these boxes last within this range.

// Time Complexity: O(n^4) 248ms 
// Space Complexity: O(n^3) 90.7MB
var removeBoxes = function(boxes) {
  let n = boxes.length, memo = Array(n).fill(0).map(() => Array(n).fill(0).map(() => Array(n + 1).fill(-1)));
  return dp(0, n - 1, 0);
  
  function dp(left, right, count) {
    if (left > right) return 0;
    if (memo[left][right][count] !== -1) return memo[left][right][count];
    
    let newCount = count + 1, i = left + 1;
    while (boxes[i] === boxes[left] && i <= right) i++, newCount++;
    let ans = newCount * newCount + dp(i, right, 0); // end current consecutive sequence
    for (let j = i; j <= right; j++) {
      if (boxes[j] === boxes[left]) {
        // extend sequence and make it the last to be removed within this range
        ans = Math.max(ans, dp(i, j - 1, 0) + dp(j, right, newCount));
      }
    }
    return memo[left][right][count] = ans;
  }
};

// Three test cases
console.log(removeBoxes([1,3,2,2,2,3,4,3,1])) // 23
console.log(removeBoxes([1,1,1])) // 9
console.log(removeBoxes([1])) // 1