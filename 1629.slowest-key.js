// 1629. Slowest Key
// A newly designed keypad was tested, where a tester pressed a sequence of n keys, one at a time.
// You are given a string keysPressed of length n, where keysPressed[i] was the ith key pressed in the testing sequence, and a sorted list releaseTimes, where releaseTimes[i] was the time the ith key was released. Both arrays are 0-indexed. The 0th key was pressed at the time 0, and every subsequent key was pressed at the exact time the previous key was released.
// The tester wants to know the key of the keypress that had the longest duration. The ith keypress had a duration of releaseTimes[i] - releaseTimes[i - 1], and the 0th keypress had a duration of releaseTimes[0].
// Note that the same key could have been pressed multiple times during the test, and these multiple presses of the same key may not have had the same duration.
// Return the key of the keypress that had the longest duration. If there are multiple such keypresses, return the lexicographically largest key of the keypresses.


// Solution 1: Hashmap

// Use hashmap to store the longest pressing time for each key in keysPressed
// Calculate maximum pressed key as you go, if they are equal, take the lexographically bigger key.

// Time Complexity: O(n) 80ms
// Space Complexity: O(n) 42.2MB
var slowestKey = function(releaseTimes, keysPressed) {
  let map = {};
  map[keysPressed[0]] = releaseTimes[0];
  let slowest = keysPressed[0];
  for (var i = 1; i < releaseTimes.length; i++) {
    map[keysPressed[i]] = Math.max(map[keysPressed[i]] || 0, releaseTimes[i] - releaseTimes[i - 1]);
    if (map[keysPressed[i]] > map[slowest]) slowest = keysPressed[i];
    else if (map[keysPressed[i]] === map[slowest]) {
      if (keysPressed[i] > slowest) slowest = keysPressed[i];
    }
  }   
  return slowest;
};

// Solution 2: Optimized Space 

// If we look at the problem carefully, we see that a hashmap isn't really necessary.
// Simply keep track of the maximum pressed time as you go, and the key of that.

// Time Complexity: O(n) 72ms
// Space Complexity: O(1) 40.4MB
var slowestKey = function(releaseTimes, keysPressed) {
  let slowest = keysPressed[0], maxPressed = releaseTimes[0];
  for (var i = 1; i < releaseTimes.length; i++) {
    let pressingTime = releaseTimes[i] - releaseTimes[i - 1];
    if (pressingTime > maxPressed) {
      maxPressed = pressingTime, slowest = keysPressed[i];
    } else if (pressingTime === maxPressed) {
      if (keysPressed[i] > slowest) slowest = keysPressed[i];
    }
  }   
  return slowest;
};

// Two test cases to run function on
console.log(slowestKey([9,29,49,50], "cbcd")) // "c"
console.log(slowestKey([12,23,36,46,62], "spuda")) // "a"