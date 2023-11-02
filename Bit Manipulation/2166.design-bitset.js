// 2166. Design Bitset
// A Bitset is a data structure that compactly stores bits.
// Implement the Bitset class:
  // Bitset(int size) Initializes the Bitset with size bits, all of which are 0.
  // void fix(int idx) Updates the value of the bit at the index idx to 1. If the value was already 1, no change occurs.
  // void unfix(int idx) Updates the value of the bit at the index idx to 0. If the value was already 0, no change occurs.
  // void flip() Flips the values of each bit in the Bitset. In other words, all bits with value 0 will now have value 1 and vice versa.
  // boolean all() Checks if the value of each bit in the Bitset is 1. Returns true if it satisfies the condition, false otherwise.
  // boolean one() Checks if there is at least one bit in the Bitset with value 1. Returns true if it satisfies the condition, false otherwise.
  // int count() Returns the total number of bits in the Bitset which have value 1.
  // String toString() Returns the current composition of the Bitset. Note that in the resultant string, the character at the ith index should coincide with the value at the ith bit of the Bitset.


// Solution: Keep Flipped Bits

// Store the bits in an array of size n.
// For each bit, keep its flipped bit: bitset[i] = [bit, flipped bit]
// Keep the global 'index'. Index will either be 0 or 1. When flip is called, we flip the index and access the bits by index.
// Keep the number of ones: ones = [ones, flipped ones]

// We can reference to everything using the index.
// Make sure to update the ones count and flipped bits when fix or unfix is called.

// Time Complexity: 
  // toString: O(n)
  // all other methods: O(1)
// Space Complexity: O(n) 
var Bitset = function(size) {
  this.bitset = Array(size);
  this.index = 0;
  this.size = size;
  this.ones = [0, size];
  for (let i = 0; i < size; i++) {
    this.bitset[i] = [0, 1];
  }  
};

Bitset.prototype.fix = function(idx) { 
  let index = this.index, flipped = index ^ 1;
  if (this.bitset[idx][index] === 0) {
    this.ones[index]++;
    this.bitset[idx][index] = 1;
    this.bitset[idx][flipped] = 0;
    this.ones[flipped]--;
  }
};

Bitset.prototype.unfix = function(idx) {
  let index = this.index, flipped = index ^ 1;
  if (this.bitset[idx][index] === 1) {
    this.ones[index]--;
    this.bitset[idx][index] = 0;
    this.bitset[idx][flipped] = 1;
    this.ones[flipped]++;
  }  
};

Bitset.prototype.flip = function() {
  this.index = this.index ^ 1;
};

Bitset.prototype.all = function() {
  return this.ones[this.index] === this.size;
};

Bitset.prototype.one = function() {
  return this.ones[this.index] > 0;  
};

Bitset.prototype.count = function() {
  return this.ones[this.index];  
};

Bitset.prototype.toString = function() {
  let res = "";
  let index = this.index;
  for (let i = 0; i < this.size; i++) {
    res += this.bitset[i][index];
  }  
  return res;
};

// A few test cases
let bs = new Bitset(5); // bitset = "00000".
bs.fix(3);     // the value at idx = 3 is updated to 1, so bitset = "00010".
bs.fix(1);     // the value at idx = 1 is updated to 1, so bitset = "01010". 
bs.flip();     // the value of each bit is flipped, so bitset = "10101". 
console.log(bs.all());      // return False, as not all values of the bitset are 1.
bs.unfix(0);   // the value at idx = 0 is updated to 0, so bitset = "00101".
bs.flip();     // the value of each bit is flipped, so bitset = "11010".  
console.log(bs.one());      // return True, as there is at least 1 index with value 1.
bs.unfix(0);   // the value at idx = 0 is updated to 0, so bitset = "01010".
console.log(bs.count());    // return 2, as there are 2 bits with value 1.
console.log(bs.toString()); // return "01010", which is the composition of bitset.