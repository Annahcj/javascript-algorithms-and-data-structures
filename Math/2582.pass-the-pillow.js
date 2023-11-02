// 2582. Pass the Pillow
// There are n people standing in a line labeled from 1 to n. The first person in the line is holding a pillow initially. Every second, the person holding the pillow passes it to the next person standing in the line. Once the pillow reaches the end of the line, the direction changes, and people continue passing the pillow in the opposite direction.
  // For example, once the pillow reaches the nth person they pass it to the n - 1th person, then to the n - 2th person and so on.
// Given the two positive integers n and time, return the index of the person holding the pillow after time seconds.


// Solution: Math

// Get number of rounds: Math.floor(time / n-1).
  // If the number of rounds is even, then the direction of the last round was left-to-right.
  // If the number of rounds is odd, then the direction of the last round was right-to-left.

// The distance traveled in the last round = time % n-1
// If number of rounds is even, the position = time % n-1
// If number of rounds is odd, the position = n - (time % n-1)

// Time Complexity: O(1) 62ms
// Space Complexity: O(1) 41.3MB
var passThePillow = function(n, time) {
  let rounds = Math.floor(time / (n - 1)), pos = time % (n - 1);
  return rounds % 2 === 0 ? pos + 1 : n - pos;
};

// Two test cases
console.log(passThePillow(4, 5)) // 2
console.log(passThePillow(3, 2)) // 3