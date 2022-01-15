// 1487. Making File Names Unique
// Given an array of strings names of size n. You will create n folders in your file system such that, at the ith minute, you will create a folder with the name names[i].
// Since two files cannot have the same name, if you enter a folder name that was previously used, the system will have a suffix addition to its name in the form of (k), where, k is the smallest positive integer such that the obtained name remains unique.
// Return an array of strings of length n where ans[i] is the actual name the system will assign to the ith folder when you create it.


// Solution: Hashmap

// Note: Use a hashmap as a set and a map (for keeping the next possible k for each filename).
// When we loop to find the smallest possible integer, save it in the map -> {original filename: k + 1}.
  // It is not guaranteed that 1 will be the smallest possible integer later, but at least we won't have to loop up to k again.

// Time Complexity: O(n) 270ms
// Space Complexity: O(n) 62.8MB
var getFolderNames = function(names) {
  let map = new Map(), res = [];
  for (var name of names) {
    if (!map.has(name)) {
      res.push(name);
      map.set(name, 1);
    } else {
      let k = map.get(name), newName = `${name}(${k})`;
      while (map.has(newName)) {
        k++;
        newName = `${name}(${k})`;
      }
      res.push(newName);
      map.set(newName, 1);
      map.set(name, k + 1); // saves time so that we don't have to loop to get here again
    }
  }
  return res;
};

// Three test cases to run function on
console.log(getFolderNames(["pes","fifa","gta","pes(2019)"])) // ["pes","fifa","gta","pes(2019)"]
console.log(getFolderNames(["gta","gta(1)","gta","avalon"])) // ["gta","gta(1)","gta(2)","avalon"]
console.log(getFolderNames(["onepiece","onepiece(1)","onepiece(2)","onepiece(3)","onepiece"])) // ["onepiece","onepiece(1)","onepiece(2)","onepiece(3)","onepiece(4)"]