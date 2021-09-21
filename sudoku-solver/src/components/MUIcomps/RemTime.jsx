import { useContext } from "react";
import { SudokuSolverContext } from "../ContextProvider/SudokuContext";

const RemTime = ({ prop }) => {
  const { solved, interval_id, setErr, setRemTime, setReset, setErrBtn,setSteps } =
    useContext(SudokuSolverContext);
  if (prop === 0) {
    clearInterval(interval_id);
    setRemTime("");

    if (solved) {
      setErr("Sudoku solved! Please click Reset.");
      setReset(true);
      setSteps("Done!");
    } else {
      setErr("Sudoku cannot be solved! Please click Reset.");
      setReset(false);
      setErrBtn(true);
      setSteps("Failed!")
    }
  }

  return (
    <div><b>Time : </b>{Number(prop) > 0 ? <span> {prop}s</span> : "waiting to be initialized..."}</div>
  );
};

export default RemTime;
