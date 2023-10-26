// 47. Permutations II
// Given a collection of numbers, nums, that might contain duplicates, return all possible unique permutations in any order.


// Solution 1: Swap w/ HashMap

// let res be our results array
// let length = nums.length
// backtrack: (start (index), current arr)
  // Base case: If start is equal to length - 1
    // Push a copy of arr into res 
    // return
  // Initiate a new Map 'unique' (we will use this to make sure we don't put duplicates in our result)
  // Loop through from start to length - 1 (pointer = i)
    // If unique doesn't contain nums[i]
      // swap nums[start] with nums[i]
      // call backtrack(start + 1, arr)
      // swap back nums[start] with nums[i]
    // Add nums[i] to unique
// call backtrack(0, nums)
// return res.

// Time Complexity: O(n * n!) 96ms
// Space Complexity: O(n + n!) (hashmap & callstack) 43.6MB
  var permuteUnique = function(nums) {
    let res = [];
    let length = nums.length;
    backtrack(0, nums);
    return res;
    function backtrack(start, arr) {
      if (start === length - 1) {
        res.push([...arr]);
        return;
      }
      let unique = new Map();
      for (var i = start; i < length; i++) {
        if (!unique.has(nums[i])) {
          [nums[start], nums[i]] = [nums[i], nums[start]];
          backtrack(start + 1, arr);
          [nums[start], nums[i]] = [nums[i], nums[start]];
        }
        unique.set(nums[i]);
      }
    } 
  };
  
  // Solution 2: Building Up Arr w/ HashMap
  
  // backtrack: (arr (to build up), nums (to take from))
    // Base case: If arr.length is equal to length
      // push arr into res
      // return
    // Initiate a new Map 'unique'
    // Loop through nums from 0 to the end (pointer = i)
      // If unique doesn't contain nums[i]
        // Push nums[i] into arr
        // Call backtrack on [...arr] (deep copy), [...str.slice(0, i), ...str.slice(i + 1)] (nums without nums[i]) 
        // Pop from arr
  // Call backtrack([], nums)
  // Return res.
  
  // Time Complexity: O(n * n!) 100ms
  // Space Complexity: O(n + n!) 45.3MB
  var permuteUnique = function(nums) {
    let res = [];
    let length = nums.length;
    backtrack([], nums);
    return res;
    function backtrack(arr, nums) {
      if (arr.length === length) {
        res.push(arr);
        return;
      }
      let unique = new Map();
      for (var i = 0; i < nums.length; i++) {
        if (!unique.has(nums[i])) {
          arr.push(nums[i]);
          backtrack([...arr], [...nums.slice(0, i), ...nums.slice(i + 1)]);
          arr.pop();
        }
        unique.set(nums[i]);
      }
    }
  };
  
  // EXTRA: Permutations for a string
  // Everything is the same except we append to the string instead of pushing and popping in an array.
  var permuteStr = function(str) {
    let res = [];
    let length = str.length;
    backtrack([], str);
    return res;
    function backtrack(curr, str) {
      if (curr.length === length) {
        res.push(curr);
        return;
      }
      let unique = new Map();
      for (var i = 0; i < str.length; i++) {
        if (!unique.has(str[i])) {
          backtrack(curr + str[i], [...str.slice(0, i), ...str.slice(i + 1)]);        
        }
        unique.set(str[i]);
      }
    }
  };
  // A test case for string permutation
  console.log(permuteStr('112')) // [[1,1,2],[1,2,1],[2,1,1]]
  
  // Two test cases to run function on
  console.log(permuteUnique([1,1,2])) // [[1,1,2],[1,2,1],[2,1,1]]
  console.log(permuteUnique([1,2,3])) // [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]