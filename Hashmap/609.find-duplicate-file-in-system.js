// 609. Find Duplicate File in System
// Given a list paths of directory info, including the directory path, and all the files with contents in this directory, return all the duplicate files in the file system in terms of their paths. You may return the answer in any order.


// Solution: Hashmap

// Split each string in paths and process the filepaths into a hashmap with the file contents as keys.
// format: {file content: [filepath, filepath], file content: [filepath, ...]}
// then populate the final result, only taking the filepaths if there are 2 or more with the same file content.

// n = length of paths, k = length of each string in paths
// Time Complexity: O(nk) 152ms
// Space Complexity: O(nk) 56.4MB
var findDuplicate = function(paths) {
  let contentMap = {};
  for (var path of paths) {
    path = path.split(" ");
    let rootDir = path[0];
    for (var i = 1; i < path.length; i++) {
      let [fileName, content] = path[i].split("(");
      content = content.replace(')', '');
      if (!contentMap[content]) contentMap[content] = [];
      contentMap[content].push(rootDir + '/' + fileName);
    }
  }  
  let res = [];
  for (var content in contentMap) {
    if (contentMap[content].length > 1) {
      res.push(contentMap[content]);
    }
  }
  return res;
};

// Two test cases to run function on
console.log(findDuplicate(["root/a 1.txt(abcd) 2.txt(efgh)","root/c 3.txt(abcd)","root/c/d 4.txt(efgh)","root 4.txt(efgh)"])) // [["root/a/2.txt","root/c/d/4.txt","root/4.txt"],["root/a/1.txt","root/c/3.txt"]]
console.log(findDuplicate(["root/a 1.txt(abcd) 2.txt(efgh)","root/c 3.txt(abcd)","root/c/d 4.txt(efgh)"])) // [["root/a/2.txt","root/c/d/4.txt"],["root/a/1.txt","root/c/3.txt"]]