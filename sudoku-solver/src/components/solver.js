function checkMatrix(sudoku, r, c, num) {
    for (let i = r; i < r + 3; i++) {
      for (let j = c; j < c + 3; j++) {
        if (sudoku[i][j] === num) return false;
      }
    }
    return true;
  }



  function isValid(sudoku, r, c, k) {
    let i = 0;
    let j = c;
    while (i < 9) {
      if (sudoku[i][j] === k) return false;
      i++;
    }
    i = r;
    j = 0;
    while (j < 9) {
      if (sudoku[i][j] === k) return false;
      j++;
    }

    if (r < 3) {
      if (c < 3) {
        if (!checkMatrix(sudoku, 0, 0, k)) return false;
      } else if (c >= 3 && c < 6) {
        if (!checkMatrix(sudoku, 0, 3, k)) return false;
      } else {
        if (!checkMatrix(sudoku, 0, 6, k)) return false;
      }
    } else if (r >= 3 && r < 6) {
      if (c < 3) {
        if (!checkMatrix(sudoku, 3, 0, k)) return false;
      } else if (c >= 3 && c < 6) {
        if (!checkMatrix(sudoku, 3, 3, k)) return false;
      } else {
        if (!checkMatrix(sudoku, 3, 6, k)) return false;
      }
    } else {
      if (c < 3) {
        if (!checkMatrix(sudoku, 6, 0, k)) return false;
      } else if (c >= 3 && c < 6) {
        if (!checkMatrix(sudoku, 6, 3, k)) return false;
      } else {
        if (!checkMatrix(sudoku, 6, 6, k)) return false;
      }
    }

    return true;
  }

  function sud(sudoku, r, c) {
    if (r > 8) {
      return true;
    }

    //if blank
    // console.log("checking column", "at", r, c);
    if (sudoku[r][c] === 0) {
      // console.log("column is empty", "at", r, c);
      let flag = 0;
      //loop for k = 0 to 9
      for (let k = 1; k <= 9; k++) {
        flag = 0;
        // console.log("filling column with", k, "at", r, c);
        if (isValid(sudoku, r, c, k)) {
          // console.log("isValid", k, r, c);
          sudoku[r][c] = k;
          flag = 1;
          if (c == 8) {
            if (sud(sudoku, r + 1, 0)) return true;
          } else {
            if (sud(sudoku, r, c + 1)) return true;
          }

          sudoku[r][c] = 0;
          // console.log("column is not filled which is next to ", k, "at", r, c);
        } else {
          // console.log("not valid", k, "at", r, c);
        }
        // console.log("loop continue for", k, "at", r, c);
      } // loop for k = 0 to 9

      // console.log(
      //   "this column cannot be filled by any k ,returning to previous column"
      // );
      return false;
    } //if blank
    else {
      // console.log("column is filled as", sudoku[r][c], "at", r, c);
      if (c === 8) {
        if (!sud(sudoku, r + 1, 0)) return false;
      } else {
        if (!sud(sudoku, r, c + 1)) return false;
      }
      return true;
    }
  }



export default function Solver(sudoku){

    if (sud(sudoku, 0, 0)){
        return sudoku;
    }
  else console.log(-1);

} 