'use client'

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useState, useEffect } from "react";

export default function MacroCalculator() {
  const [selectedMacro, setSelectedMacro] = useState('carbohydrates')
  const [defaultCalories, setDefaultCalories] = useState(0)
  const [defaultMacroPercent, setDefaultMacroPercent] = useState(0)
  const [macroValue, setMacroValue] = useState(0)
  const [calories, setCalories] = useState(0)
  const [serving, setServing] = useState(0)

  const macros = [{'carbohydrates': 4}, {'protein': 4}, {'fats': 9}]

  useEffect(() => {
    calculate();
    const selectedMacroValue = macros.find(m => m[selectedMacro])[selectedMacro]
    setMacroValue(selectedMacroValue)

  }, [defaultCalories, defaultMacroPercent, selectedMacro, macroValue])

  const calculate = () => {
    const c = (defaultCalories / (100 / defaultMacroPercent)).toFixed(2)
    const s = (c/macroValue).toFixed(2)

    setCalories(c)
    setServing(s)
  }

  return (
    <>
      <div style={{ marginBlock: '20px'}}>
        <FormControl sx={{marginBottom: '15px'}}>
        <FormLabel htmlFor='row-radio-buttons-group' style={{ color: 'black', marginBottom: '5px'}}>Select Macro</FormLabel>
          <RadioGroup
            row
            aria-labelledby="row-radio-buttons-group-label"
            value={selectedMacro}
            onChange={event => setSelectedMacro(event.target.value)}
            name="row-radio-buttons-group">
            <FormControlLabel style={{ fontSize: '15px !important' }} value='carbohydrates' control={<Radio />} label="Carbohydrates" />
            <FormControlLabel style={{ fontSize: '15px !important' }} value='protein' control={<Radio />} label="Protein" />
            <FormControlLabel style={{ fontSize: '15px !important' }} value='fats' control={<Radio />} label="Fats" />
          </RadioGroup>
        </FormControl>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" style={{margin: '0'}}>
          <FormLabel htmlFor='outlined-adornment-calories' style={{ color: 'black', marginBottom: '5px'}}>Enter Calories</FormLabel>
          <OutlinedInput
            id="outlined-adornment-calories"
            value={defaultCalories}
            onChange={(event) => {setDefaultCalories(event.target.value)}}
            endAdornment={<InputAdornment position="end">cal</InputAdornment>}
            aria-describedby="outlined-calories-helper-text"
            inputProps={{
              'aria-label': 'calories',
            }}
          />
        </FormControl>
      </div>
      <div style={{ marginBlock: '20px'}}>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" style={{margin: '0'}}>
          <FormLabel htmlFor='outlined-adornment-macro-percent' style={{ color: 'black', marginBottom: '5px'}}>Enter Macro Percent</FormLabel>
          <OutlinedInput
            id="outlined-adornment-macro-percent"
            value={defaultMacroPercent}
            onChange={(event) => {setDefaultMacroPercent(event.target.value)}}
            endAdornment={<InputAdornment position="end">%</InputAdornment>}
            aria-describedby="outlined-macro-percent-helper-text"
            inputProps={{
              'aria-label': 'macro percent',
            }}
          />
        </FormControl>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', paddingTop: '15px', borderTop: '1px solid rgba(0,0,0,0.2)' }}>
        <h3 style={{fontWeight: 500, paddingRight: '15px'}}>{calories}<small>&nbsp;cals</small></h3>|
        <h3 style={{fontWeight: 500, paddingInline: '15px'}}>{serving}<small>&nbsp;gms</small></h3>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', paddingTop: '20px' }}>
        <button
          type='button'
          onClick={() => {
            setDefaultCalories(0);
            setDefaultMacroPercent(0);
            setSelectedMacro('carbohydrates')
          }}
          style={{
            all: 'unset',
            color: '#1447E6',
            textDecoration: 'underline',
            textUnderlineOffset: '4px',
            cursor: 'pointer'
          }}>Reset</button>
      </div>
    </>
  )
}