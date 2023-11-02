// 2622. Cache With Time Limit
// Write a class that allows getting and setting key-value pairs, however a time until expiration is associated with each key.
// The class has three public methods:
// set(key, value, duration): accepts an integer key, an integer value, and a duration in milliseconds. Once the duration has elapsed, the key should be inaccessible. The method should return true if the same un-expired key already exists and false otherwise. Both the value and duration should be overwritten if the key already exists.
// get(key): if an un-expired key exists, it should return the associated value. Otherwise it should return -1.
// count(): returns the count of un-expired keys.


// Solution 1: Hashmap & setTimeout 

// Use a hashmap to keep track of the [value, timeout id] for each key.
// For set, clear the old timeout (using clearTimeout) if it exists, then set the new value and timeout id in the map.

// This approach is faster for count and slower for set.

// Time Complexity: 63ms
  // set: duration milliseconds per call
  // get: O(1) per call
  // count: O(1) per call
// Space Complexity: O(n) 42.2MB
var TimeLimitedCache = function() {
  this.map = new Map(); // {key: [value, timeout id]}
};

TimeLimitedCache.prototype.set = function(key, value, duration) {
  if (this.map.has(key)) {
    const [_, oldTimeoutId] = this.map.get(key);
    clearTimeout(oldTimeoutId);
    this.map.set(key, [value, setTimeout(() => {
      this.map.delete(key);
    }, duration)]);
    return true;
  } else {
    this.map.set(key, [value, setTimeout(() => {
      this.map.delete(key);
    }, duration)]);
    return false;
  }
};

TimeLimitedCache.prototype.get = function(key) {
  return this.map.has(key) ? this.map.get(key)[0] : -1;  
};

TimeLimitedCache.prototype.count = function() {
  return this.map.size;
};


// Solution 2: Hashmap & Timestamps

// Store the value and expiration timestamp of each call (Date.now() + duration) in a hashmap.
// For count, we need to loop through each element in the map and remove those with expired timestamps.

// This approach is faster for set and slower for count.

// Time Complexity: 51ms
  // set: O(1)
  // get: O(1)
  // count: O(n)
// Space Complexity: O(n) 42MB
var TimeLimitedCache = function() {
  this.map = new Map(); // {key: [value, expiration timestamp]}
};

TimeLimitedCache.prototype.set = function(key, value, duration) {
  const now = Date.now();
  if (this.map.has(key) && this.map.get(key)[1] >= now) {
    this.map.set(key, [value, now + duration]);
    return true;
  } else {
    this.map.set(key, [value, now + duration]);
    return false;
  }
};

TimeLimitedCache.prototype.get = function(key) {
  if (!this.map.has(key)) return -1;
  const [value, expiryTimestamp] = this.map.get(key);
  const now = Date.now();
  if (expiryTimestamp < now) {
    this.map.delete(key);
    return -1;
  } else {
    return value;
  }
};

TimeLimitedCache.prototype.count = function() {
  let unexpired = 0, now = Date.now();
  for (let [key, [_value, expiryTimestamp]] of this.map) {
    if (expiryTimestamp >= now) {
      unexpired++;
    } else {
      this.map.delete(key);
    }
  }
  return unexpired;
};