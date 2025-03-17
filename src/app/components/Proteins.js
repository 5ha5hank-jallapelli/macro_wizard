import { useState, useEffect } from "react";
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useMacro } from '../context/MacrosContext';
import { proteins } from '@/utils/macros';

export default function Proteins() {
  const { macro, setMacro } = useMacro()

  useEffect(() => {
    const p = proteins(macro.totalCalories, macro.proteins_percentage)

    setMacro(prevState => {
      return {...prevState, proteins: p.serving, proteins_serving_calories: p.calories }
    })
  },[macro.proteins_percentage, macro.totalCalories])

  return (
    <>
      <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" style={{margin: '0', width: '100%'}}>
        <FormLabel htmlFor='outlined-adornment-proteins-percent' style={{ color: 'black', marginBottom: '5px'}}>Protein in %</FormLabel>
        <OutlinedInput
          id="outlined-adornment-proteins-percent"
          value={macro.proteins_percentage}
          onChange={e => setMacro(prevState => ({...prevState, proteins_percentage: e.target.value}))}
          endAdornment={<InputAdornment position="end">%</InputAdornment>}
          aria-describedby="outlined-proteins-percent-helper-text"
          inputProps={{
            'aria-label': 'proteins percent',
          }}
        />
      </FormControl>
    </>
  )
}