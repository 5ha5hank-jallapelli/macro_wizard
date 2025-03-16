import { TextField } from "@mui/material"
import { useVitals } from "../context/VitalsContext"
import InputAdornment from '@mui/material/InputAdornment';

export default function VitalInfo() {
  const { vitals } = useVitals()

  return (
    <div style={{display: 'flex', gap: '10px', maxWidth: '860px'}}>
      <div style={{paddingTop: '5px', pointerEvents: 'none'}}>
        <TextField
          label="Age"
          id="outlined-size-small"
          defaultValue={vitals.age}
          size="small"
          slotProps={{
            input: {
              endAdornment: <InputAdornment>yrs</InputAdornment>,
            },
          }}
        />
      </div>
      <div style={{paddingTop: '5px', pointerEvents: 'none'}}>
        <TextField
          label="Weight"
          id="outlined-size-small"
          defaultValue={vitals.weight}
          size="small"
          slotProps={{
            input: {
              endAdornment: <InputAdornment>kgs</InputAdornment>,
            },
          }}
        />
      </div>
      <div style={{paddingTop: '5px', pointerEvents: 'none'}}>
        <TextField
          label="Height"
          id="outlined-size-small"
          defaultValue={vitals.height}
          size="small"
          slotProps={{
            input: {
              endAdornment: <InputAdornment>cms</InputAdornment>,
            },
          }}
        />
      </div>
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