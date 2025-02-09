import CalculateIcon from '@mui/icons-material/Calculate';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useState, useEffect } from "react";

export default function MacroCalculator() {
  const [showCalculatorPane, setShowCalculatorPanel] = useState(false)
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

  const handleCalculatorPaneToggle = type => {
    type == 'show' ? setShowCalculatorPanel(true) : setShowCalculatorPanel(false)
  }

  const calculate = () => {
    const c = (defaultCalories / (100 / defaultMacroPercent)).toFixed(2)
    const s = (c/macroValue).toFixed(2)

    setCalories(c)
    setServing(s)
  }

  return (
    <>
      <div style={{ position: 'fixed', left: '15px', top: '12px', width: 35, height: 30, }}>
        <button type='button' title='Open macro calculator' onClick={() => handleCalculatorPaneToggle('show')}
          style={{ backgroundColor: '#1447E6', border: '0', padding: '3px 4px 0px', borderRadius: '6px' }}>
          <CalculateIcon style={{ color: 'white', fontSize: '26px' }} />
        </button>
      </div>
      <div className='calculator-pane' style={{ transform: showCalculatorPane ? 'translateX(0px)' : 'translateX(-100%)' }}>
        <div style={{ padding: '10px 15px', borderBottom: '1px solid rgba(0,0,0,0.2)', display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center'}}>
            <h4 style={{ fontWeight: '400', margin: '0'}}>Macro Calculator</h4>
          </div>
          <button type="button"
            style={{ border: 'none', backgroundColor: 'unset', display: 'flex', alignItems: 'center' }}
            onClick={() => handleCalculatorPaneToggle('close')}>
            <DisabledByDefaultIcon style={{ color: 'rgba(0,0,0,0.5)', strokeWidth: '1px', fontSize: '26px'}} />
          </button>
        </div>
        <div style={{ padding: '15px'}}>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label" style={{ color: 'black', marginBottom: '5px'}}>Select Macro</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              value={selectedMacro}
              onChange={event => setSelectedMacro(event.target.value)}
              name="row-radio-buttons-group">
              <FormControlLabel style={{ fontSize: '15px !important' }} value='carbohydrates' control={<Radio />} label="Carbohydrates" />
              <FormControlLabel style={{ fontSize: '15px !important' }} value='protein' control={<Radio />} label="Protein" />
              <FormControlLabel style={{ fontSize: '15px !important' }} value='fats' control={<Radio />} label="Fats" />
            </RadioGroup>
          </FormControl>
          <div style={{ marginBlock: '10px'}}>
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
          <div style={{ display: 'flex', alignItems: 'center', paddingTop: '15px' }}>
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
        </div>
      </div>
    </>
  )
}