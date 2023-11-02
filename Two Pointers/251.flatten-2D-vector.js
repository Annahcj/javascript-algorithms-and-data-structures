// 251. Flatten 2D Vector
// Design an iterator to flatten a 2D vector. It should support the next and hasNext operations.
// Implement the Vector2D class:
  // Vector2D(int[][] vec) initializes the object with the 2D vector vec.
  // next() returns the next element from the 2D vector and moves the pointer one step forward. You may assume that all the calls to next are valid.
  // hasNext() returns true if there are still some elements in the vector, and false otherwise.


// Solution: Two Pointers

// Keep track of two pointers, 
  // first -> pointer for outer level of the vector
  // second -> pointer for inner level of the vector
  
// Remember to skip over empty arrays before each call of next or hasNext.
  // This also involves moving the outer pointer forward when the inner pointer reaches the iner boundary.

var Vector2D = function(vec) {
  this.first = 0;
  this.second = 0;
  this.vec = vec;
};

Vector2D.prototype.next = function() {
  this.skipToNext();
  return this.vec[this.first][this.second++];
};

Vector2D.prototype.skipToNext = function() {
  while (this.first < this.vec.length && this.second === this.vec[this.first].length) {
    this.first++;
    this.second = 0;
  }
}

Vector2D.prototype.hasNext = function() {
  this.skipToNext();
  return this.first < this.vec.length;  
};

// A few test cases
let vector2D = new Vector2D([[1, 2], [3], [4]]);
console.log(vector2D.next());    // return 1
console.log(vector2D.next());    // return 2
console.log(vector2D.next());    // return 3
console.log(vector2D.hasNext()); // return True
console.log(vector2D.hasNext()); // return True
console.log(vector2D.next());    // return 4
console.log(vector2D.hasNext()); // return False