import React, { useContext, useRef, useState } from "react";
import styles from "./css/sudoku.module.css";
import { SudokuSolverContext } from "./ContextProvider/SudokuContext";
import InputSlider from "./MUIcomps/slider";
import RemTime from "./MUIcomps/RemTime";
import { Button } from "@mui/material";
import TextareaAutosize from "@mui/material/TextareaAutosize";

const example = `  
0 4 0 0 0 0 1 7 9 
0 0 2 0 0 8 0 5 4 
0 0 6 0 0 5 0 0 8 
0 8 0 0 7 0 9 1 0 
0 5 0 0 9 0 0 3 0 
0 1 9 0 6 0 0 4 0 
3 0 0 4 0 0 7 0 0 
5 7 0 1 0 0 2 0 0 
9 2 8 0 0 0 0 6 0`;

const Sudoku = () => {
  const {
    copied,
    setCopied,
    errBtn,
    remTime,
    color,
    currPos,
    sudo,
    steps,
    value,
    err,
    reset,
    handleReset,
    handleInput,
    handleInput2,
    handleSolveSudoku,
  } = useContext(SudokuSolverContext);

  let textArea = useRef();
  const copyToClipboard = (e) => {
    textArea.current.select();
    document.execCommand("copy");
    e.target.focus();
    setCopied(true);
  };

  return (
    <div className={styles.sudoku_container}>
      <div className={styles.sudoku_box}>
        <section className={styles.sudoku}>
          {/* <Grid container spacing={1} style={{width: "70%" }} alignItems="center">
                        {
                            sudo.map(row => (
                                <Grid container item xs={12} spacing={3} alignItems="center">
                                    {
                                        row.map(el => (
                                            <Grid item  style={{width:"7%",height:"55px"}} alignItems="center">
                                                <div><b>{el}</b></div>
                                            </Grid>
                                        ))
                                    }
                                </Grid>
                            ))
                        }
                    </Grid> */}

          <table className={styles.sudoku_table}>
            <thead>
              <tr>
                <th colSpan="9">
                  <h1>SUDOKU</h1>
                </th>
              </tr>
            </thead>
            {sudo.map((row, i) => (
              <tr key={i}>
                {row.map((el, j) => (
                  <td
                    key={j}
                    className={styles.sudoku_unit}
                    style={{
                      backgroundColor: `${
                        currPos.r === i && currPos.c === j
                          ? "rgba(164, 255, 172, 0.89)"
                          : color[i][j]
                          ? "white"
                          : "rgba(255, 255, 164, 0.678)"
                      }`,
                    }}
                  >
                    {el}
                  </td>
                ))}
              </tr>
            ))}
            <thead>
              <tr>
                <th colSpan="9">
                  <h1>SUDOKU</h1>
                </th>
              </tr>
            </thead>
          </table>
        </section>
        <section className={styles.sudokuUI}>
          {/* <input type="text" maxLength={1} ref={e => value.current = e}  onInput={(event) => handleInput(event)} style={{ width: "10px" }} />
                    <br /> */}
          <div className={styles.messageBox}>
            {err && <span style={{ color: "red" }}>{err}</span>}
          </div>
          <div className={styles.steps}>
            <b>Steps :</b>{" "}
            {steps ? (
              <span style={{ color: "green" }}>{steps}</span>
            ) : (
              "waiting to be initialized..."
            )}
          </div>

          <div className={styles.steps}>
            {remTime > -1 ? <RemTime prop={remTime} /> : ""}
          </div>

          <InputSlider />
          <br />
          <div className={styles.sudoku_input}>
            <div>
              <TextareaAutosize
                aria-label="minimum height"
                minRows={9}
                maxRows={9}
                minLength={17 * 9}
                placeholder="Provide the Sudoku problem matrix here..."
                name=""
                ref={(e) => (value.current = e)}
                onInputCapture={(e) => handleInput2(e)}
                style={{ width: "125px" }}
              />
              {/* <textarea
                placeholder="Provide the Sudoku problem matrix here..."
                name=""
                ref={(e) => (value.current = e)}
                onInputCapture={(e) => handleInput2(e)}
                id=""
                cols="15"
                rows="9"
              ></textarea> */}
            </div>
            <br />
            <div className={styles.sudoku_btn}>
              {reset === "solving" ? (
                <Button variant="contained" color="warning">
                  Solving...
                </Button>
              ) : errBtn ? (
                <Button variant="contained" color="error">
                  Error
                </Button>
              ) : reset ? (
                <Button variant="contained" color="success">
                  Solved!
                </Button>
              ) : (
                <Button variant="contained" onClick={handleSolveSudoku}>
                  Solve
                </Button>
              )}
              {reset === "solving" ? (
                ""
              ) : (
                <Button variant="contained" onClick={handleReset} color="error">
                  Reset
                </Button>
              )}
            </div>
          </div>
          <h6>Example Problem</h6>
          <div className={styles.exampleSudoku}>
            <TextareaAutosize
              aria-label="minimum height"
              minRows={9}
              maxRows={9}
              minLength={17 * 9}
              ref={(textarea) => (textArea.current = textarea)}
              value="0 4 0 0 0 0 1 7 9 
0 0 2 0 0 8 0 5 4 
0 0 6 0 0 5 0 0 8 
0 8 0 0 7 0 9 1 0 
0 5 0 0 9 0 0 3 0 
0 1 9 0 6 0 0 4 0 
3 0 0 4 0 0 7 0 0 
5 7 0 1 0 0 2 0 0 
9 2 8 0 0 0 0 6 0"
              style={{ width: "125px", overflow: "hidden" }}
            />
            {/* <textarea
              cols="15"
              rows="9"
              ref={(textarea) => (textArea.current = textarea)}
              value="0 4 0 0 0 0 1 7 9 
0 0 2 0 0 8 0 5 4 
0 0 6 0 0 5 0 0 8 
0 8 0 0 7 0 9 1 0 
0 5 0 0 9 0 0 3 0 
0 1 9 0 6 0 0 4 0 
3 0 0 4 0 0 7 0 0 
5 7 0 1 0 0 2 0 0 
9 2 8 0 0 0 0 6 0"
            /> */}
            <div className={styles.cpybtn}>
              {copied ? (
                <Button variant="contained" color="success">
                  Copied!
                </Button>
              ) : (
                <Button variant="contained" onClick={copyToClipboard}>
                  Copy
                </Button>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Sudoku;
