// 253. Meeting Rooms II
// Given an array of meeting time intervals intervals where intervals[i] = [starti, endi], return the minimum number of conference rooms required.


// Solution 1: Priority Queue / Min Heap

// Sort intervals in ascending order based on the start times.
// Set up a min heap, push in the first meeting.
// Loop through intervals, check first meeting of heap,
// the first item in the heap will always have the earliest finish time, so if the finish time is smaller than or equal to the current element's start time, we remove it from the heap (we don't need to allocate a new room because the meeting is over)
// also keep adding each meeting into the heap.
// return length of the heap.

// Time Complexity: O(n logn) 88ms
// Space Complexity: O(n) 42.1MB

  var minMeetingRooms = function(intervals) {
    let heap = new MinHeap();
    intervals = intervals.sort((a, b) => a[0] - b[0]);
    heap.add(intervals[0]);
    for (var i = 1; i < intervals.length; i++) {
        if (heap.values[0][1] <= intervals[i][0]) {
          heap.remove();
        } 
        heap.add(intervals[i]);
    }
    return heap.values.length;
  };
  
  class MinHeap {
    constructor() {
      this.values = [];
    }
    add(value) {
      let pushed = this.values.push(value);
      let currIdx = this.values.length - 1;
      let parentIdx = Math.floor((currIdx - 1) / 2);
      while (parentIdx >= 0 && this.values[parentIdx][1] > this.values[currIdx][1]) {
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
          if (vals[leftIdx][1] < vals[rightIdx][1]) {
            return leftIdx;
          } return rightIdx;
        } else {
          if (leftIdx < vals.length) return leftIdx;
          return -1;
        }
      }
      let smallerChild = getSmaller(this.values, leftIdx, rightIdx);
      while (smallerChild > -1 && this.values[smallerChild][1] < this.values[currIdx][1]) {
        [this.values[currIdx], this.values[smallerChild]] = [this.values[smallerChild], this.values[currIdx]];
        currIdx = smallerChild;
        leftIdx = currIdx * 2 + 1, rightIdx = currIdx * 2 + 2;
        smallerChild = getSmaller(this.values, leftIdx, rightIdx);
      }
    }
  }

  // Four test cases to run function on
  console.log(minMeetingRooms([[5,8],[8,10],[58,70],[20,40],[50,60],[55,58]])) // 2
  console.log(minMeetingRooms([[5,8],[8,10],[20,40]])) // 1
  console.log(minMeetingRooms([[0,30],[5,10],[15,20]])) // 2
  console.log(minMeetingRooms([[7,10],[2,4]])) // 1