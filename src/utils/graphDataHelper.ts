export function mapLinePointToTargetLine(sourceLineLength: number, targetLineLength: number, sourceLinePoint: number) {
    // Calculate the ratio of the lengths of the two lines
    const lengthRatio = targetLineLength / sourceLineLength;
  
    // Multiply the point on the first line by the length ratio to get the corresponding point on the second line
    const targetLinePoint = sourceLinePoint * lengthRatio;
  
    return targetLinePoint;
  }
