// 2526. Find Consecutive Integers from a Data Stream
// For a stream of integers, implement a data structure that checks if the last k integers parsed in the stream are equal to value.
// Implement the DataStream class:
  // DataStream(int value, int k) Initializes the object with an empty integer stream and the two integers value and k.
  // boolean consec(int num) Adds num to the stream of integers. Returns true if the last k integers are equal to value, and false otherwise. If there are less than k integers, the condition does not hold true, so returns false.


// Solution: Count

// Keep track of count: the number of consecutive integers equal to value at the end of the array.

// When we add a new value:
  // If num is equal to value, increment the count.
  // If num is not equal to value, reset the count to 0.

// Time Complexity: 498ms
  // consec: O(1)
// Space Complexity: O(1) 77.9MB
var DataStream = function(value, k) {
  this.count = 0;
  this.value = value;
  this.k = k;
};

DataStream.prototype.consec = function(num) {
  if (num === this.value) {
    this.count++;
  } else {
    this.count = 0;
  }
  return this.count >= this.k;
};

// A few test cases
let dataStream = new DataStream(4, 3);
console.log(dataStream.consec(4)); // false 
console.log(dataStream.consec(4)); // false
console.log(dataStream.consec(4)); // true
console.log(dataStream.consec(3)); // false