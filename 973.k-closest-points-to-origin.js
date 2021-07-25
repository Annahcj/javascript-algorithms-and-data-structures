// 973. K Closest Points to Origin
// Given an array of points where points[i] = [xi, yi] represents a point on the X-Y plane and an integer k, return the k closest points to the origin (0, 0).


// Solution 1: Priority Queue / Min Heap

// Notes:
// Since the origin is always (0,0), we can simply calculate x^2 + y^2 for each point, then find the coordinates with the lowest.
// Square rooting the distance is also unneccessary.

// Algorithm:
// Initialize a min heap. The heap will be ordered by the distance of each point.
// Loop through points, 
  // add the distance and x-y coordinates to the heap
// - end of iteration -
// Loop k number of times,
  // push the coordinates of 'heap.remove().coordinates' into the result array (heap.remove() returns the first item before removal)
// - end of iteration -
// Return result

// Time Complexity: O(n log(n)) 200ms
// Space Complexity: O(n) 55.9MB
  var kClosest = function(points, k) {
    let heap = new MinHeap();
    let res = [];
    for (var i = 0; i < points.length; i++) {
      let distance = (points[i][0] ** 2) + (points[i][1] ** 2);
      heap.add({distance, coordinates: points[i]});
    }
    for (var j = 0; j < k; j++) {
      res.push(heap.remove().coordinates);
    }
    return res;
  };
  
  // Min Heap, ordered by the distance to origin.
    class MinHeap {
      constructor() {
        this.values = [];
      }
      add(value) {
        let pushed = this.values.push(value);
        let currIdx = this.values.length - 1;
        let parentIdx = Math.floor((currIdx - 1) / 2);
        while (parentIdx >= 0 && this.values[parentIdx].distance > this.values[currIdx].distance) {
          [this.values[parentIdx], this.values[currIdx]] = [this.values[currIdx], this.values[parentIdx]];
          currIdx = parentIdx;
          parentIdx = Math.floor((currIdx - 1) / 2);
        }
        return pushed;
      }
      remove() {
        if (!this.values.length) return -1;
        let currIdx = 0, removedVal = this.values[0];
        [this.values[0], this.values[this.values.length - 1]] = [this.values[this.values.length - 1], this.values[0]];
        this.values.pop();
        let leftIdx = currIdx * 2 + 1, rightIdx = currIdx * 2 + 2;
        function getSmaller(vals, leftIdx, rightIdx) {
          if (rightIdx < vals.length) {
            if (vals[leftIdx].distance < vals[rightIdx].distance) {
              return leftIdx;
            } return rightIdx;
          } else {
            if (leftIdx < vals.length) return leftIdx;
            return -1;
          }
        }
        let smallerChild = getSmaller(this.values, leftIdx, rightIdx);
        while (smallerChild > -1 && this.values[smallerChild].distance < this.values[currIdx].distance) {
          [this.values[currIdx], this.values[smallerChild]] = [this.values[smallerChild], this.values[currIdx]];
          currIdx = smallerChild;
          leftIdx = currIdx * 2 + 1, rightIdx = currIdx * 2 + 2;
          smallerChild = getSmaller(this.values, leftIdx, rightIdx);
        }
        return removedVal;
      }
    }
  
  // Two test cases to run function on
  console.log(kClosest([[1,3],[-2,2]], 1)) // [[-2,2]]
  console.log(kClosest([[3,3],[5,-1],[-2,4]], 2)) // [[3,3],[-2,4]]