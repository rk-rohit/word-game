import { useEffect, useState } from "react";

function MatrixDispaly({ matrixSize }) {
  const [matrix, setMatrix] = useState([]);
  const [changedIndex, setChangedIndex] = useState();
  const [userOutput, setUserOutput] = useState({});

  useEffect(() => {
    const result = generateMatrixArr(matrixSize);
    setMatrix(result);
  }, [matrixSize]);

  const generateMatrixArr = (matrixSize) => {
    const row = matrixSize;
    const col = matrixSize;
    const mat = [];
    for (let i = 0; i < row; i++) {
      mat[i] = [];
      for (let j = 0; j < col; j++) {
        mat[i][j] = "";
      }
    }
    return mat;
  };

  const userInput = (row, col, val) => {
    if (val && matrix[row][col] === "") {
      let prevArr = [...matrix];
      prevArr[row][col] = val;
      setMatrix(prevArr);
      setChangedIndex({
        row,
        col
      });
    }
  };

  useEffect(() => {
    if (changedIndex?.row > -1 && changedIndex?.col > -1) {
      const findLongestRowWord = (row, col) => {
        let rowStr = [];
        for (let i = 0; i < matrixSize; i++) {
          if (matrix[row][i]) {
            rowStr.push(matrix[row][i]);
          } else if (i > col) {
            return rowStr;
          } else if (i < col) {
            rowStr = [];
          }
        }
        return rowStr;
      };

      const findLongestColWord = (row, col) => {
        let colStr = [];
        for (let i = 0; i < matrixSize; i++) {
          if (matrix[i][col]) {
            colStr.push(matrix[i][col]);
          } else if (i > row) {
            return colStr;
          } else if (i < row) {
            colStr = [];
          }
        }
        return colStr;
      };

      const colResult = findLongestColWord(changedIndex.row, changedIndex.col);
      const rowResult = findLongestRowWord(changedIndex.row, changedIndex.col);
      setUserOutput({
        colResult: colResult?.join(""),
        rowResult: rowResult?.join("")
      });
    }
  }, [changedIndex, matrix, matrixSize]);

  const genrateRow = (item, rowIndex) => {
    return item?.map((subitem, colIndex) => {
      return (
        <input
          type="text"
          onChange={(e) => userInput(rowIndex, colIndex, e.target.value)}
          disabled={subitem}
          value={subitem}
          key={colIndex}
          style={{
            width: "50px"
          }}
        />
      );
    });
  };

  return (
    <div>
      {matrix?.map((item, rowIndex) => {
        return <div key={rowIndex}>{genrateRow(item, rowIndex)}</div>;
      })}
      <br />
      <hr />
      <h4>User output </h4>
      <p> User row output : {userOutput.rowResult} </p>
      <p> User col output : {userOutput.colResult} </p>
    </div>
  );
}

export default MatrixDispaly;
