// 380. Insert Delete GetRandom O(1)
// Implement the RandomizedSet class:
// RandomizedSet() Initializes the RandomizedSet object.
// bool insert(int val) Inserts an item val into the set if not present. Returns true if the item was not present, false otherwise.
// bool remove(int val) Removes an item val from the set if present. Returns true if the item was present, false otherwise.
// int getRandom() Returns a random element from the current set of elements (it's guaranteed that at least one element exists when this method is called). Each element must have the same probability of being returned.
// You must implement the functions of the class such that each function works in average O(1) time complexity.


// Solution 1: Hashmap + Array (to store indexes for getRandom)

// Thoughts: 
// The first thought is using a hashmap since insertions and deletions are O(1).
// But wait- a catch! How do we generate a random index since items in a hashmap have no index? 
// The solution to this is using an array alongside the map.
// When we need to remove an item, we can make use the O(1) pop function of an array by swapping [the item we need to remove] with [the last item], then popping it off the arr.

// Algorithm:
// insert: 
  // If map already contains item, return false.
  // Otherwise, 
    // assign the length of arr to map with the key of val
    // push val into arr
    // return true.
// remove: 
  // If map doesn't contain item, return false.
  // Otherwise,
    // instead of swapping (since we're popping off last value anyway), we can just replace item at index with item at last index.
    // pop the last item off arr
    // update the index of map[lastItem] to be index
    // delete map[index]
    // return true.
// getRandom: 
  // generate a random index between 0 and the length of arr
  // return the item in arr at the random index.
// Runtime on LeetCode: 424ms
// Memory Usage on LeetCode: 87.9MB

// Time Complexity for insert, remove, and getRandom: O(1)
// Space Complexity: O(n)
var RandomizedSet = function() {
    this.map = {};
    this.arr = [];
  };
  
  RandomizedSet.prototype.insert = function(val) {
    if (this.map[val] === 0 || this.map[val]) return false;
    this.map[val] = this.arr.length;
    this.arr.push(val);
    return true;
  };
  
  RandomizedSet.prototype.remove = function(val) {
    if (!this.map[val] && this.map[val] !== 0) return false;
    let index = this.map[val];
    let lastIdx = this.arr.length - 1;
    let lastItem = this.arr[lastIdx];
    // replace the item at index of item to remove with the value of the last item in arr.
    this.arr[index] = lastItem;
    // pop the last item off arr
    this.arr.pop();
    // change the index of the previous last item to be the index of the item that was removed
    this.map[lastItem] = index;
    // delete the item to be removed from map
    delete this.map[val];
    return true;
  };
  
  RandomizedSet.prototype.getRandom = function() {
    let index = Math.floor(Math.random() * this.arr.length);
    return this.arr[index];
  };
  
  // A few test cases
  let randomSet = new RandomizedSet();
  console.log(randomSet.insert(1)) // true
  console.log(randomSet.remove(2)) // false
  console.log(randomSet.insert(2)) // true
  console.log(randomSet.getRandom()) // 1 or 2
  console.log(randomSet.remove(1)) // true
  console.log(randomSet.insert(2)) // false
  console.log(randomSet.getRandom()) // 2
  console.log(randomSet)