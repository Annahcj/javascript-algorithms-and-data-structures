// 729. My Calendar I
// You are implementing a program to use as your calendar. We can add a new event if adding the event will not cause a double booking.
// A double booking happens when two events have some non-empty intersection (i.e., some moment is common to both events.).
// The event can be represented as a pair of integers start and end that represents a booking on the half-open interval [start, end), the range of real numbers x such that start <= x < end.
// Implement the MyCalendar class:
  // MyCalendar() Initializes the calendar object.
  // boolean book(int start, int end) Returns true if the event can be added to the calendar successfully without causing a double booking. Otherwise, return false and do not add the event to the calendar.


// Solution: Brute Force

// Keep each interval in a set.
// If we find an interval with overlap, return false.
  // e.g: [10,20] <- [15,25]
  // to get the overlap, get the minimum end - the maximum start (20 - 15 = 5)
    // if the overlap <= 0, there is no overlap.
    // if the overlap > 0, there is overlap.

// Time Complexity: O(n^2) 4740ms
// Space Complexity: O(n) 63.3MB
var MyCalendar = function() {
  this.intervals = new Set();
};

MyCalendar.prototype.book = function(start, end) {
  let intervals = this.intervals;
  for (let interval of intervals) {
    let [x, y] = interval.split(",");
    x = +x, y = +y;
    let overlap = Math.min(y, end) - Math.max(x, start);
    if (overlap > 0) return false;
  }
  this.intervals.add(`${start},${end}`);
  return true;
};

// A few test cases
let myCalendar = new MyCalendar();
console.log(myCalendar.book(10, 20)); // return True
console.log(myCalendar.book(15, 25)); // return False, It can not be booked because time 15 is already booked by another event.
console.log(myCalendar.book(20, 30)); // return True, The event can be booked, as the first event takes every time less than 20, but not including 20.