export function rotateMatrix(matrix: number[][], direction: "left" | "right") {
  // Transpose the matrix
  let transposedMatrix: number[][] = [];
  for (let i = 0; i < matrix[0].length; i++) {
    transposedMatrix[i] = [];
    for (let j = 0; j < matrix.length; j++) {
      transposedMatrix[i][j] = matrix[j][i];
    }
  }

  // Rotate based on direction
  let rotatedMatrix: number[][];
  if (direction === "left") {
    rotatedMatrix = transposedMatrix.map((row) => row.reverse());
  } else {
    rotatedMatrix = transposedMatrix.reverse();
  }

  return rotatedMatrix;
}
