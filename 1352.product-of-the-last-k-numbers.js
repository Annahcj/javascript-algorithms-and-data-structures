// 1352. Product of the Last K Numbers
// Design an algorithm that accepts a stream of integers and retrieves the product of the last k integers of the stream.
// Implement the ProductOfNumbers class:
  // ProductOfNumbers() Initializes the object with an empty stream.
  // void add(int num) Appends the integer num to the stream.
  // int getProduct(int k) Returns the product of the last k numbers in the current list. You can assume that always the current list has at least k numbers.


// Solution: Prefix Product

// If a sequence of numbers has 0 in it, the product will always be 0.
// So, when we get a zero, reset the prefix product to [1].
// (Always keep 1 as the first element to make it easier to get the product)

// Time Complexity: O(1) for both methods 260ms
// Space Complexity: O(n) total 71.2MB
var ProductOfNumbers = function() {
  this.nums = [1];  
};

ProductOfNumbers.prototype.add = function(num) {
  if (num === 0) this.nums = [1]; // reset since we got a 0
  else this.nums.push(this.nums[this.nums.length - 1] * num); 
};

ProductOfNumbers.prototype.getProduct = function(k) {
  let n = this.nums.length;  
  if (n <= k) return 0; // there is a 0 in the last k numbers
  return this.nums[n - 1] / this.nums[n - 1 - k];
};

// A few test cases
let productOfNumbers = new ProductOfNumbers();
productOfNumbers.add(3);        // [3]
productOfNumbers.add(0);        // [3,0]
productOfNumbers.add(2);        // [3,0,2]
productOfNumbers.add(5);        // [3,0,2,5]
productOfNumbers.add(4);        // [3,0,2,5,4]
console.log(productOfNumbers.getProduct(2)); // return 20. The product of the last 2 numbers is 5 * 4 = 20
console.log(productOfNumbers.getProduct(3)); // return 40. The product of the last 3 numbers is 2 * 5 * 4 = 40
console.log(productOfNumbers.getProduct(4)); // return 0. The product of the last 4 numbers is 0 * 2 * 5 * 4 = 0
productOfNumbers.add(8);        // [3,0,2,5,4,8]
console.log(productOfNumbers.getProduct(2)); // return 32. The product of the last 2 numbers is 4 * 8 = 32