import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";
import SpeedIcon from '@mui/icons-material/Speed';
import { SudokuSolverContext } from "../ContextProvider/SudokuContext";

const Input = styled(MuiInput)`
  width: 42px;
`;

export default function InputSlider() {
    const {speed,setSpeed} = React.useContext(SudokuSolverContext)
    

  const handleSliderChange = (event, newValue) => {
    setSpeed(newValue);
  };

  const handleInputChange = (event) => {
    setSpeed(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleBlur = () => {
    if (speed < 0) {
      setSpeed(0);
    } else if (speed > 100) {
      setSpeed(100);
    }
  };

  return (
    <Box sx={{ width: 250 }}>
      <Typography id="input-slider" gutterBottom>
        <h5>Too fast? Slow it down from here</h5>
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <SpeedIcon />
        </Grid>
        <Grid item xs>
          <Slider
            value={typeof speed === "number" ? speed : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <Input
            value={speed}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 10,
              min: 0,
              max: 100,
              type: "number",
              "aria-labelledby": "input-slider",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
