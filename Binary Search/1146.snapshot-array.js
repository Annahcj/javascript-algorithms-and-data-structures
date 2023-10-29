// 1146. Snapshot Array
// Implement a SnapshotArray that supports the following interface:
// SnapshotArray(int length) initializes an array-like data structure with the given length.  Initially, each element equals 0.
  // void set(index, val) sets the element at the given index to be equal to val.
  // int snap() takes a snapshot of the array and returns the snap_id: the total number of times we called snap() minus 1.
  // int get(index, snap_id) returns the value at the given index, at the time we took the snapshot with the given snap_id


// Solution: Binary Search

// Since the array may not have many changes before a snap is made, it is more space efficient to record the current snap id at each change.
// e.g: arr = [[0,0],[0,0],[0,0]], snap_id = 0
// arr[i][i] = [snap_id at time of change, new value]

// set: When a change is made, push [current snap_id, new value] into arr[index].
// Time Complexity: O(1)

// get: binary search arr[index] for the largest snap_id which is smaller than or equal to snap_id.
// Time Complexity: O(log(m)) m = length of this.arr[index]

var SnapshotArray = function(length) {
  this.arr = Array(length);
  for (let i = 0; i < length; i++) {
    this.arr[i] = [[0, 0]];
  }
  this.snap_id = 0;
};

SnapshotArray.prototype.set = function(index, val) {
  this.arr[index].push([this.snap_id, val]); 
};

SnapshotArray.prototype.snap = function() {
  return this.snap_id++;
};

SnapshotArray.prototype.get = function(index, snap_id) {
  let low = 0, high = this.arr[index].length - 1;
  while (low < high) {
    let mid = Math.ceil((low + high) / 2);
    if (this.arr[index][mid][0] <= snap_id) low = mid;
    else high = mid - 1;
  }
  return this.arr[index][low][1]; 
};

// A few test cases
let snapshotArr = new SnapshotArray(3); // set the length to be 3
snapshotArr.set(0,5);  // Set array[0] = 5
console.log(snapshotArr.snap());  // Take a snapshot, return snap_id = 0
snapshotArr.set(0,6);
console.log(snapshotArr.get(0,0));  // Get the value of array[0] with snap_id = 0, return 5