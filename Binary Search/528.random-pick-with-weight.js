// 528. Random Pick with Weight
// You are given an array of positive integers w where w[i] describes the weight of ith index (0-indexed).
// We need to call the function pickIndex() which randomly returns an integer in the range [0, w.length - 1]. pickIndex() should return the integer proportional to its weight in the w array. For example, for w = [1, 3], the probability of picking the index 0 is 1 / (1 + 3) = 0.25 (i.e 25%) while the probability of picking the index 1 is 3 / (1 + 3) = 0.75 (i.e 75%).
// More formally, the probability of picking index i is w[i] / sum(w).


// Logic:
// We create a range -> the total sum of all numbers
// Then, we can use a prefix sum array to create a range between each number.
// For e.g: [1,3,5]
// The total sum is 9, which means the prefix sum array would be [1,4,9]
// Since w[0] has a 1/9 change of being picked, the prefix sum arr shows that it's range is 0-1.
// w[1] has a 3/9 chance of being picked, so the prefix sum arr shows that it's range is 1-4.
// w[2] has a 5/9 chance of being picked, the prefix sum arr shows that it's range is 4-9.
// So, we pick a random number from 0 to 8.

// Steps:
// 1. Generate prefix sum array, and get the total sum of numbers.
// 2. Pick random number from 0 to total sum - 1
// 3. Search through prefix sum array until we find the correct range


// Solution 1: Linear Search

// pickIndex:
// Pick a random index between 0 and total - 1
// Loop through pSum (pointer = i)
  // return i when randomNum is smaller than pSum[i]

// Time Complexity: O(n + n) 232ms -> O(n) for prefixSum, O(n) for pickIndex
// Space Complexity: O(n) 48.3MB
var Solution = function(w) {
  this.pSum = [];
  this.total = 0;
  for (var i = 0; i < w.length; i++) {
    this.total += w[i];
    this.pSum.push(this.total);
  }  
};

Solution.prototype.pickIndex = function() {
  let randomNum = Math.floor(this.total * Math.random());
  for (var i = 0; i < this.pSum.length; i++) {           
    if (randomNum < this.pSum[i]) return i;
  }
};

// Solution 2: Binary Search

// Instead of doing a linear search, we can speed up the time complexity to O(log(n)) by using binary search.
// Keep everything the same, except the searching part.

// Pick a random number
// Set two pointers -> i to 0, j to pSum.length - 1
// Loop while i is smaller than j
  // mid = Math.floor((i + j) / 2)
  // if random num is bigger than or equal to pSum[mid], set i to mid + 1
  // otherwise, set j to mid (because mid could be the answer)
// Return i

// Time Complexity: O(n + log(n)) 184ms -> O(n) for prefixSum, O(log(n)) for pickIndex
// Space Complexity: O(n) 48.1MB
var Solution = function(w) {
  this.pSum = [];
  this.total = 0;
  for (var i = 0; i < w.length; i++) {
    this.total += w[i];
    this.pSum.push(this.total);
  }  
};

Solution.prototype.pickIndex = function() {
  let randomNum = Math.floor(this.total * Math.random());
  let i = 0, j = this.pSum.length - 1;
  while (i < j) {
    let mid = Math.floor((i + j) / 2);
    if (randomNum >= this.pSum[mid]) i = mid + 1;
    else j = mid;
  }
  return i;
};

// A few test cases to run function on
let solution = new Solution([1, 3]);
console.log(solution.pickIndex()); // return 1. It's returning the second element (index = 1) that has probability of 3/4.
console.log(solution.pickIndex()); // return 1
console.log(solution.pickIndex()); // return 1
console.log(solution.pickIndex()); // return 1
console.log(solution.pickIndex()); // return 0.