// 1921. Eliminate Maximum Number of Monsters
// Return the maximum number of monsters that you can eliminate before you lose, or n if you can eliminate all the monsters before they reach the city.


// Solution 1: Priority Queue / Min Heap

// Formula to calculate monster's dist: Math.ceil(dist[i] / speed[i]);
// Add each distance (using the above formula) in dist/speed to a minHeap
// While length of heap, if the closest monster (val on the top of the heap) hasn't reached our currentTime, increment count and remove the monster from the heap.
  // otherwise if the monster is already here, return count.
// Increment time each loop.

// Time Complexity: O(n log(n) + n) (adding each dist to heap + looping through heap) 144ms
// Space Complexity: O(n) (length of heap is length of dist) 59.4MB

var eliminateMaximum = function(dist, speed) {
    let heap = new MinHeap();
    let currentTime = 0, count = 0;
    for (var i = 0; i < dist.length; i++) {
      heap.add(Math.ceil(dist[i] / speed[i]));
    }
    console.log(heap)
    while (heap.values.length) {
      if (heap.values[0] > currentTime) {
        count++;
        heap.remove();
      } else {
        return count;
      }
      currentTime++;
    }
    return count;
  };
    class MinHeap {
      constructor() {
        this.values = [];
      }
      add(value) {
        let pushed = this.values.push(value);
        let currIdx = this.values.length - 1;
        let parentIdx = Math.floor((currIdx - 1) / 2);
        while (parentIdx >= 0 && this.values[parentIdx] > this.values[currIdx]) {
          [this.values[parentIdx], this.values[currIdx]] = [this.values[currIdx], this.values[parentIdx]];
          currIdx = parentIdx;
          parentIdx = Math.floor((currIdx - 1) / 2);
        }
        return pushed;
      }
      remove() {
        if (!this.values.length) return -1;
        let currIdx = 0;
        [this.values[0], this.values[this.values.length - 1]] = [this.values[this.values.length - 1], this.values[0]];
        this.values.pop();
        let leftIdx = currIdx * 2 + 1, rightIdx = currIdx * 2 + 2;
        function getSmaller(vals, leftIdx, rightIdx) {
          if (rightIdx < vals.length) {
            if (vals[leftIdx] < vals[rightIdx]) {
              return leftIdx;
            } return rightIdx;
          } else {
            if (leftIdx < vals.length) return leftIdx;
            return -1;
          }
        }
        let smallerChild = getSmaller(this.values, leftIdx, rightIdx);
        while (smallerChild > -1 && this.values[smallerChild] < this.values[currIdx]) {
          [this.values[currIdx], this.values[smallerChild]] = [this.values[smallerChild], this.values[currIdx]];
          currIdx = smallerChild;
          leftIdx = currIdx * 2 + 1, rightIdx = currIdx * 2 + 2;
          smallerChild = getSmaller(this.values, leftIdx, rightIdx);
        }
      }
    }
  
  // Four test cases to run function on
  console.log(eliminateMaximum([3,2,4],[5,3,2])) // 1
  console.log(eliminateMaximum([1,1,2,3],[1,1,1,1])) // 1
  console.log(eliminateMaximum([2,3],[1,5])) // 2
  console.log(eliminateMaximum([1,3,4],[1,1,1])) // 3