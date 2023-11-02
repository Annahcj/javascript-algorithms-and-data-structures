// 2683. Neighboring Bitwise XOR
// A 0-indexed array derived with length n is derived by computing the bitwise XOR (⊕) of adjacent values in a binary array original of length n.
// Specifically, for each index i in the range [0, n - 1]:
  // If i = n - 1, then derived[i] = original[i] ⊕ original[0].
  // Otherwise, derived[i] = original[i] ⊕ original[i + 1].
// Given an array derived, your task is to determine whether there exists a valid binary array original that could have formed derived.
// Return true if such an array exists or false otherwise.
  // A binary array is an array containing only 0's and 1's


// Solution: Fix original[0] 

// If we fix original[0], we can derive the rest of the original array: original[i + 1] = original[i] ^ derived[i + 1].
// Lastly, we check whether original[n - 1] ^ original[0] = derived[n - 1].
// If fixing original[0] as 0 or 1 is valid, return true.

// Time Complexity: O(n) 132ms
// Space Complexity: O(1) 56.1MB
var doesValidArrayExist = function(derived) {
  let n = derived.length;
  return isValid(0) || isValid(1);
  
  function isValid(startVal) {
    let val = startVal;
    for (let i = 0; i < n - 1; i++) {
      let nextVal = val ^ derived[i];
      val = nextVal;
    }
    return derived[n - 1] === (val ^ startVal);
  }  
};

// Three test cases
console.log(doesValidArrayExist([1,1,0])) // true
console.log(doesValidArrayExist([1,1])) // true
console.log(doesValidArrayExist([1,0])) // false