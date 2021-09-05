// 981. Time Based Key-Value Store
// Frequency: 83.89%
// Design a time-based key-value data structure that can store multiple values for the same key at different time stamps and retrieve the key's value at a certain timestamp.
// Implement the TimeMap class:
// TimeMap() Initializes the object of the data structure.
// void set(String key, String value, int timestamp) Stores the key key with the value value at the given time timestamp.
// String get(String key, int timestamp) Returns a value such that set was called previously, with timestamp_prev <= timestamp. If there are multiple such values, it returns the value associated with the largest timestamp_prev. If there are no values, it returns "".


// Solution 1: Linear Search

// Runtime on LeetCode: 432ms
// Memory Usage on LeetCode: 81.2MB

// Set: (key, value, timestamp)
  // if this.map doesn't contain key yet, set this.map[key] to an empty array
  // set this.map[key][timestamp] to value

// Get: (key, timestamp)
  // If this.map doesn't contain key, return ""
  // Loop through this.map[key] from timestamp to 0 (pointer = i)
    // if this.map[key][i] contains a value, return that value.
  // If the loop finishes and no value is found, return ""

// Time Complexity:
  // Set: O(1)
  // Get: O(n) n = timestamp

var TimeMap = function() {
  this.map = {};  
};

TimeMap.prototype.set = function(key, value, timestamp) {
  if (!this.map[key]) this.map[key] = [];
  this.map[key][timestamp] = value;
};

TimeMap.prototype.get = function(key, timestamp) {
  if (!this.map[key]) return "";
  for (var i = timestamp; i >= 0; i--) {
    if (this.map[key][i]) return this.map[key][i];
  }
  return "";
};

// Solution 2: Binary Search

// Runtime on LeetCode: 432ms
// Memory Usage on LeetCode: 78.2MB

// Set: (key, value, timestamp)
  // If this.map doesn't contain key, set this.map[key] to an empty array
  // Push [timestamp, value] into this.map[key]

// Get: (key, timestamp)
  // If this.map doesn't contain key, return ""
  // For simplicity, call this.map[key] arr
  // (perform binary search)
  // Set two pointers, l to 0, r to arr.length - 1
  // Loop while l is smaller than r
    // Set mid to Math.ceil((l + r) / 2)
    // If arr[mid][0] is equal to timestamp, return arr[mid][1]
    // Otherwise if arr[mid][0] is bigger than timestamp, set r to mid - 1 (timestamp must be smaller or equal)
    // Otherwise, set l to mid (smaller could be our answer)
  // If arr[r][0] is smaller than or equal to timestamp, return arr[r][1], otherwise return "".

// Time Complexity: 
  // Set: O(1)
  // Get: O(log(n))

var TimeMap = function() {
  this.map = {};  
};

TimeMap.prototype.set = function(key, value, timestamp) {
  if (!this.map[key]) this.map[key] = [];
  this.map[key].push([timestamp, value]);
};

TimeMap.prototype.get = function(key, timestamp) {
  if (!this.map[key]) return "";
  let arr = this.map[key], n = arr.length;
  let l = 0, r = n - 1;
  while (l < r) {
    let mid = Math.ceil((l + r) / 2);
    if (arr[mid][0] === timestamp) return arr[mid][1];
    else if (arr[mid][0] > timestamp) r = mid - 1;
    else l = mid;
  }
  return arr[r][0] <= timestamp ? arr[r][1] : "";
};

// A few test cases
let timeMap = new TimeMap();
timeMap.set("foo", "bar", 1) // store the key "foo" and value "bar" along with timestamp = 1.
console.log(timeMap.get("foo", 1))  // return "bar"
console.log(timeMap.get("foo", 3)) // return "bar"
timeMap.set("foo", "bar2", 4) // store the key "foo" and value "ba2r" along with timestamp = 4.
console.log(timeMap.get("foo", 4)) // return "bar2"
console.log(timeMap.get("foo", 5)) // return "bar2"