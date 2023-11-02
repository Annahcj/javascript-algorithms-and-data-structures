// 78. Subsets
// Given an integer array nums of unique elements, return all possible subsets (the power set).
// The solution set must not contain duplicate subsets. Return the solution in any order.


// Solution: Backtracking 

// Time Complexity: O(2^n) 84ms
// Space Complexity: O(n) 40.8MB
var subsets = function(nums) {
  let res = [];
  recurse(0, []);
  return res;

  function recurse(idx, arr) {
    // create deep copy of arr
    res.push([...arr]);
    for (let i = idx; i < nums.length; i++) {
      // push 
      arr.push(nums[i]);
      recurse(i + 1, arr);
      // backtrack, pop off
      arr.pop();
    }
  }  
};

// Two test cases
console.log(subsets([1,2,3])) // [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
console.log(subsets([0])) // [[],[0]]