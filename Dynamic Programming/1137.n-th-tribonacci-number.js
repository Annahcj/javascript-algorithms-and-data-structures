// 1137. N-th Tribonacci Number
// The Tribonacci sequence Tn is defined as follows: 
// T0 = 0, T1 = 1, T2 = 1, and Tn+3 = Tn + Tn+1 + Tn+2 for n >= 0.
// Given n, return the value of Tn.


// Solution: Dynamic Programming

// Use an array 'tri' to store the tribonacci number for each number from 0 to n
// Set tri[0] to 0, tri[1] to 1, and tri[2] to 1.
// Then, loop through from 3 to n (pointer = i)
  // set tri[i] to tri[i - 3] + tri[i - 2] + tri[i - 1]
// Return tri[n]

// Time Complexity: O(n) 80ms
// Space Complexity: O(n) 38.8MB
var tribonacci = function(n) {
  let tri = Array(n + 1);
  tri[0] = 0, tri[1] = 1, tri[2] = 1;
  for (let i = 3; i <= n; i++) {
    tri[i] = tri[i - 3] + tri[i - 2] + tri[i - 1];
  }
  return tri[n];
};

// Two test cases 
console.log(tribonacci(4)) // 4
console.log(tribonacci(25)) // 1389537