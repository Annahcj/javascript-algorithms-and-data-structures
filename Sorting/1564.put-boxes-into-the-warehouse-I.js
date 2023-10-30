// 1564. Put Boxes Into the Warehouse I
// You are given two arrays of positive integers, boxes and warehouse, representing the heights of some boxes of unit width and the heights of n rooms in a warehouse respectively. The warehouse's rooms are labelled from 0 to n - 1 from left to right where warehouse[i] (0-indexed) is the height of the ith room.
// Boxes are put into the warehouse by the following rules:
  // Boxes cannot be stacked.
  // You can rearrange the insertion order of the boxes.
  // Boxes can only be pushed into the warehouse from left to right only.
  // If the height of some room in the warehouse is less than the height of a box, then that box and all other boxes behind it will be stopped before that room.
// Return the maximum number of boxes you can put into the warehouse.


// Solution: Sorting & Preprocessing

// 1. Sort boxes in ascending order.
// 2. Preprocess warehouse so that warehouse[i] = min(...[warehouse[0], ..., warehouse[i]]).
  // The reason for this preprocessing is that a taller height on the right side doesn't mean anything 
  // since boxes won't be able get through smaller heights on the left.
// 3. Use two pointers to find the number of boxes we can put until the warehouse runs out of space.

// n = boxes.length, m = warehouse.length
// Time Complexity: O(n log(n) + n + m) 224ms
// Space Complexity: O(log(n)) (space for sorting) 54.1MB
var maxBoxesInWarehouse = function(boxes, warehouse) {
  boxes.sort((a, b) => a - b);
  for (let i = 1; i < warehouse.length; i++) {
    warehouse[i] = Math.min(warehouse[i - 1], warehouse[i]);
  }
  
  let j = warehouse.length - 1;
  for (let i = 0; i < boxes.length; i++) {
    while (j >= 0 && warehouse[j] < boxes[i]) j--; // move j left until we find the next space which boxes[i] can fit into
    if (j < 0) return i;
    j--;
  }
  return boxes.length;
};

// Three test cases
console.log(maxBoxesInWarehouse([4,3,4,1], [5,3,3,4,1])) // 3
console.log(maxBoxesInWarehouse([1,2,2,3,4], [3,4,1,2])) // 3
console.log(maxBoxesInWarehouse([1,2,3], [1,2,3,4])) // 1