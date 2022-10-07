// 732. My Calendar III
// A k-booking happens when k events have some non-empty intersection (i.e., there is some time that is common to all k events.)
// You are given some events [start, end), after each given event, return an integer k representing the maximum k-booking between all the previous events.
// Implement the MyCalendarThree class:
  // MyCalendarThree() Initializes the object.
  // int book(int start, int end) Returns an integer k representing the largest integer such that there exists a k-booking in the calendar.


// Solution: Sweep Line w/ Hashmap

// Keep a hashmap of counts.
// To represent change to the counts: 
  // start: map[start]++
  // end: map[end]--
// Then, prefix sum over the points in sorted order.
// The prefix sum will represent the number of active events at each point.

// Since 0 <= start < end <= 10^9, we can use a hashmap instead of an array to keep track of only the start/end points.
// Integer keys in Javascript hashmaps are sorted in ascending order by default.

// n = number of calls to book
// Time Complexity: O(n^2) 2132ms
// Space Complexity: O(n) 56.9MB
var MyCalendarThree = function() {
  this.map = {}; 
};

MyCalendarThree.prototype.book = function(start, end) {
  this.map[start] = (this.map[start] || 0) + 1;
  this.map[end] = (this.map[end] || 0) - 1;
  
  let pSum = 0, maxK = 0;
  for (let point in this.map) {
    let count = this.map[point];
    pSum += count;
    maxK = Math.max(maxK, pSum);
  }
  return maxK;
};

// A few test cases
let myCalendarThree = new MyCalendarThree();
console.log(myCalendarThree.book(10, 20)); // return 1, The first event can be booked and is disjoint, so the maximum k-booking is a 1-booking.
console.log(myCalendarThree.book(50, 60)); // return 1, The second event can be booked and is disjoint, so the maximum k-booking is a 1-booking.
console.log(myCalendarThree.book(10, 40)); // return 2, The third event [10, 40)) intersects the first event, and the maximum k-booking is a 2-booking.
console.log(myCalendarThree.book(5, 15)); // return 3, The remaining events cause the maximum K-booking to be only a 3-booking.
console.log(myCalendarThree.book(5, 10)); // return 3
console.log(myCalendarThree.book(25, 55)); // return 3