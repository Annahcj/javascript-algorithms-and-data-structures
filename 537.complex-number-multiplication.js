// 537. Complex Number Multiplication
// A complex number can be represented as a string on the form "real+imaginaryi" where:
// real is the real part and is an integer in the range [-100, 100].
// imaginary is the imaginary part and is an integer in the range [-100, 100].
// i2 == -1.
// Given two complex numbers num1 and num2 as strings, return a string of the complex number that represents their multiplications.


// Solution: Split Strings and Calculate

// Split num1 and num2 by '+', since it's guaranteed to be in "real+imaginaryi" format.
// parse all integers from num1[0], num1[1], num2[0], num2[1]

// key
// x1 = num1[0] 
// x2 = num1[1] 
// y1 = num2[0] 
// y2 = num2[1] 

// (x1 + x2) * (y1 + y2) = x1y1 + x1y2 + x2y1 + x2y2
// return (x1 * y1 - x2 * y2)+(x1 * y2 + x2 * y1)i

// Time Complexity: O(1) 64ms
// Space Complexity: O(1) 38.7MB
var complexNumberMultiply = function(num1, num2) {
  const n1 = num1.split("+"), n2 = num2.split("+");
  const x1 = +n1[0], x2 = parseInt(n1[1]);
  const y1 = +n2[0], y2 = parseInt(n2[1]); 
  return (x1 * y1 - x2 * y2) + '+' + (x1 * y2 + x2 * y1) + 'i';
};

// Two test cases to run function on
console.log(complexNumberMultiply("1+1i", "1+1i")) // "0+2i"
console.log(complexNumberMultiply("1+-1i", "1+-1i")) // "0+-2i"