// 2043. Simple Bank System

// Runtime on LeetCode: 628ms
// Memory Usage on LeetCode: 89.3MB

// Time Complexity: O(1) for all methods
// Space Complexity: O(n) for just the initial balance array
var Bank = function(balance) {
  this.bank = balance; 
};

Bank.prototype.transfer = function(account1, account2, money) {
  let n = this.bank.length;
  // this.bank[account - 1] = account

  // if acc1 exists
  if (account1 > 0 && account1 <= n) {
    // if acc1 contains enough money
    if (this.bank[account1 - 1] >= money) {
      // if acc2 exists
      if (account2 > 0 && account2 <= n) {
        // deduct from acc1
        this.bank[account1 - 1] -= money;
        // add to acc2
        this.bank[account2 - 1] += money;
        return true;
      }
    }
  }
  return false; 
};

Bank.prototype.deposit = function(account, money) {
  let n = this.bank.length;
  // this.bank[account - 1] = account
  // if account is valid
  if (account > 0 && account <= n) {
    // deposit money
    this.bank[account - 1] += money;
    return true;
  }
  return false; 
};

Bank.prototype.withdraw = function(account, money) {
  let n = this.bank.length;
  // this.bank[account - 1] = account
  // if account is valid
  if (account > 0 && account <= n) {
    // if account has enough money
    if (this.bank[account - 1] >= money) {
      // withdraw money
      this.bank[account - 1] -= money;
      return true;
    }
  }
  return false;
};

let bank = new Bank([10, 100, 20, 50, 30]);
console.log(bank.withdraw(3, 10));    // return true, account 3 has a balance of $20, so it is valid to withdraw $10.
                         // Account 3 has $20 - $10 = $10.
console.log(bank.transfer(5, 1, 20)); // return true, account 5 has a balance of $30, so it is valid to transfer $20.
                         // Account 5 has $30 - $20 = $10, and account 1 has $10 + $20 = $30.
console.log(bank.deposit(5, 20));     // return true, it is valid to deposit $20 to account 5.
                         // Account 5 has $10 + $20 = $30.
console.log(bank.transfer(3, 4, 15)); // return false, the current balance of account 3 is $10,
                         // so it is invalid to transfer $15 from it.
console.log(bank.withdraw(10, 50));   // return false, it is invalid because account 10 does not exist.