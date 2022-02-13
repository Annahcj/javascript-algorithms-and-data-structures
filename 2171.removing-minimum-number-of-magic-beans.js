// 2171. Removing Minimum Number of Magic Beans
// You are given an array of positive integers beans, where each integer represents the number of magic beans found in a particular magic bag.
// Remove any number of beans (possibly none) from each bag such that the number of beans in each remaining non-empty bag (still containing at least one bean) is equal. Once a bean has been removed from a bag, you are not allowed to return it to any of the bags.
// Return the minimum number of magic beans that you have to remove.


// Solution: Sort & Prefix Sum

// First, sort beans in asc order.
// Try to pick each bean as the bean which all non-zero elements are equal to.
  // To pick bean[i], we remove all smaller beans and decrement all larger beans to become bean[i].
  // To elaborate, the removal cost is: 
    // sum of the beans on the left (turn them all into 0)
    // difference of all beans on the right with bean[i]: rightSum - beans[i] * (n - i).

// Time Complexity: O(n log(n))
// Space Complexity: O(log(n)) (space for sorting)
var minimumRemoval = function(beans) {
  let right = 0;
  for (let num of beans) right += num;
  beans.sort((a, b) => a - b);

  let left = 0, n = beans.length, ans = Infinity;
  for (let i = 0; i < n; i++) {
    ans = Math.min(ans, left + (right - beans[i] * (n - i)));
    right -= beans[i];
    left += beans[i];
  }
  return ans;
};

// Two test cases to run function on
console.log(minimumRemoval([4,1,6,5])) // 4
console.log(minimumRemoval([2,10,3,2])) // 7