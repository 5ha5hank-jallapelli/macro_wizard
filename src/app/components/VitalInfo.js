import { TextField } from "@mui/material"
import { useVitals } from "../context/VitalsContext"
import InputAdornment from '@mui/material/InputAdornment';

export default function VitalInfo() {
  const { vitals } = useVitals()

  return (
    <div style={{display: 'flex', gap: '10px', maxWidth: '325px', marginLeft: 'auto'}}>
      <div style={{paddingTop: '5px', pointerEvents: 'none'}}>
        <TextField
          label="BMI"
          id="outlined-size-small"
          defaultValue={vitals.bmi}
          size="small"
          slotProps={{
            input: {
              endAdornment: <InputAdornment>kg/m<sup>2</sup></InputAdornment>,
            },
          }}
        />
      </div>
      <div style={{paddingTop: '5px', pointerEvents: 'none'}}>
        <TextField
          label="BMR"
          id="outlined-size-small"
          defaultValue={vitals.bmr}
          size="small"
          slotProps={{
            input: {
              endAdornment: <InputAdornment>cals/day</InputAdornment>,
            },
          }}
        />
      </div>
    </div>
  )
}