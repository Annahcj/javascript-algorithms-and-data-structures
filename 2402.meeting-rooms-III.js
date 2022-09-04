// 2402. Meeting Rooms III
// You are given an integer n. There are n rooms numbered from 0 to n - 1.
// You are given a 2D integer array meetings where meetings[i] = [starti, endi] means that a meeting will be held during the half-closed time interval [starti, endi). All the values of starti are unique.
// Meetings are allocated to rooms in the following manner:
  // 1. Each meeting will take place in the unused room with the lowest number.
  // 2. If there are no available rooms, the meeting will be delayed until a room becomes free. The delayed meeting should have the same duration as the original meeting.
  // 3. When a room becomes unused, meetings that have an earlier original start time should be given the room.
// Return the number of the room that held the most meetings. If there are multiple rooms, return the room with the lowest number.
// A half-closed interval [a, b) is the interval between a and b including a and not including b.


// Solution: Two Heaps

// Use two heaps - available and occupied, to keep track of rooms (as [room index, next available time]) that are available. 
  // available: Rooms that are available, sorted by room index.
  // occupied: Rooms that are occupied, sorted by next available time.

// Sort meetings by start time.
// For each meeting, 
  // 1. Move rooms that have freed up from occupied to available.
  // 2. Assign a room to the meeting. Count the number of times each room is used.
    // If there are no available rooms, take out the earliest room from occupied and delay the start time of the meeting.
      // If there are multiple occupied rooms with the same available time, move them all.
    // If there is an available room, use an available room with the smallest room index.
    // When adding a room back to the heap, we need to account for the delayed time if there was originally no available room.

// n = number of rooms, m = number of meetings
// Time Complexity: O(m log(m) + m log(n)) 505ms
// Space Complexity: O(n) 75.8MB
var mostBooked = function(n, meetings) {
  let available = new PriorityQueue((a, b) => a[0] - b[0]); // [room index, next available time]
  let occupied = new PriorityQueue((a, b) => a[1] - b[1]);
  for (let i = 0; i < n; i++) {
    available.add([i, 0]);
  }

  meetings.sort((a, b) => a[0] - b[0]);
  let count = Array(n).fill(0);
  for (let [start, end] of meetings) {
    let duration = end - start;
    while (!occupied.isEmpty() && occupied.top()[1] <= start) {
      available.add(occupied.remove());
    }
    
    if (available.isEmpty()) {
      let [roomIndex, availableTime] = occupied.remove();
      available.add([roomIndex, availableTime]);
      while (!occupied.isEmpty() && occupied.top()[1] === availableTime) {
        available.add(occupied.remove());
      }
    } 
    let [roomIndex, availableTime] = available.remove();
    count[roomIndex]++;
    occupied.add([roomIndex, Math.max(start, availableTime) + duration]);
  }
  
  let ans = 0;
  for (let i = 1; i < n; i++) {
    if (count[i] > count[ans]) ans = i;
  }
  return ans;
};

class PriorityQueue {
  constructor(comparator = ((a, b) => a - b)) {
    this.values = [];
    this.comparator = comparator;
    this.size = 0;
  }
  add(val) {
    this.size++;
    this.values.push(val);
    let idx = this.size - 1, parentIdx = Math.floor((idx - 1) / 2);
    while (parentIdx >= 0 && this.comparator(this.values[parentIdx], this.values[idx]) > 0) {
      [this.values[parentIdx], this.values[idx]] = [this.values[idx], this.values[parentIdx]];
      idx = parentIdx;
      parentIdx = Math.floor((idx - 1) / 2);
    }
  }
  remove() {
    if (this.size === 0) return -1;
    this.size--;
    if (this.size === 0) return this.values.pop();
    let removedVal = this.values[0];
    this.values[0] = this.values.pop();
    let idx = 0;
    while (idx < this.size && idx < Math.floor(this.size / 2)) {
      let leftIdx = idx * 2 + 1, rightIdx = idx * 2 + 2;
      if (rightIdx === this.size) {
        if (this.comparator(this.values[leftIdx], this.values[idx]) > 0) break;
        [this.values[leftIdx], this.values[idx]] = [this.values[idx], this.values[leftIdx]];
        idx = leftIdx;
      } else if (this.comparator(this.values[leftIdx], this.values[idx]) < 0 || this.comparator(this.values[rightIdx], this.values[idx]) < 0) {
        if (this.comparator(this.values[leftIdx], this.values[rightIdx]) <= 0) {
          [this.values[leftIdx], this.values[idx]] = [this.values[idx], this.values[leftIdx]];
          idx = leftIdx;
        } else {
          [this.values[rightIdx], this.values[idx]] = [this.values[idx], this.values[rightIdx]];
          idx = rightIdx;
        }
      } else {
        break;
      }
    }
    return removedVal;
  }
  top() {
    return this.values[0];
  }
  isEmpty() {
    return this.size === 0;
  }
}

// Two test cases to run function on
console.log(mostBooked(2, [[0,10],[1,5],[2,7],[3,4]])) // 0
console.log(mostBooked(3, [[1,20],[2,10],[3,5],[4,9],[6,8]])) // 1