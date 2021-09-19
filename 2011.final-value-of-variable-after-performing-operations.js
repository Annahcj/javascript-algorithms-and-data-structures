// 2011. Final Value of Variable After Performing Operations


// Solution:

// Loop through operations
  // if operation is '++X' or 'X++', increment ans by one
  // otherwise decrement ans by one
// Return ans

// Time Complexity: O(n) 88ms
// Space Complexity: O(1) 40.3MB
var finalValueAfterOperations = function(operations) {
  let ans = 0;
   for (var operation of operations) {
     if (operation === '++X' || operation === 'X++') ans++;
     else ans--;
   } 
   return ans;
};

// Three test cases to run function on
console.log(finalValueAfterOperations(["--X","X++","X++"])) // 1
console.log(finalValueAfterOperations(["++X","++X","X++"])) // 3
console.log(finalValueAfterOperations(["X++","++X","--X","X--"])) // 0