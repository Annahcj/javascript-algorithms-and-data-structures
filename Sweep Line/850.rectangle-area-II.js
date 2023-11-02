// 850. Rectangle Area II
// We are given a list of (axis-aligned) rectangles. Each rectangle[i] = [xi1, yi1, xi2, yi2] , where (xi1, yi1) are the coordinates of the bottom-left corner, and (xi2, yi2) are the coordinates of the top-right corner of the ith rectangle.
// Find the total area covered by all rectangles in the plane. Since the answer may be too large, return it modulo 10^9 + 7.


// Solution: Line Sweep

//            x1 y1 x2 y2
// For e.g: [ 1, 0, 3, 1 ]
// y1 to y2 is the depth of the rectangle.
// for y1, we call it an 'open' event
// for y2, we call it a 'close' event, since that's where it ends.

// For this rectangle, 
// 1. push [y1, 'open', x1, x2]
// 2. push [y2, 'close', x1, x2]

// repeat the above steps for each rectangle in rectangles
// then, sort events in ascending order by y

// loop through each event in events

// calculate max width from x coordinates in 'active'
// add max width * (current y - last y) to total area

// if event type is open, push [x1, x2] into an array 'active', then sort active by asc order.
// we use this 'active' array to calculate the maximum width for the current y
// if the event type is close, remove [x1, x2] from 'active'

// update last y to currY

// return area

var rectangleArea = function(rectangles) {
  let events = [], active = [], area = 0n;
  let mod = BigInt(1000000007);
  for (var rec of rectangles) {
    events.push([rec[1], 'open', rec[0], rec[2]]);
    events.push([rec[3], 'close', rec[0], rec[2]]);
  }  
  events = events.sort((a, b) => a[0] - b[0]);
  let y = events[0][0];
  for (var event of events) {
    let currY = event[0], type = event[1], x1 = event[2], x2 = event[3];
    let maxWidth = 0, curr = -1;
    for (var ev of active) {
      curr = Math.max(curr, ev[0]);
      maxWidth += Math.max(0, ev[1] - curr);
      curr = Math.max(curr, ev[1]);
    }
    area += (BigInt(maxWidth) * BigInt(currY - y));
    area %= mod;
    if (type === 'open') {
      active.push([x1, x2]);
      active = active.sort((a, b) => a[0] - b[0]);
    } else {
      for (var i = 0; i < active.length; i++) {
        let e = active[i];
        if (e[0] === x1 && e[1] === x2) {
          active.splice(i, 1);
          break;
        }
      }
    }
    y = currY;
  }
  return area % mod;
};

console.log(rectangleArea([[0,0,2,2],[1,0,2,3],[1,0,3,1]])) // 6
console.log(rectangleArea([[0,0,1000000000,1000000000]])) // 49