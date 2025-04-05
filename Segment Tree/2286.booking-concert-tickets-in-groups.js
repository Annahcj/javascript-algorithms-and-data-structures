// 2286. Booking Concert Tickets in Groups
// A concert hall has n rows numbered from 0 to n - 1, each with m seats, numbered from 0 to m - 1. You need to design a ticketing system that can allocate seats in the following cases:
  // If a group of k spectators can sit together in a row.
  // If every member of a group of k spectators can get a seat. They may or may not sit together.
// Note that the spectators are very picky. Hence:
  // They will book seats only if each member of their group can get a seat with row number less than or equal to maxRow. maxRow can vary from group to group.
  // In case there are multiple rows to choose from, the row with the smallest number is chosen. If there are multiple seats to choose in the same row, the seat with the smallest number is chosen.
// Implement the BookMyShow class:
  // BookMyShow(int n, int m) Initializes the object with n as number of rows and m as number of seats per row.
  // int[] gather(int k, int maxRow) Returns an array of length 2 denoting the row and seat number (respectively) of the first seat being allocated to the k members of the group, who must sit together. In other words, it returns the smallest possible r and c such that all [c, c + k - 1] seats are valid and empty in row r, and r <= maxRow. Returns [] in case it is not possible to allocate seats to the group.
  // boolean scatter(int k, int maxRow) Returns true if all k members of the group can be allocated seats in rows 0 to maxRow, who may or may not sit together. If the seats can be allocated, it allocates k seats to the group with the smallest row numbers, and the smallest possible seat numbers in each row. Otherwise, returns false.


// Solution: Segment Tree

// Because we're always taking the minimum seat numbers, we only need to keep track of the count of remaining seats for every row.

// Scatter: 
  // Keep track of the current lowest row with seats remaining.
  // When scatter is called, we want to take all available seats with the lowest rows possible.
  // Increase the row index while the total sum of remaining seats is less than k.
  // We can update the value on every row we take, and bubble up the changes throughout the tree.
// Gather:
  // Use a max segment tree to store the maximum remaining seats for a range.
  // Binary search over the segment tree to find the lowest leaf node where remaining seats >= k.
  // We can make use of the max property to check whether the answer is in the left subtree, if it is we go there, otherwise look right.
  // If we find a valid row, update the value on that leaf node and bubble up the changes throughout the tree.

// Note: The segment tree must be constructed top-down and not bottom-up, in order to guarantee that smaller indices are on the left subtree, and larger indices are on the right subtree.

// n = number of rows
// Time Complexity: 492ms
  // gather: O(n log(n)) amortized
  // scatter: O(n log(n)) amortized
// Space Compexity: O(n) 120.4MB
var BookMyShow = function(n, m) {
  this.segTree = new SegmentTree(Array(n).fill(m));
  this.row = 0;
  this.m = m;
};

BookMyShow.prototype.gather = function(k, maxRow) {
  const minValidRow = this.segTree.getMinIndexLargerThanEqualTo(k);
  if (minValidRow === -1 || minValidRow > maxRow) {
    return [];
  }  
  const remainingSeats = this.segTree.rangeQuery(minValidRow, minValidRow).max;
  this.segTree.update(minValidRow, remainingSeats - k);
  return [minValidRow, this.m - remainingSeats];
};

BookMyShow.prototype.scatter = function(k, maxRow) {
  if (this.segTree.rangeQuery(0, maxRow).sum < k) {
    return false;
  }
  while (k > 0 && this.row <= maxRow) {
    const { sum } = this.segTree.rangeQuery(this.row, this.row);
    const allocatedSeats = Math.min(sum, k);
    this.segTree.update(this.row, sum - allocatedSeats);
    k -= allocatedSeats;
    if (sum - allocatedSeats === 0) {
      this.row++;
    }
  }
  return true;
};

class SegmentTree {
  constructor(arr) {
    this.n = arr.length;
    this.segTree = Array(this.n * 4).fill(0).map(() => ({max: 0, sum: 0}));
    this.build(arr);
  }
  build(arr, node = 1, left = 0, right = this.n - 1) {
    if (left === right) {
      this.segTree[node].sum = arr[left];
      this.segTree[node].max = arr[left];
      return;
    }
    const mid = Math.floor((left + right) / 2);
    this.build(arr, node * 2, left, mid);
    this.build(arr, node * 2 + 1, mid + 1, right);
    this.segTree[node].sum = this.segTree[node * 2].sum + this.segTree[node * 2 + 1].sum;
    this.segTree[node].max = Math.max(this.segTree[node * 2].max, this.segTree[node * 2 + 1].max);
  }
  update(index, newVal, node = 1, left = 0, right = this.n - 1) {
    if (left === right) {
      this.segTree[node].sum = newVal;
      this.segTree[node].max = newVal;
      return;
    }
    const mid = Math.floor((left + right) / 2);
    if (index <= mid) {
      this.update(index, newVal, node * 2, left, mid);
    } else {
      this.update(index, newVal, node * 2 + 1, mid + 1, right);
    }
    this.segTree[node].sum = this.segTree[node * 2].sum + this.segTree[node * 2 + 1].sum;
    this.segTree[node].max = Math.max(this.segTree[node * 2].max, this.segTree[node * 2 + 1].max);
  }
  rangeQuery(ql, qr, node = 1, l = 0, r = this.n - 1) { // ql = query left, qr = query right, (l, r) = boundaries that the current node covers
    if (ql > qr) {
      return {sum: 0, max: 0};
    }
    if (ql === l && qr === r) {
      return this.segTree[node];
    }
    const mid = Math.floor((l + r) / 2);
    const left = this.rangeQuery(ql, Math.min(mid, qr), node * 2, l, mid);
    const right = this.rangeQuery(Math.max(mid + 1, ql), qr, node * 2 + 1, mid + 1, r);
    return {sum: left.sum + right.sum, max: Math.max(left.max, right.max)};
  }
  getMinIndexLargerThanEqualTo(k) {
    let node = 1, left = 0, right = this.n - 1;
    // no nodes in the tree have a value >= k
    if (this.segTree[node].max < k) {
      return -1;
    }
    while (node < this.segTree.length) {
      if (left === right) { // found minimum index with value >= k
        return left;
      }
      const mid = Math.floor((left + right) / 2);
      const leftIndex = node * 2, rightIndex = node * 2 + 1;
      if (this.segTree[leftIndex].max >= k) { // there is a valid node on the left subtree
        node = leftIndex;
        right = mid;
      } else { // there is a valid node on the right subtree. don't need to check max because we know the tree has a valid value
        node = rightIndex;
        left = mid + 1;
      }
    } 
  }
}

// A few test cases
const bms = new BookMyShow(2, 5); // There are 2 rows with 5 seats each 
console.log(bms.gather(4, 0)); // return [0, 0]
                               // The group books seats [0, 3] of row 0. 
console.log(bms.gather(2, 0)); // return []
                               // There is only 1 seat left in row 0,
                               // so it is not possible to book 2 consecutive seats. 
console.log(bms.scatter(5, 1)); // return True
                                // The group books seat 4 of row 0 and seats [0, 3] of row 1. 
console.log(bms.scatter(5, 1)); // return False
                                // There is only one seat left in the hall.