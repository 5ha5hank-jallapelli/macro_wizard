import { useState, useEffect } from "react";
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useMacro } from '../context/MacrosContext';
import { fats } from '@/utils/macros';

export default function Fats() {
  const { macro, setMacro } = useMacro()

  useEffect(() => {
    const f = fats(macro.totalCalories, macro.fats_percentage)
    setMacro(prevState => {
      return {...prevState, fats: f.serving }
    })
  }, [macro.fats_percentage, macro.totalCalories])

  return (
    <>
      <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" style={{margin: '0'}}>
        <FormLabel htmlFor='outlined-adornment-fats-percent' style={{ color: 'black', marginBottom: '5px'}}>Fats in %</FormLabel>
        <OutlinedInput
          id="outlined-adornment-fats-percent"
          value={macro.fats_percentage}
          onChange={e => setMacro(prevState => ({...prevState, fats_percentage: e.target.value}))}
          endAdornment={<InputAdornment position="end">%</InputAdornment>}
          aria-describedby="outlined-fats-percent-helper-text"
          inputProps={{
            'aria-label': 'fats percent',
          }}
        />
      </FormControl>
      <div style={{ marginTop: '20px' }}>
        Fats Serving: { macro.fats }
      </div>
    </>
  )
}