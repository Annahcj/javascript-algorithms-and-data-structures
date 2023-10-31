// 2092. Find All People With Secret
// You are given an integer n indicating there are n people numbered from 0 to n - 1. You are also given a 0-indexed 2D integer array meetings where meetings[i] = [xi, yi, timei] indicates that person xi and person yi have a meeting at timei. A person may attend multiple meetings at the same time. Finally, you are given an integer firstPerson.
// Person 0 has a secret and initially shares the secret with a person firstPerson at time 0. This secret is then shared every time a meeting takes place with a person that has the secret. More formally, for every meeting, if a person xi has the secret at timei, then they will share the secret with person yi, and vice versa.
// The secrets are shared instantaneously. That is, a person may receive the secret and share it with people in other meetings within the same time frame.
// Return a list of all the people that have the secret after all the meetings have taken place. You may return the answer in any order.


// Solution: Union Find & Sorting

// 1. Sort meetings in asc order by their meeting time
// 2. Union 0 and firstPerson
// 3. Loop through meetings (pointer = i)
  // set time to be meetings[i][2]
  // keep track of a set 'pool' which contains all people who have a meeting at time
  // Loop through all meetings (x, y) that have the same meeting time as time,
    // union x and y
    // add x to the pool 
    // add y to the pool
    // increment i
  // Loop through the pool, reset any person who is not connected to 0 (was in a meeting at the same time but doesn't know the secret)
// 4. Get all the people who are connected to 0 and return them.

// m = meetings.length
// Time Complexity: O(m log(m) + n) 444ms
// Space Complexity: O(n) 73.9MB
var findAllPeople = function(n, meetings, firstPerson) {
  meetings.sort((a, b) => a[2] - b[2]);
  let uf = new UnionFind(n);
  uf.union(0, firstPerson);
  let i = 0;
  while (i < meetings.length) {
    let time = meetings[i][2];
    let pool = new Set();
    while (i < meetings.length && time === meetings[i][2]) {
      let [x, y] = meetings[i];
      uf.union(x, y);
      pool.add(x);
      pool.add(y);
      i++;
    }
    pool.forEach(j => {
      if (!uf.connected(0, j)) uf.reset(j); // if not connected to 0, reset it otherwise it can be falsely connected to future secret-knowers.
    })
  }
  let res = [];
  for (let i = 0; i < n; i++) {
    if (uf.connected(0, i)) res.push(i); // get all the people connected to 0
  }
  return res;
};

class UnionFind {
  constructor(size) {
    this.rank = Array(size);
    this.root = Array(size);
    for (let i = 0; i < size; i++) {
      this.root[i] = i;
      this.rank[i] = 1;
    }
  }
  find(x) {
    if (this.root[x] === x) return x;
    this.root[x] = this.find(this.root[x]);
    return this.root[x];
  }
  union(x, y) {
    let rootX = this.find(x), rootY = this.find(y);
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
  connected(x, y) {
    return this.find(x) === this.find(y);
  }
  reset(x) {
    this.root[x] = x;
    this.rank[x] = 1;
  }
}

// Four test cases
console.log(findAllPeople(6, [[1,2,5],[2,3,8],[1,5,10]], 1)) // [0,1,2,3,5]
console.log(findAllPeople(4, [[3,1,3],[1,2,2],[0,3,3]], 3)) // [0,1,3]
console.log(findAllPeople(5, [[3,4,2],[1,2,1],[2,3,1]], 1)) // [0,1,2,3,4]
console.log(findAllPeople(6, [[0,2,1],[1,3,1],[4,5,1]], 1)) // [0,1,2,3]