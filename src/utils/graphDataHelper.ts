function mapPointToSecondLine(line1Length: number, line2Length: number, line1Point: number) {
    // Calculate the ratio of the lengths of the two lines
    const lengthRatio = line2Length / line1Length;
  
    // Multiply the point on the first line by the length ratio to get the corresponding point on the second line
    const line2Point = line1Point * lengthRatio;
  
    return line2Point;
  }