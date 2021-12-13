// 2106. Maximum Fruits Harvested After at Most K Steps
// Fruits are available at some positions on an infinite x-axis. You are given a 2D integer array fruits where fruits[i] = [positioni, amounti] depicts amounti fruits at the position positioni. fruits is already sorted by positioni in ascending order, and each positioni is unique.
// You are also given an integer startPos and an integer k. Initially, you are at the position startPos. From any position, you can either walk to the left or right. It takes one step to move one unit on the x-axis, and you can walk at most k steps in total. For every position you reach, you harvest all the fruits at that position, and the fruits will disappear from that position.
// Return the maximum total number of fruits you can harvest.


// Solution: Prefix Sum & Sliding Window

// 1. Calculate the prefix sums of the fruits from left to right.
// 2. Loop through all possibilities of walking right, then left (includes just walking right). Record the max amount of fruit harvested.
// 3. Loop through all possibilities of walking left, then right (includes just walking left). Record the max amount of fruit harvested.

// Time Complexity: O(n) 560ms
// Space Complexity: O(10^5) 70.5MB
var maxTotalFruits = function(fruits, startPos, k) {
  let max = 10 ** 5 * 2 + 1;
  let pSum = Array(max).fill(0), maxCount = 0;
  for (var [idx, fruit] of fruits) pSum[idx] = fruit;
  for (var i = 1; i < max; i++) pSum[i] += pSum[i - 1];
  for (var right = Math.min(max - 1, startPos + k); right >= startPos; right--) {
    let walked = right - startPos, remaining = k - walked;
    let endPos = right - remaining, leftRange = Math.max(Math.min(endPos, startPos), 0) - 1;
    let leftFruitsCount = leftRange === -1 ? 0 : pSum[leftRange];
    maxCount = Math.max(maxCount, pSum[right] - leftFruitsCount);
  }
  for (var left = Math.max(0, startPos - k); left <= startPos; left++) {
    let walked = startPos - left, remaining = k - walked;
    let endPos = left + remaining, rightRange = Math.min(max - 1, Math.max(startPos, endPos));
    let leftFruitsCount = left === 0 ? 0 : pSum[left - 1];
    maxCount = Math.max(maxCount, pSum[rightRange] - leftFruitsCount);
  }
  return maxCount;
};

// Three test cases to run function on
console.log(maxTotalFruits([[2,8],[6,3],[8,6]], 5, 4)) // 9
console.log(maxTotalFruits([[0,9],[4,1],[5,7],[6,2],[7,4],[10,9]], 5, 4)) // 14
console.log(maxTotalFruits([[0,3],[6,4],[8,5]], 3, 2)) // 0