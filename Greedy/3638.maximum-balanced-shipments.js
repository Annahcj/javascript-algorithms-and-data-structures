// 3638. Maximum Balanced Shipments
// You are given an integer array weight of length n, representing the weights of n parcels arranged in a straight line. A shipment is defined as a contiguous subarray of parcels. A shipment is considered balanced if the weight of the last parcel is strictly less than the maximum weight among all parcels in that shipment.
// Select a set of non-overlapping, contiguous, balanced shipments such that each parcel appears in at most one shipment (parcels may remain unshipped).
// Return the maximum possible number of balanced shipments that can be formed.


// Solution: Greedy

// Once we find a valid subarray, it is optimal to take that as a shipment instead of extending it.
// Extending a subarray can only make it worse by having a max element as the last element.

// There is also no benefit to skipping over any elements, because
  // if we skip over a large number, it can help create a valid subarray being the maximum
  // if we skip over a small number, it won't make any different since it's not the maximum anyway

// Time Complexity: O(n) 9ms
// Space Complexity: O(1) 72MB
function maxBalancedShipments(weight) {
  let balanced = 0, max = 0;
  for (let w of weight) {
    max = Math.max(max, w);
    if (w < max) {
      balanced++;
      max = 0;
    }
  }
  return balanced;
};

// Two test cases
console.log(maxBalancedShipments([2,5,1,4,3])) // 2
console.log(maxBalancedShipments([4,4])) // 0