// 811. Subdomain Visit Count
// We are given a list cpdomains of count-paired domains. We would like a list of count-paired domains, (in the same format as the input, and in any order), that explicitly counts the number of visits to each subdomain.


// Solution 1: Using Built-In Split Function

// Logic:
// Use a hashmap to store visit counts of each subdomain (visits).
// Loop through cpdomains and split each domain by spaces to split the visit count and domain name.
// Then, split the domain name by dots.

// Algorithm:
// Loop through cpdomains (pointer = i)
  // Split cpdomains[i] by spaces ('50 yahoo.com' -> ['50', 'yahoo.com'])
  // Split the domain name by dots ('yahoo.com' -> ['yahoo', 'com'])
  // Loop through each subdomain after splitting from back to front
    // Keep a 'subDomain' string which builds up the subdomain name ('com' -> 'leetcode.com' -> 'discuss.leetcode.com')
    // Increment visits[subDomain] by current visit count
// Loop through visits hashmap
  // Push them into an array and return.

// Time Complexity: O(n) 110ms
// Space Complexity: O(n) 43.3MB
  var subdomainVisits = function(cpdomains) {
    let visits = {}, result = [];
    for (var i = 0; i < cpdomains.length; i++) {
      let [visitCount, domain] = cpdomains[i].split(" ");
      domain = domain.split(".");
      let subDomain = domain[domain.length - 1];
      visits[subDomain] = (visits[subDomain] || 0) + +visitCount;
      for (var j = domain.length - 2; j >= 0; j--) {
        subDomain = domain[j] + '.' + subDomain;
        visits[subDomain] = (visits[subDomain] || 0) + +visitCount;
      }
    }
    for (var subD in visits) {
      result.push(`${visits[subD]} ${subD}`);
    }
    return result;
  };
  
  
  // Solution 2: Linear Search to find Visit Count
  
  // Basically the same as solution 1, except we loop through cpdomains[i] until a space is found.
  // It is much faster than splitting the string
  
  // Time Complexity: O(n) 92ms
  // Space Complexity: O(n) 43.9MB
   var subdomainVisits = function(cpdomains) {
    let visits = {}, result = [];
    for (var i = 0; i < cpdomains.length; i++) {
      let visitCount = '';
      for (var j = 0; j < cpdomains[i].length; j++) {
        if (cpdomains[i][j] === ' ') break;
        visitCount += cpdomains[i][j];
      }
      let domain = cpdomains[i].slice(j+1).split(".");
      let subDomain = domain[domain.length - 1];
      visits[subDomain] = (visits[subDomain] || 0) + +visitCount;
      for (var j = domain.length - 2; j >= 0; j--) {
        subDomain = domain[j] + '.' + subDomain;
        visits[subDomain] = (visits[subDomain] || 0) + +visitCount;
      }
    }
    for (var subD in visits) {
      result.push(`${visits[subD]} ${subD}`);
    }
    return result;
  };
  
  // Two test cases to run function on
  console.log(subdomainVisits(["9001 discuss.leetcode.com"])) // ["9001 discuss.leetcode.com", "9001 leetcode.com", "9001 com"]
  console.log(subdomainVisits(["900 google.mail.com", "50 yahoo.com", "1 intel.mail.com", "5 wiki.org"])) // ["901 mail.com","50 yahoo.com","900 google.mail.com","5 wiki.org","5 org","1 intel.mail.com","951 com"]