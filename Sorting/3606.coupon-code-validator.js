// 3606. Coupon Code Validator
// You are given three arrays of length n that describe the properties of n coupons: code, businessLine, and isActive. The ith coupon has:
  // code[i]: a string representing the coupon identifier.
  // businessLine[i]: a string denoting the business category of the coupon.
  // isActive[i]: a boolean indicating whether the coupon is currently active.
// A coupon is considered valid if all of the following conditions hold:
  // code[i] is non-empty and consists only of alphanumeric characters (a-z, A-Z, 0-9) and underscores (_).
  // businessLine[i] is one of the following four categories: "electronics", "grocery", "pharmacy", "restaurant".
  // isActive[i] is true.
// Return an array of the codes of all valid coupons, sorted first by their businessLine in the order: "electronics", "grocery", "pharmacy", "restaurant", and then by code in lexicographical (ascending) order within each category.


// Solution:

// Get the indices of the valid coupons.
// Sort them by business line, then by code in lexicographical order.
// Convert the indices into code before returning.

// Time Complexity: O(n log(n)) 3ms
// Space Complexity: O(n) 63MB
function validateCoupons(code, businessLine, isActive) {
  const n = code.length;
  const valid = [], businessLines = ["electronics", "grocery", "pharmacy", "restaurant"];
  for (let i = 0; i < n; i++) {
    if (isValidCode(code[i]) && businessLines.includes(businessLine[i]) && isActive[i]) {
      valid.push(i);
    }
  }
  return valid.sort((a, b) => {
    const businessLineA = businessLines.indexOf(businessLine[a]);
    const businessLineB = businessLines.indexOf(businessLine[b]);
    if (businessLineA !== businessLineB) {
      return businessLineA - businessLineB;
    }
    return code[a] < code[b] ? -1 : 1;
  }).map((i) => code[i]);
};

function isValidCode(code) {
  return code.length > 0 && code.match(/[a-zA-Z0-9_]+/)[0].length === code.length;
}