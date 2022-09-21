// 985. Sum of Even Numbers After Queries
// You are given an integer array nums and an array queries where queries[i] = [vali, indexi].
// For each query i, first, apply nums[indexi] = nums[indexi] + vali, then print the sum of the even values of nums.
// Return an integer array answer where answer[i] is the answer to the ith query.


// Solution: Counting

// Count the initial even numbers and keep track of the sum after each query.
// For each query [val, index], update nums[index] and check whether it is even/odd before and after the query.
  // even -> even = add val to total sum
  // even -> odd = subtract nums[index] (previous value) 
  // odd -> even = add nums[index] (new value) to the total sum
  // odd -> odd = do nothing

// n = length of nums, m = number of queries
// Time Complexity: O(n + m) 187ms
// Space Complexity: O(1) (not including output) 50.3MB
var sumEvenAfterQueries = function(nums, queries) {
  let evenSum = nums.reduce((sum, num) => {
    return num % 2 === 0 ? sum + num : sum;
  }, 0);
  
  let answer = Array(queries.length);
  queries.forEach(([val, index], i) => {
    let prevVal = nums[index], newVal = nums[index] + val;
    nums[index] += val;
    if (prevVal % 2 === 0) {
      if (newVal % 2 === 0) evenSum += val;
      else evenSum -= prevVal;
    } else if (newVal % 2 === 0) {
      evenSum += newVal;
    }
    answer[i] = evenSum;
  });
  return answer;
};

// Two test cases to run function on
console.log(sumEvenAfterQueries([1,2,3,4], [[1,0],[-3,1],[-4,0],[2,3]])) // [8,6,2,4]
console.log(sumEvenAfterQueries([1], [[4,0]])) // [0]