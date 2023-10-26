// 721. Accounts Merge
// Given a list of accounts where each element accounts[i] is a list of strings, where the first element accounts[i][0] is a name, and the rest of the elements are emails representing emails of the account.
// Now, we would like to merge these accounts. Two accounts definitely belong to the same person if there is some common email to both accounts. Note that even if two accounts have the same name, they may belong to different people as people could have the same name. A person can have any number of accounts initially, but all of their accounts definitely have the same name.
// After merging the accounts, return the accounts in the following format: the first element of each account is the name, and the rest of the elements are emails in sorted order. The accounts themselves can be returned in any order.


// Solution: Union Find

// Keep track of emails we have seen, with the group index of their first occurance.
// If we have seen an email already, union the current index with the first index of the email.
// When we have finished, we will have information on which groups are connected, and we can build our answer from there.

// n = accounts.length, m = number of emails in each account
// Time Complexity: O(nm) 120ms
// Space Complexity: O(nm) 49MB
var accountsMerge = function(accounts) {
  let n = accounts.length;
  let uf = new UnionFind(n);
  let emailMap = new Map(), indexMap = Array(n);

  for (var i = 0; i < n; i++) {
    for (var j = 1; j < accounts[i].length; j++) {
      let email = accounts[i][j];
      if (!emailMap.has(email)) { // haven't seen it before, save the index i
        emailMap.set(email, i);
        if (!indexMap[i]) indexMap[i] = [];
        indexMap[i].push(email); // keep unique emails in a map (so it's easier to retrieve unique emails later)
      }
      uf.union(i, emailMap.get(email)); // union the current index and the first index of the email
    }
  }
  let group = Array(n);
  for (i = 0; i < n; i++) group[i] = [];
  for (i = 0; i < n; i++) {
    let idx = uf.find(i); // find the parent of i
    group[idx].push(...(indexMap[i] || [])); // push the unique emails into group[idx]
  }
  let res = [];
  for (i = 0; i < n; i++) {
    if (group[i].length) { // only get groups that have emails in them
      group[i].sort(); 
      res.push([accounts[i][0], ...group[i]]);
    }
  }
  return res;
};

class UnionFind {
  constructor(size) {
    this.root = Array(size);
    this.rank = Array(size);
    for (var i = 0; i < size; i++) {
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
}

// Two test cases to run function on
console.log(accountsMerge([["John","johnsmith@mail.com","john_newyork@mail.com"],["John","johnsmith@mail.com","john00@mail.com"],["Mary","mary@mail.com"],["John","johnnybravo@mail.com"]])) // [["John","john00@mail.com","john_newyork@mail.com","johnsmith@mail.com"],["Mary","mary@mail.com"],["John","johnnybravo@mail.com"]]
console.log(accountsMerge([["Gabe","Gabe0@m.co","Gabe3@m.co","Gabe1@m.co"],["Kevin","Kevin3@m.co","Kevin5@m.co","Kevin0@m.co"],["Ethan","Ethan5@m.co","Ethan4@m.co","Ethan0@m.co"],["Hanzo","Hanzo3@m.co","Hanzo1@m.co","Hanzo0@m.co"],["Fern","Fern5@m.co","Fern1@m.co","Fern0@m.co"]])) // [["Ethan","Ethan0@m.co","Ethan4@m.co","Ethan5@m.co"],["Gabe","Gabe0@m.co","Gabe1@m.co","Gabe3@m.co"],["Hanzo","Hanzo0@m.co","Hanzo1@m.co","Hanzo3@m.co"],["Kevin","Kevin0@m.co","Kevin3@m.co","Kevin5@m.co"],["Fern","Fern0@m.co","Fern1@m.co","Fern5@m.co"]]