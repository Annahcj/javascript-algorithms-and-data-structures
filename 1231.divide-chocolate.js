// 1231. Divide Chocolate
// You have one chocolate bar that consists of some chunks. Each chunk has its own sweetness given by the array sweetness.
// You want to share the chocolate with your k friends so you start cutting the chocolate bar into k + 1 pieces using k cuts, each piece consists of some consecutive chunks.
// Being generous, you will eat the piece with the minimum total sweetness and give the other pieces to your friends.
// Find the maximum total sweetness of the piece you can get by cutting the chocolate bar optimally.


// Solution: Binary Search

// n = length of sweetness, s = sum of sweetness, m = min of sweetness
// Time Complexity: O(n * log(s - m)) 84ms
// Space Complexity: O(1) 42MB
var maximizeSweetness = function(sweetness, k) {
  let left = Infinity, right = 0;
  for (var num of sweetness) {
    left = Math.min(left, num);
    right += num;
  }  

  while (left < right) {
    // Math.ceil otherwise when we set left to mid, we will infinitely loop
    let mid = Math.ceil((left + right) / 2);
    // calculate number of groups with sum less than or equal to mid  
    let groups = 0;
    let sum = 0;
    for (var num of sweetness) {
      sum += num;
      if (sum >= mid) {
        groups++;
        sum = 0;
      }
    }
    // if groups is sufficient, set left to mid (not mid + 1 because mid could be the answer)
    if (groups >= k + 1) {
      left = mid;
    } else {
      right = mid - 1;
    }
  }
  return left;
};

// Three test cases to run function on
console.log(maximizeSweetness([1,2,3,4,5,6,7,8,9], 5)) // 6
console.log(maximizeSweetness([5,6,7,8,9,1,2,3,4], 8)) // 1
console.log(maximizeSweetness([1,2,2,1,2,2,1,2,2], 2)) // 5