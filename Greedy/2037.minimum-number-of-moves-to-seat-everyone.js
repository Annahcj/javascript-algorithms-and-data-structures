// 2037. Minimum Number of Moves to Seat Everyone
// There are n seats and n students in a room. You are given an array seats of length n, where seats[i] is the position of the ith seat. You are also given the array students of length n, where students[j] is the position of the jth student.
// You may perform the following move any number of times:
  // Increase or decrease the position of the ith student by 1 (i.e., moving the ith student from position x to x + 1 or x - 1)
// Return the minimum number of moves required to move each student to a seat such that no two students are in the same seat.
// Note that there may be multiple seats or students in the same position at the beginning.


// Solution: Greedy w/ Sorting

// Each student needs to be assigned to the corresponding seat in sorted order.
// It's optimal to move each students[i] to seats[i], in sorted order for both.
// Return the sum of the absolute difference between each students[i] and seats[i].

// Time Complexity: O(n log(n)) 65ms
// Space Complexity: O(log(n)) (space for sorting) 51.4MB
var minMovesToSeat = function(seats, students) {
  seats.sort((a, b) => a - b);
  students.sort((a, b) => a - b);
  let n = seats.length, moves = 0;
  for (let i = 0; i < n; i++) {
    moves += Math.abs(seats[i] - students[i]);
  }
  return moves;
};

// Three test cases
console.log(minMovesToSeat([3,1,5], [2,7,4])) // 4
console.log(minMovesToSeat([4,1,5,9], [1,3,2,6])) // 7
console.log(minMovesToSeat([2,2,6,6], [1,3,2,6])) // 4