// 929. Unique Email Addresses
// Given an array of strings emails where we send one email to each email[i], return the number of different addresses that actually receive mails.


// Solution 1: Iteration

// create a new set 'unique'
// loop through each email in emails
  // filter email with getEmail, 'filtered'
  // if unique doesn't contain filtered, add filtered to unique.

// Return the size of unique

// getEmail: (email, length of email)
  // local is the local part of the email
  // set i to 0
  // loop while i is smaller than n and email[i] is not + and email[i] is not @
    // if email[i] is not ., append email[i] to local
    // increment i
  // loop while i is smaller than n and email[i] is not @
    // increment i 
  // return local + email.slice(i)

// n = emails.length, m = length of each email
// Time Complexity: O(nm) 84ms
// Space Complexity: O(nm) 44.3MB 
var numUniqueEmails = function(emails) {
  let unique = new Set();
  for (var email of emails) {
    let filtered = getEmail(email, email.length);
    if (!unique.has(filtered)) unique.add(filtered);
  }
  return unique.size;

  function getEmail(email, n) {
    let local = '';
    let i = 0;
    while (i < n && email[i] !== '+' && email[i] !== '@') {
      if (email[i] !== '.') local += email[i];
      i++;
    }
    while (i < n && email[i] !== '@') {
      i++;
    }
    return local + email.slice(i);
  }  
};

// Solution 2: Using In-built Functions

// Time Complexity: O(nm) 96ms
// Space Complexity: O(nm) 43.4MB
var numUniqueEmails = function(emails) {
  let unique = new Set();
  for (var email of emails) {
    let filtered = getEmail(email);
    if (!unique.has(filtered)) unique.add(filtered);
  }
  return unique.size;

  function getEmail(email) {
    email = email.split("@");
    let local = email[0].split("+")[0].replaceAll('.', '');
    return local + '@' + email[1];
  }  
};

// Three test cases to run function on
console.log(numUniqueEmails(["test.email+alex@leetcode.com", "test.email@leetcode.com"])) // 1
console.log(numUniqueEmails(["test.email+alex@leetcode.com","test.e.mail+bob.cathy@leetcode.com","testemail+david@lee.tcode.com"])) // 2
console.log(numUniqueEmails(["a@leetcode.com","b@leetcode.com","c@leetcode.com"])) // 3