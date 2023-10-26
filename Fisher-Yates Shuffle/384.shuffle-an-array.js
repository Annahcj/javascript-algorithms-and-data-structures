// 384. Shuffle an Array
// Given an integer array nums, design an algorithm to randomly shuffle the array. All permutations of the array should be equally likely as a result of the shuffling.


// Solution: Fisher/Yates Shuffle

// Runtime on LeetCode: 220ms
// Memory Usage on LeetCode: 52.9MB

// Logic:
// Loop through the array from start to end (pointer = i)
  // choose a random index in between i (inclusive) and copy.length - 1
  // swap array[i] with array[random index]
  
var Solution = function(nums) {
  this.arr = nums;  
};

Solution.prototype.reset = function() {
  return this.arr;  
};
// T.C: O(n)
Solution.prototype.shuffle = function() {
  let copy = [...this.arr];
  let n = copy.length;
  for (var i = 0; i < n; i++) {
    let randomIdx = Math.floor(Math.random() * (n - i) + i);
    [copy[i], copy[randomIdx]] = [copy[randomIdx], copy[i]];
  }
  return copy;
};