// 1169. Invalid Transactions
// A transaction is possibly invalid if:
  // the amount exceeds $1000, or;
  // if it occurs within (and including) 60 minutes of another transaction with the same name in a different city.
// You are given an array of strings transaction where transactions[i] consists of comma-separated values representing the name, time (in minutes), amount, and city of the transaction.
// Return a list of transactions that are possibly invalid. You may return the answer in any order.


// Solution 1: Brute Force

// Keep track of invalid transactions using an array 'invalid'. 
  // Invalid: 1
  // Valid: 0

// Time Complexity: O(n^2) 1404ms
// Space Complexity: O(n) 49.3MB
var invalidTransactions = function(transactions) {
  let n = transactions.length;
  let invalid = Array(n).fill(0);
  
  for (let i = 0; i < n; i++) {
    let [name, time, amount, city] = transactions[i].split(",");
    time = +time, amount = +amount;
    // amount exceeds $1000
    if (amount > 1000) invalid[i] = 1;
    
    // find same name in different city within 60 minutes
    for (let j = i + 1; j < n; j++) {
      let [name2, time2, _amount2, city2] = transactions[j].split(",");
      time2 = +time2;
      let timeDiff = Math.abs(time - time2);
      if (name === name2 && city2 !== city && timeDiff <= 60) {
        invalid[i] = 1;
        invalid[j] = 1;
      } 
    }
  }

  let res = [];
  for (let i = 0; i < n; i++) {
    if (invalid[i]) res.push(transactions[i]);
  }
  return res;
};


// Solution 2: Group by Name

// 1. people: Group each transaction by name, storing the indices.
// 2. For each transaction, 
  // Get transactions with an amount > 1000 or
  // Loop through the transactions with the same name and find a transaction with
    // 1. A different city
    // 2. A time difference <= 60

// Time Complexity: O(n^2) 169ms
// Space Complexity: O(n) 49.4MB
var invalidTransactions = function(transactions) {
  let people = new Map(), n = transactions.length, res = [];
  
  // group by name
  for (let i = 0; i < n; i++) {
    let [name, time, _amount, _city] = transactions[i].split(",");
    time = +time;
    
    if (!people.has(name)) people.set(name, []);
    people.get(name).push(i);
  }
  
  for (let i = 0; i < n; i++) {
    let [name, time, amount, city] = transactions[i].split(",");
    time = +time, amount = +amount;
    
    if (amount > 1000) {
      res.push(transactions[i]);
      continue;
    }
    
    let indices = people.get(name);
    for (let j of indices) {
      if (j === i) continue;
      let [_name2, time2, _amount2, city2] = transactions[j].split(",");
      time2 = +time2;
      
      let timeDiff = Math.abs(time - time2);
      if (city2 !== city && timeDiff <= 60) {
        res.push(transactions[i]);
        break;
      }
    }
  }
  return res;
};

// Three test cases 
console.log(invalidTransactions(["alice,20,800,mtv","alice,50,100,beijing"])) // ["alice,20,800,mtv","alice,50,100,beijing"]
console.log(invalidTransactions(["alice,20,800,mtv","alice,50,1200,mtv"])) // ["alice,50,1200,mtv"]
console.log(invalidTransactions(["alice,20,800,mtv","bob,50,1200,mtv"])) // ["bob,50,1200,mtv"]