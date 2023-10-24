function isCloseEnough(arr1,arr2, threshold) {
    //4D array distance
    let r1 = arr1[0];
    let g1 = arr1[1];
    let b1 = arr1[2];
    let a1 = arr1[3];
    let r2 = arr2[0];
    let g2 = arr2[1];
    let b2 = arr2[2];
    let a2 = arr2[3];
    let r = Math.abs(r1 - r2);
    let g = Math.abs(g1 - g2);
    let b = Math.abs(b1 - b2);
    let a = Math.abs(a1 - a2);
  
    let dist = Math.sqrt(r*r + g*g + b*b + a*a);
    return dist < threshold;
  }