// 1298. Maximum Candies You Can Get from Boxes
// You have n boxes labeled from 0 to n - 1. You are given four arrays: status, candies, keys, and containedBoxes where:
  // status[i] is 1 if the ith box is open and 0 if the ith box is closed,
  // candies[i] is the number of candies in the ith box,
  // keys[i] is a list of the labels of the boxes you can open after opening the ith box.
  // containedBoxes[i] is a list of the boxes you found inside the ith box.
// You are given an integer array initialBoxes that contains the labels of the boxes you initially have. You can take all the candies in any open box and you can use the keys in it to open new boxes and you also can use the boxes you find in it.
// Return the maximum number of candies you can get following the rules above.


// Solution: BFS 

// Store unopened boxes that we have but don't have a key for yet in a set (for quick removal).
// Store keys for boxes we don't have yet in a set.

// When we get the label for a new box, we have two situations:
  // 1. The box is already open -> we process the box immediately
  // 2. The box is closed -> if we have the key for it, process it immediately. otherwise, store the box in the set of unopened boxes.
// When we receive a new key, we have two situations:
  // 1. If we have an unopened box for the new key, process the box immediately
  // 2. If we don't have the box for the new key, store it in a set to use later.

// BFS starting from the initial boxes that are already open.
// In a queue, store boxes that we can process immediately: are open or have a key.
// Update the keys set and unopened boxes set as we process them so that we won't get into a cycle.

// n = number of boxes, m = number of keys
// Time Complexity: O(n + m) 203ms
// Space Complexity: O(n + m) 52MB
var maxCandies = function(status, candies, keys, containedBoxes, initialBoxes) {
  let unopened = new Set(), keysSet = new Set();
  let candiesCount = 0, queue = [];
  for (let box of initialBoxes) {
    if (status[box] === 1) queue.push(box);
    else unopened.add(box);
  }
  while (queue.length) {
    let box = queue.shift();
    candiesCount += candies[box];
    for (let key of keys[box]) {
      if (unopened.has(key)) { // we have an unopened box for the new key
        queue.push(key);
        unopened.delete(key);
      } else keysSet.add(key); // we don't have the box, store the key to use later
    }
    for (let newBox of containedBoxes[box]) {
      if (status[newBox] === 1 || keysSet.has(newBox)) { // the box is open or we have the key for it
        queue.push(newBox);
        keysSet.delete(newBox);
      } else unopened.add(newBox); // the box is closed or we have no key for it, store it to open later
    }
  }
  return candiesCount;
};

// Two test cases
console.log(maxCandies([1,0,1,0], [7,5,4,100], [[],[],[1],[]], [[1,2],[3],[],[]], [0])) // 16
console.log(maxCandies([1,0,0,0,0,0], [1,1,1,1,1,1], [[1,2,3,4,5],[],[],[],[],[]], [[1,2,3,4,5],[],[],[],[],[]], [0])) // 6