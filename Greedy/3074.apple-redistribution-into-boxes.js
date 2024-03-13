// 3074. Apple Redistribution into Boxes
// You are given an array apple of size n and an array capacity of size m.
// There are n packs where the ith pack contains apple[i] apples. There are m boxes as well, and the ith box has a capacity of capacity[i] apples.
// Return the minimum number of boxes you need to select to redistribute these n packs of apples into boxes.
// Note that, apples from the same pack can be distributed into different boxes.


// Solution: Greedy w/ Sorting

// It's optimal to use the boxes with the maximum capacity.
// Sort capacity in desc order.

// Since apples can be split across multiple boxes, get the total sum of apples and assign them to the boxes in desc order until they have all been distributed. 

// n = length of apple, m = length of capacity
// Time Complexity: O(m log(m) + n) 58ms
// Space Complexity: O(log(m)) (space for sorting) 50.8MB
var minimumBoxes = function(apple, capacity) {
  capacity.sort((a, b) => b - a);
  let totalApples = apple.reduce((sum, count) => sum + count);
  for (let i = 0; i < capacity.length; i++) {
    totalApples -= capacity[i];
    if (totalApples <= 0) return i + 1;
  }
  return capacity.length;
};

// Two test cases
console.log(minimumBoxes([1,3,2], [4,3,1,5,2])) // 2
console.log(minimumBoxes([5,5,5], [2,4,2,7])) // 4