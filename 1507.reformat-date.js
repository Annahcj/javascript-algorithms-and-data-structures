// 1507. Reformat Date
// Given a date string in the form Day Month Year, where:
  // Day is in the set {"1st", "2nd", "3rd", "4th", ..., "30th", "31st"}.
  // Month is in the set {"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"}.
  // Year is in the range [1900, 2100].
// Convert the date string to the format YYYY-MM-DD, where:
  // YYYY denotes the 4 digit year.
  // MM denotes the 2 digit month.
  // DD denotes the 2 digit day.


// Solution: Hashmap & Regex

// Populate each month into a hashmap with its corresponding 2-digit month.
// Use a regular expression to get the number from the day, and pad it with a zero if necessary.

// Time Complexity: O(1) 115ms
// Space Complexity: O(1) 38.4MB
var reformatDate = function(date) {
  let months = { 
    Jan: '01',
    Feb: '02',
    Mar: '03',
    Apr: '04',
    May: '05',
    Jun: '06',
    Jul: '07',
    Aug: '08',
    Sep: '09',
    Oct: '10',
    Nov: '11',
    Dec: '12' 
  };
  let [day, month, year] = date.split(" ");
  day = day.match(/[0-9]+/)[0], month = months[month];
  if (day.length === 1) day = '0' + day;
  return `${year}-${month}-${day}`;
};

// Three test cases to run function on
console.log(reformatDate("20th Oct 2052")) // 2052-10-20
console.log(reformatDate("6th Jun 1933")) // 1933-06-06
console.log(reformatDate("26th May 1960")) // 1960-05-26