// 1130. Minimum Cost Tree From Leaf Values
// Given an array arr of positive integers, consider all binary trees such that:
// Each node has either 0 or 2 children;
// The values of arr correspond to the values of each leaf in an in-order traversal of the tree.
// The value of each non-leaf node is equal to the product of the largest leaf value in its left and right subtree, respectively.
// Among all possible binary trees considered, return the smallest possible sum of the values of each non-leaf node. It is guaranteed this sum fits into a 32-bit integer.


// Solution: Greedy Approach


// Until array has a length of 1,
  // 1. Find the index of the smallest number
  // 2. Create a non-leaf node with the smallest num * the smaller neighbor -> increment ans by the product
  // 3. Remove the smallest number from the array
    // We can remove the smallest number because now that we have made a new node, 
    // the smallest number doesn't need to be used again as we need the LARGEST leaf node

// Time Complexity: O(n^2) 72ms
// Space Complexity: O(n) 39.2MB
var mctFromLeafValues = function(arr) {
  let ans = 0;
  while (arr.length > 1) {
    let minIdx = -1;
    // find index of the smallest num
    for (var i = 0; i < arr.length; i++) {
      if (minIdx === -1 || arr[minIdx] > arr[i]) minIdx = i;
    }
    if (minIdx === 0) ans += arr[minIdx] * arr[minIdx + 1]; // only right neighbor
    else if (minIdx === arr.length - 1) ans += arr[minIdx] * arr[minIdx - 1]; // only left neighbor
    else ans += arr[minIdx] * Math.min(arr[minIdx - 1], arr[minIdx + 1]); // get smaller neighbor
    arr.splice(minIdx, 1); // remove from arr
  }  
  return ans;
};

// Two test cases to run function on
console.log(mctFromLeafValues([6,2,4])) // 32
console.log(mctFromLeafValues([4,11])) // 44