// 1452. People Whose List of Favorite Companies Is Not a Subset of Another List
// Given the array favoriteCompanies where favoriteCompanies[i] is the list of favorites companies for the ith person (indexed from 0).
// Return the indices of people whose list of favorite companies is not a subset of any other list of favorites companies. You must return the indices in increasing order.


// Solution: Sorting & Two Pointers

// 1. Map each company to an index -> { companyName: index, companyName: index, ... }
  // Add each company to a set.
  // Turn the set into an array and assign an index to each unique company.
  // The purpose of this is to avoid the cost of comparing strings, numbers are much cheaper to compare.

// 2. Sort each list of company indexes in asc order.

// 3. Sort favoriteCompanies in asc order based on array length.

// 4. For each favoriteCompanies[i] (starting from greatest array length), check whether it is a subset of any other list.
  // Since subsets will always have length less than or equal to the other set, only look at favoriteCompanies[j] that has favoritesCompanies[j].length >= favoritesCompanies[i].length.
  // Use two pointers to check whether it is a subset. If list i has an index that list j does not have, it is not a subset of it.

// n = favoriteCompanies.length, m = favoriteCompanies[i].length, k = favoriteCompanies[i][j].length
// Time Complexity: O(nmk + n^2m) 352ms
// Space Complexity: O(nm) 65MB
var peopleIndexes = function(favoriteCompanies) {
  // get set of unique companies
  let companiesSet = new Set();
  for (let companies of favoriteCompanies) {
    for (let company of companies) {
      companiesSet.add(company);
    }
  }
  
  // assign index to each unique company
  let companiesMap = [...companiesSet].reduce((memo, company, index) => {
    memo.set(company, index);
    return memo;
  }, new Map());
  
  // turn each company string into index, and sort each list by index, and lists by array length.
  favoriteCompanies = favoriteCompanies.map((companies, index) => {
    return [index, companies.map((company) => companiesMap.get(company)).sort((a, b) => a - b)];
  }).sort((a, b) => a[1].length - b[1].length);
  
  // compare each companies[i] with each companies[j] to check whether it is a subset of it.
  let n = favoriteCompanies.length, res = [];
  for (let i = 0; i < n; i++) {
    let index = favoriteCompanies[i][0], companyIsSubset = false;
    for (let j = i + 1; j < n; j++) {
      if (isSubset(favoriteCompanies[i][1], favoriteCompanies[j][1])) {
        companyIsSubset = true;
        break;
      }
    }
    if (!companyIsSubset) res.push(index);
  }
  return res.sort((a, b) => a - b);
  
  function isSubset(arr1, arr2) { // arr1 subset of arr2
    let i = 0;
    for (let j = 0; j < arr2.length; j++) {
      if (arr2[j] === arr1[i]) i++;
    }
    return i === arr1.length;
  }
};

// Two test cases
console.log(peopleIndexes([["leetcode","google","facebook"],["google","microsoft"],["google","facebook"],["google"],["amazon"]])) // [0,1,4]
console.log(peopleIndexes([["leetcode","google","facebook"],["leetcode","amazon"],["facebook","google"]])) // [0,1]