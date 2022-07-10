// 2336. Smallest Number in Infinite Set
// You have a set which contains all positive integers [1, 2, 3, 4, 5, ...].
// Implement the SmallestInfiniteSet class:
  // SmallestInfiniteSet() Initializes the SmallestInfiniteSet object to contain all positive integers.
  // int popSmallest() Removes and returns the smallest integer contained in the infinite set.
  // void addBack(int num) Adds a positive integer num back into the infinite set, if it is not already in the infinite set.


// Solution: Removed Set

// Keep track of numbers that are removed.
// When addBack is called, remove the number from the 'removed' set.

// Time Complexity: 418ms
  // Initialization: O(1)
  // popSmallest: O(n)
  // addBack: O(1)
// Space Complexity: O(n) 49.4MB
var SmallestInfiniteSet = function() {
  this.removed = new Set();
};

SmallestInfiniteSet.prototype.popSmallest = function() {
  for (let i = 1; i <= 1000; i++) {
    if (!this.removed.has(i)) {
      this.removed.add(i);
      return i;
    }
  }
};

SmallestInfiniteSet.prototype.addBack = function(num) {
  this.removed.delete(num);  
};

// A few test cases
let smallestInfiniteSet = new SmallestInfiniteSet();
smallestInfiniteSet.addBack(2);    // 2 is already in the set, so no change is made.
console.log(smallestInfiniteSet.popSmallest()); // return 1, since 1 is the smallest number, and remove it from the set.
console.log(smallestInfiniteSet.popSmallest()); // return 2, and remove it from the set.
console.log(smallestInfiniteSet.popSmallest()); // return 3, and remove it from the set.
smallestInfiniteSet.addBack(1);    // 1 is added back to the set.
console.log(smallestInfiniteSet.popSmallest()); // return 1, since 1 was added back to the set and
                                   // is the smallest number, and remove it from the set.
console.log(smallestInfiniteSet.popSmallest()); // return 4, and remove it from the set.
console.log(smallestInfiniteSet.popSmallest()); // return 5, and remove it from the set.