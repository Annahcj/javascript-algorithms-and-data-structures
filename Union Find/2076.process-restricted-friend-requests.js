// 2076. Process Restricted Friend Requests
// You are given an integer n indicating the number of people in a network. Each person is labeled from 0 to n - 1.
// You are also given a 0-indexed 2D integer array restrictions, where restrictions[i] = [xi, yi] means that person xi and person yi cannot become friends, either directly or indirectly through other people.
// Initially, no one is friends with each other. You are given a list of friend requests as a 0-indexed 2D integer array requests, where requests[j] = [uj, vj] is a friend request between person uj and person vj.
// A friend request is successful if uj and vj can be friends. Each friend request is processed in the given order (i.e., requests[j] occurs before requests[j + 1]), and upon a successful request, uj and vj become direct friends for all future friend requests.
// Return a boolean array result, where each result[j] is true if the jth friend request is successful or false if it is not.


// Solution: Union Find

// For each request,
  // find the root of requests[i][0] -> rootX, and requests[i][1] -> rootY
  // set possible to true (flag for whether connection is possible)
  // if rootX is not equal to rootY
    // loop through each [x, y] in restrictions
      // find the root of x -> rootBanX, and y -> rootBanY
      // if either rootBanX is equal to rootX and rootBanY is equal to rootY, OR rootBanX is equal to rootY and rootBanY is equal to rootX
        // set possible to false (they cannot be connected)
        // break
  // if possible is false
    // push false into result
  // otherwise,
    // push true into result
    // connect rootX and rootY

// n = requests.length, m = restrictions.length
// Time Complexity: O(nm) 330ms
// Space Complexity: O(n) 47MB
var friendRequests = function(n, restrictions, requests) {
  let uf = new UnionFind(n);
  let res = [];
  for (let i = 0; i < requests.length; i++) {
    let rootX = uf.find(requests[i][0]), rootY = uf.find(requests[i][1]);
    let possible = true;
    if (rootX !== rootY) {
      for (let [x, y] of restrictions) {
        let rootBanX = uf.find(x), rootBanY = uf.find(y);
        if ((rootBanX === rootX && rootBanY === rootY) || (rootBanX === rootY && rootBanY === rootX)) {
          possible = false;
          break;
        }
      }
    }
    if (!possible) {
      res.push(false);
    } else {
      res.push(true);
      uf.union(rootX, rootY);
    }
  }
  return res;
};

// Union Find with path compression & union by rank
class UnionFind {
  constructor(size) {
    this.root = Array(size);
    this.rank = Array(size);
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
}

// Three test cases
console.log(friendRequests(3, [[0,1]], [[0,2],[2,1]])) // [true,false]
console.log(friendRequests(3, [[0,1]], [[1,2],[0,2]])) // [true,false]
console.log(friendRequests(5, [[0,1],[1,2],[2,3]], [[0,4],[1,2],[3,1],[3,4]])) // [true,false,true,false]