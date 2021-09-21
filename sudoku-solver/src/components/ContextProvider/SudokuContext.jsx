import React, { createContext, useRef, useState } from "react";

export const SudokuSolverContext = createContext();

let interval = 0;

const SudokuContext = ({ children }) => {
  const value = useRef();
  const [err, setErr] = useState("Provide problem sudoku below");
  const [pointer, setPointer] = useState({ r: 0, c: 0 });
  const [sudo, setSudo] = useState(new Array(9).fill(new Array(9).fill(-1)));
  const [steps, setSteps] = useState("");
  const [color, setColor] = useState(new Array(9).fill(new Array(9).fill(0)));
  const [currPos, setCurrPos] = useState({ r: -1, c: -1 });
  const [speed, setSpeed] = useState(10);
  const [remTime, setRemTime] = useState('');
  const [interval_id,set_id] = useState(false);
  const [noErr,setNoErr] = useState(false);
  const [solved,setSolved] = useState(false);
  const [reset,setReset] = useState(false);
  const [errBtn,setErrBtn] = useState(false);
  const [copied, setCopied] = useState(false);

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
      //loop for k = 0 to 9
      for (let k = 1; k <= 9; k++) {
        if (isValid(sudoku, r, c, k)) {
          // console.log("isValid", k, r, c);
          sudoku[r][c] = k;
          interval += speed * 2;
          //   const newArr = sudoku.map((row, i) => (i === r ? row.map((el, j) => (j === c ? Number(k) : el)) : row))
          if (speed)
            timeOut(
              sudoku.map((row, i) => row.map((el, j) => el)),
              interval,
              `Trying ${k} at ${r+1}${r+1===1?"st":r+1===2?"nd":r+1===3?"rd":"th"} row & ${c+1}${c+1===1?"st":c+1===2?"nd":c+1===3?"rd":"th"} column`,
              r,
              c
            );
          else
            noTimeOut(
              sudoku.map((row, i) => row.map((el, j) => el)),
              `Trying ${k} at ${r+1}${r+1===1?"st":r+1===2?"nd":r+1===3?"rd":"th"} row & ${c+1}${c+1===1?"st":c+1===2?"nd":c+1===3?"rd":"th"} column`,
              r,
              c
            );

          if (c === 8) {
            if (sud(sudoku, r + 1, 0)) return true;
          } else {
            if (sud(sudoku, r, c + 1)) return true;
          }

          sudoku[r][c] = 0;
          interval += speed * 2;
          // const Arr = sudoku.map((row, i) => (i === r ? row.map((el, j) => (j === c ? 0 : el)) : row));
          if (speed)
            timeOut(
              sudoku.map((row, i) => row.map((el, j) => el)),
              interval,
              `Failed ${k} at ${r+1}${r+1===1?"st":r+1===2?"nd":r+1===3?"rd":"th"} row & ${c+1}${c+1===1?"st":c+1===2?"nd":c+1===3?"rd":"th"} column`,
              r,
              c
            );
          else
            noTimeOut(
              sudoku.map((row, i) => row.map((el, j) => el)),
              `Failed ${k} at ${r+1}${r+1===1?"st":r+1===2?"nd":r+1===3?"rd":"th"} row & ${c+1}${c+1===1?"st":c+1===2?"nd":c+1===3?"rd":"th"} column`,
              r,
              c
            );
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

  function timeOut(arr, interval, msg, r, c) {
    setTimeout(() => {
      setSteps(msg);
      setCurrPos({ r, c });
      setSudo(arr);
    }, interval);
  }

  function noTimeOut(arr, msg, r, c) {
    setSteps(msg);
    setCurrPos({ r, c });
    setSudo(arr);
  }

  function Solver(sudoku) {
    if(!noErr)
    return

    setReset('solving');
    
    setErr("Solving Sudoku...")
    let res = sud(sudoku, 0, 0)
      handleRemTime(interval,res);
      interval = 0;
    
      return sudoku;
    
  }

  const handleRemTime = (interval,res) => {
    setSolved(res)
    setRemTime(parseInt(interval / 1000));
    let x = setInterval(() => {
      setRemTime((prev) => {
        
        return prev - 1;
        
      });
    }, 1000);
    set_id(x);
  };

  const handleReset = () => {
    value.current.value = "";
    setSudo(new Array(9).fill(new Array(9).fill(-1)));
    setColor(new Array(9).fill(new Array(9).fill(0)));
    setSteps('');
    setSolved(false);
    setNoErr(false);
    setCurrPos({r:-1,c:-1})
    setErrBtn(false)
    setCopied(false)
    setErr("Reset Success! \n Provide new problem sudoku below.")
    setReset(false);
  }

  const handleInput = (event) => {
    if (!(event.target.value >= 0 && event.target.value <= 9)) {
      value.current.value = "";
      setErr("please enter a number from 0-9");
      return;
    }
    
    setErr(false);
    let e = event.target.value;
    const { r, c } = pointer;
    const newArr = sudo.map((row, i) =>
      i === r ? row.map((el, j) => (j === c ? Number(e) : el)) : row
    );
    setTimeout(() => {
      setSudo(newArr);
      setColor(newArr);
      if (c === 8) setPointer({ r: r + 1, c: 0 });
      else setPointer({ r, c: c + 1 });
      value.current.value = "";
    }, 100);
  };

  const handleInput2 = (e) => {
    let input = e.target.value;
    let temp = input.split(/[\r\n]+/);
    let sudoku = temp.map((row) => {
      return row.trim().split(" ").map(Number);
    });
    console.log(sudoku)
    let flag = 1;
    let err1 = 0;
    let err2 = 0;
    
    for(let k=0; k<9; k++){
      if(sudoku[k].length!==9){
        flag = 0;
        err1 = 1;
        break;
      }
      
      for(let m=0; m<9; m++){
        if(!(sudoku[k][m]>=0 && sudoku[k][m]<=9)){
          flag = 0;
          err2 = 1;
          break;
        }

      }
    }

    if (sudoku.length === 9 && flag) {
      setSudo(sudoku);
      setColor(sudoku);
      setErr("Sudoku problem accepted, ready to solve!")
      setNoErr(true)
    }
    else{
      if(err1)
    setErr("Please provide a 9x9 problem");
    if(err2)
    setErr("Please enter numeric value only");
    setNoErr(false)

    }
  };
  const handleSolveSudoku = () => {
    Solver(sudo.map((row, i) => row.map((el, j) => el)));
  };

  return (
    <SudokuSolverContext.Provider
      value={{
        copied,
        setCopied,
        errBtn,
        setErrBtn,
        reset,
        handleReset,
        setReset,
        solved,
        interval_id,
        remTime,
        setRemTime,
        speed,
        setSpeed,
        color,
        currPos,
        sudo,
        steps,
        value,
        err,
        setErr,
        setSteps,
        handleInput,
        handleInput2,
        handleSolveSudoku,
      }}
    >
      {children}
    </SudokuSolverContext.Provider>
  );
};

export default SudokuContext;
