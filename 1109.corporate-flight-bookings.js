// 1109. Corporate Flight Bookings
// There are n flights that are labeled from 1 to n.
// You are given an array of flight bookings bookings, where bookings[i] = [first[i], last[i], seats[i]] represents a booking for flights firsti through last[i] (inclusive) with seats[i] seats reserved for each flight in the range.
// Return an array answer of length n, where answer[i] is the total number of seats reserved for flight i.


// Solution: Prefix Sum & Line Sweep

// Count the number of seats on each flight,
  // seatsCount[first] += seats
  // seatsCount[last + 1] -= seats
// Since each first/last is offset by +1, we need to offset everything by -1.
// Then, prefix sum over seatsCount to get the total number of seats for each flight. 
  // sum([seatsCount[0], ..., seatsCount[i]]) = number of seats for flight i

// n = number of flights, m = number of bookings
// Time Complexity: O(n + m) 215ms
// Space Compleixty: O(n) 63.5MB
var corpFlightBookings = function(bookings, n) {
  let seatsCount = Array(n + 1).fill(0);
  for (let [first, last, seats] of bookings) {
    seatsCount[first - 1] += seats;
    seatsCount[last] -= seats;
  }

  let ans = Array(n), seats = 0;
  for (let i = 0; i < n; i++) {
    seats += seatsCount[i];
    ans[i] = seats;
  }
  return ans;
};

// Two test cases
console.log(corpFlightBookings([[1,2,10],[2,3,20],[2,5,25]], 5)) // [10,55,45,25,25]
console.log(corpFlightBookings([[1,2,10],[2,2,15]], 2)) // [10,25]