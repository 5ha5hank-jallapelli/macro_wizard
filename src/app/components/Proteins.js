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
      return {...prevState, proteins: p.serving }
    })
  },[macro.proteins_percentage, macro.totalCalories])

  return (
    <>
      <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" style={{margin: '0'}}>
        <FormLabel htmlFor='outlined-adornment-proteins-percent' style={{ color: 'black', marginBottom: '5px'}}>Proteins in %</FormLabel>
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
      <div style={{ marginTop: '20px' }}>
        Protein Serving: { macro.proteins }
      </div>
    </>
  )
}