// 46. Permutations
// Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.


// Solution: Backtracking

// Algorithm:
// Let res be the array in which we push the permuations.
// length = nums.length
// call backtrack(nums, 0, length - 1)
// return res
// backtrack: (arr, start, end)
  // Base case: If start is equal to end, push [...arr] (deep copy) into res
  // Else
    // Loop through arr from start to end (pointer = i)
      // Swap arr[start] with arr[i]
      // call backtrack(arr, start + 1, end)
      // Swap back (backtrack) arr[start] and arr[i]
    

// Time Complexity: O(n * n!) 84ms
// Space Complexity: O(n!) 42.2MB
  var permute = function(nums) {
    let res = [];
    let length = nums.length;
    backtrack(nums, 0, length - 1);
    return res;
    function backtrack(arr, start, end) {
      if (start === end) {
        res.push([...arr]);
      } else {
        for (var i = start; i < length; i++) {
          [arr[start], arr[i]] = [arr[i], arr[start]];
          backtrack(arr, start + 1, end);
          [arr[start], arr[i]] = [arr[i], arr[start]];
        }
      }
    }  
  };
  
  // Three test cases to run function on
  console.log(permute([1,2,3])) // [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
  console.log(permute([0,1])) // [[0,1],[1,0]]
  console.log(permute([1])) // [[1]]