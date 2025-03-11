// 3470. Permutations IV
// Given two integers, n and k, an alternating permutation is a permutation of the first n positive integers such that no two adjacent elements are both odd or both even.
// Return the k-th alternating permutation sorted in lexicographical order. If there are fewer than k valid alternating permutations, return an empty list.


// Solution: Enumeration & Combinatorics

// For each digit, enumerate every possible remaining number.
// If we take x as the digit, we can calculate the number of permutations for this starting digit using the formula:
  // (odd numbers)! * (even numbers)!
  // The positions of even and odd numbers must stay the same to satisfy the no two adjacent odd or even numbers rule.
  // However, the order of the even or odd numbers doesn't matter as long as they are all odd or all even within those positions.
  // Hence, we take all permutations of odd and even numbers within those positions and multiply them together to get the total permutations.

// Take the first digit where k <= the range of permutations up to the digit.

// e.g. [1,2,3,4]
  // If we take 1 as the first digit:
    // [1,_2_,3,_4_] - these even numbers must stay even in those positions.
    // [1,_4_,3,_2_] - swapping the even numbers around still satisfies the rule.
    // Likewise with odd numbers.

// Time Complexity: O(n^2) 8ms
// Space Complexity: O(n) 60.37MB
function permute(n, k) {
  const res = [], taken = Array(n + 1).fill(false);
  let odd = Math.ceil(n / 2), even = Math.floor(n / 2);
  for (let i = 0; i < n; i++) {
    const permsOdd = factorial(odd - 1) * factorial(even);
    const permsEven = factorial(odd) * factorial(even - 1);
    let currPerms = 0;
    for (let x = 1; x <= n; x++) {
      if (taken[x]) continue;
      // if there needs to be more odd digits than even, the first digit must be odd.
      if (i === 0 && n % 2 === 1 && x % 2 === 0) continue;
      // if previous number was odd, current must be even. if previous was even, current must be odd.
      if (res.length > 0 && (res[res.length - 1] + x) % 2 === 0) continue;
      const perms = x % 2 === 0 ? permsEven : permsOdd;
      if (k <= currPerms + perms) {
        res.push(x);
        k -= currPerms;
        taken[x] = true;
        odd -= x % 2 === 1 ? 1 : 0;
        even -= x % 2 === 0 ? 1 : 0;
        break;
      }
      currPerms += perms;
    }
  }
  return res;
};

function factorial(n) {
  let ans = 1;
  while (n > 1) {
    ans *= n;
    n--;
  }
  return ans;
}

// Three test cases
console.log(permute(4, 6)) // [3,4,1,2]
console.log(permute(3, 2)) // [3,2,1]
console.log(permute(2, 3)) // []