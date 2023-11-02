// 1998. GCD Sort of an Array
// You are given an integer array nums, and you can perform the following operation any number of times on nums:
  // Swap the positions of two elements nums[i] and nums[j] if gcd(nums[i], nums[j]) > 1 where gcd(nums[i], nums[j]) is the greatest common divisor of nums[i] and nums[j].
// Return true if it is possible to sort nums in non-decreasing order using the above swap method, or false otherwise.


// Solution: Union Find & Prime Factors

// 1. Get the prime factors for each number.

// 2. Group numbers by their prime factors (factorsMap[f] = array of numbers with the factor f)

// 3. Union all numbers sharing the same factors.
  // Union each adjacent pair of numbers for every factor.

// 4. Group numbers by their union find parent.
  // Sort each group of numbers within their group only.
  // Place the sorted numbers back into the appropriate indexes in nums.

// 5. Check if the final state of nums is sorted. If it is, return true.

// It can be proven that connected numbers can be swapped into any order by swapping two elements at a time.

// Time Complexity: O(n sqrt(n)) 572ms
// Space Complexity: O(n sqrt(n)) 74.3MB
var gcdSort = function(nums) {
  let n = nums.length; 
  let factorsMap = new Map();
  for (let i = 0; i < n; i++) {
    let primeFactors = getPrimeFactors(nums[i]);
    for (let factor of primeFactors) {
      if (!factorsMap.has(factor)) factorsMap.set(factor, []);
      factorsMap.get(factor).push(i);
    }
  }
  
  let uf = new UnionFind(n);
  for (let [_factor, indexes] of factorsMap) {
    for (let i = 1; i < indexes.length; i++) {
      uf.union(indexes[i - 1], indexes[i]);
    }
  }
  
  let groups = new Map();
  for (let i = 0; i < n; i++) {
    let parent = uf.find(i);
    if (!groups.has(parent)) groups.set(parent, []);
    groups.get(parent).push(i);
  }
  
  for (let [_parent, indexes] of groups) {
    let numbers = indexes.map((index) => nums[index]);
    numbers.sort((a, b) => a - b);
    for (let i = 0; i < indexes.length; i++) {
      nums[indexes[i]] = numbers[i];
    }
  }
  
  for (let i = 1; i < n; i++) {
    if (nums[i] < nums[i - 1]) return false;
  }
  return true;
};

function getPrimeFactors(n) {
  let res = [];
  for (var x = 2; (x * x) <= n; x++) {
    while (n % x === 0) {
      res.push(x);
      n /= x;
    }
  }
  if (n > 1) res.push(n);
  return res;
}

class UnionFind {
  constructor(size) {
    this.root = Array(size);
    this.rank = Array(size)
    for (var i = 0; i < size; i++) {
      this.root[i] = i;
      this.rank[i] = 1;
    }
  }
  find(x) {
    if (this.root[x] === x) {
      return x;
    }
    return this.root[x] = this.find(this.root[x]);
  }
  union(x, y) {
    let rootX = this.find(x);
    let rootY = this.find(y);
    if (rootX !== rootY) {
      if (this.rank[rootX] > this.rank[rootY]) {
        this.root[rootY] = rootX;
      } else if (this.rank[rootX] < this.rank[rootY]) {
        this.root[rootX] = rootY;
      } else {
        this.root[rootY] = rootX;
        this.rank[rootX]++;
      }
    }
  }
  isConnected(x, y) {
    return this.find(x) === this.find(y);
  }
}

// Three test cases
console.log(gcdSort([7,21,3])) // true
console.log(gcdSort([5,2,6,2])) // false
console.log(gcdSort([10,5,9,3,15])) // true