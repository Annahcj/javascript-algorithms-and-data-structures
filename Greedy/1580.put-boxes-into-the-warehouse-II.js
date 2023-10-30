// 1580. Put Boxes Into the Warehouse II
// You are given two arrays of positive integers, boxes and warehouse, representing the heights of some boxes of unit width and the heights of n rooms in a warehouse respectively. The warehouse's rooms are labeled from 0 to n - 1 from left to right where warehouse[i] (0-indexed) is the height of the ith room.
// Boxes are put into the warehouse by the following rules:
  // Boxes cannot be stacked.
  // You can rearrange the insertion order of the boxes.
  // Boxes can be pushed into the warehouse from either side (left or right)
  // If the height of some room in the warehouse is less than the height of a box, then that box and all other boxes behind it will be stopped before that room.
// Return the maximum number of boxes you can put into the warehouse.


// Solution 1: Greedy w/ Preprocessing Left + Right & Two Pointers

// The approach is to start from the smallest point in the warehouse and work our way outwards.

// 1. Find the smallest point in the warehouse (index of min(warehouse))
// 2. Preprocess warehouse by the left and right so that
  // left[i] = min(...[warehouse[0], ..., warehouse[i]])
  // right[i] = min(...[warehouse[i], ..., warehouse[n - 1]])
// 3. Sort boxes in asc order.
// 4. Use two pointers to greedily find the maximum number of boxes that can fit in the warehouse.
  // For each box, move the two pointers left/right respectively until they are both smaller than boxes[i].
  // Then, take the pointer with the smaller height since it gives more chance for a taller box to use the bigger one.

// Time Complexity: O(n log(n) + m) 263ms
// Space Complexity: O(m) 58.3MB
var maxBoxesInWarehouse = function(boxes, warehouse) {
  let m = warehouse.length, minIndex = 0;
  let left = Array(m), right = Array(m);
  left[0] = warehouse[0], right[m - 1] = warehouse[m - 1];
  for (let i = 1; i < m; i++) {
    left[i] = Math.min(warehouse[i], left[i - 1]);
    if (warehouse[i] < warehouse[minIndex]) minIndex = i;
  }
  for (let i = m - 2; i >= 0; i--) {
    right[i] = Math.min(warehouse[i], right[i + 1]);
  }
  
  let i = minIndex, j = minIndex;
  boxes.sort((a, b) => a - b);
  for (let k = 0; k < boxes.length; k++) {
    while (i >= 0 && left[i] < boxes[k]) i--; // move to valid index
    while (j < m && right[j] < boxes[k]) j++; // move to valid index
    if (i < 0 && j >= m) return k;
    // greedy: take the pointer with the smaller height since it gives more chance for a taller box to use the bigger one
    if (i === j) i--, j++;
    else if (i < 0 || right[j] <= left[i]) j++;
    else i--;
  }
  return boxes.length;
};


// Solution 2: Process Boxes in Reverse Order

// 1. Sort boxes in desc order
// 2. Process the boxes by tallest height first
  // Put the taller boxes at the edges of the warehouse and work inwards - out to in approach.
  // This is the opposite of my first approach which went from in to out.

// Why it works: With the two pointers, it doesn't matter which side we take because boxes we process will only get shorter, 
// so there is no benefit to process them greedily from here.

// Another reason this approach (out-to-in approach and processing boxes in reverse order) works without preprocessing 
// is that by processing boxes in reverse order, we know that boxes will only get shorter 
// and will therefore always be able to fix through the spaces the taller boxes have passed through.

// Time Complexity: O(n log(n) + m) 164ms
// Space Complexity: O(log(n)) (space for sorting) 53.5MB
var maxBoxesInWarehouse = function(boxes, warehouse) {
  boxes.sort((a, b) => b - a);
  let i = 0, j = warehouse.length - 1, ans = 0;
  for (let k = 0; k < boxes.length; k++) {
    if (i > j) break;
    if (warehouse[i] >= boxes[k]) {
      ans++;
      i++;
    } else if (warehouse[j] >= boxes[k]) {
      ans++;
      j--;
    }
  }
  return ans;
};

// Two test cases
console.log(maxBoxesInWarehouse([1,2,2,3,4], [3,4,1,2])) // 4
console.log(maxBoxesInWarehouse([3,5,5,2], [2,1,3,4,5])) // 3