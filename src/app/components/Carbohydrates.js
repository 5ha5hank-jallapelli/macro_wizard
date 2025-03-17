import { useState, useEffect } from "react";
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { carbohydrates } from "@/utils/macros";
import { useMacro } from '../context/MacrosContext';

export default function Carbohydrates() {
  const { macro, setMacro } = useMacro()

  useEffect(() => {
    const c = carbohydrates(macro.totalCalories, macro.carbohydrates_percentage)

    setMacro(prevState => {
      return {...prevState, carbohydrates: c.serving, carbohydrates_serving_calories: c.calories }
    })
  },[macro.carbohydrates_percentage, macro.totalCalories])

  return (
    <>
      <FormControl sx={{ m: 1 }} variant="outlined" style={{margin: '0', width: '100%'}}>
        <FormLabel htmlFor='outlined-adornment-carbs-percent' style={{ color: 'black', marginBottom: '5px' }}>
          Carbohydrates in %
        </FormLabel>
        <OutlinedInput
          id="outlined-adornment-carbs-percent"
          sx={{width: '100%'}}
          value={macro.carbohydrates_percentage}
          onChange={e => setMacro(prevState => ({...prevState, carbohydrates_percentage: e.target.value}))}
          endAdornment={<InputAdornment position="end">%</InputAdornment>}
          aria-describedby="outlined-carbs-percent-helper-text"
          inputProps={{
            'aria-label': 'carbs percent',
          }}
        />
      </FormControl>
    </>
  )
}