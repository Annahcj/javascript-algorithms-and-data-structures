// 2469. Convert the Temperature
// You are given a non-negative floating point number rounded to two decimal places celsius, that denotes the temperature in Celsius.
// You should convert Celsius into Kelvin and Fahrenheit and return it as an array ans = [kelvin, fahrenheit].
// Return the array ans. Answers within 10-5 of the actual answer will be accepted.
// Note that:
  // Kelvin = Celsius + 273.15
  // Fahrenheit = Celsius * 1.80 + 32.00


// Solution:

// Time Complexity: O(1) 114ms
// Space Complexity: O(1) 41.7MB
var convertTemperature = function(celsius) {
  return [celsius + 273.15, celsius * 1.80 + 32.00];
};

// Two test cases
console.log(convertTemperature(36.50)) // [309.65000,97.70000]
console.log(convertTemperature(122.11)) // [395.26000,251.79800]