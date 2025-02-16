'use client'

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useState, useEffect } from "react";


export default function BmrCalculator() {
	const [gender, setGender] = useState('male')
  const [age, setAge] = useState(0)
  const [weight, setWeight] = useState(0)
  const [height, setHeight] = useState(0)
  const [bmi, setBmi] = useState(0)
  const [bmr, setBmr] = useState(0)

	const calculateBmrBmi = () => {
    const heightInMtr = height/100;
    
    const bm = weight/(heightInMtr*heightInMtr);
    setBmi(bm)

    if (gender === 'male') {
      const br = 10*(weight)+6.25*(height)-5*(age) + 5;
      setBmr(br)
    } else if (gender === 'female') {
      const br = 10*(weight)+6.25*(height)-5*(age) - 161;
      setBmr(br)
    }
  }

	const handleReset = () => {
		setGender('male')
		setWeight(0)
		setHeight(0)
		setAge(0)
		setBmr(0)
		setBmi(0)
	}

	return (
		<>
			<div style={{ marginBlock: '20px'}}>
				<FormControl sx={{marginBottom: '15px'}}>
				<FormLabel htmlFor='row-radio-buttons-group' style={{ color: 'black', marginBottom: '5px'}}>Gender</FormLabel>
					<RadioGroup
						row
						aria-labelledby="row-radio-buttons-group-label"
						value={gender}
						onChange={event => setGender(event.target.value)}
						name="row-radio-buttons-group">
						<FormControlLabel style={{ fontSize: '15px !important' }} value='male' control={<Radio />} label="Male" />
						<FormControlLabel style={{ fontSize: '15px !important' }} value='female' sx={{marginLeft: '10px'}} control={<Radio />} label="Female" />
					</RadioGroup>
				</FormControl>
				<FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" style={{margin: '0'}}>
					<FormLabel htmlFor='outlined-adornment-age' style={{ color: 'black', marginBottom: '5px'}}>Age</FormLabel>
					<OutlinedInput
						id="outlined-adornment-age"
						value={age}
						onChange={(event) => {setAge(event.target.value)}}
						endAdornment={<InputAdornment position="end">years</InputAdornment>}
						aria-describedby="outlined-age-helper-text"
						inputProps={{
							'aria-label': 'age',
						}}/>
        </FormControl>
				<FormControl sx={{ width: '25ch', marginBlock: '10px' }} variant="outlined">
					<FormLabel htmlFor='outlined-adornment-weight' style={{ color: 'black', marginBottom: '5px'}}>Weight</FormLabel>
					<OutlinedInput
						id="outlined-adornment-weight"
						value={weight}
						onChange={(event) => {setWeight(event.target.value)}}
						endAdornment={<InputAdornment position="end">kgs</InputAdornment>}
						aria-describedby="outlined-weight-helper-text"
						inputProps={{
							'aria-label': 'weight',
						}}/>
				</FormControl>
				<FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" style={{margin: '0'}}>
					<FormLabel htmlFor='outlined-adornment-height' style={{ color: 'black', marginBottom: '5px'}}>Height</FormLabel>
					<OutlinedInput
						id="outlined-adornment-height"
						value={height}
						onChange={(event) => {setHeight(event.target.value)}}
						endAdornment={<InputAdornment position="end">cms</InputAdornment>}
						aria-describedby="outlined-height-helper-text"
						inputProps={{
							'aria-label': 'height',
						}}/>
				</FormControl>
			</div>
			<div style={{marginTop: '20px', display: 'flex', gap: '20px', alignItems: 'center'}}>
				<button type='button' style={{color: '#ffffff', backgroundColor: '#1447E6', borderRadius: '6px', padding: '5px 10px', border: 'none'}} onClick={() => calculateBmrBmi()}>Calculate</button>
				<button type='button' onClick={() => handleReset()}
          style={{
            all: 'unset',
            color: '#1447E6',
            textDecoration: 'underline',
            textUnderlineOffset: '4px',
            cursor: 'pointer'
          }}>Reset</button>
			</div>
			<div style={{backgroundColor: 'rgba(0,0,0,0.2)', height: '1px', marginBlock: '25px 20px'}}></div>
			<div>
				<div style={{marginBottom: '5px'}}><h3 style={{fontWeight: '450', fontSize: '17px'}}>BMI: <span style={{fontWeight: '600'}}>{bmi.toFixed(2) || 0}</span> kg/m<sup>2</sup></h3></div>
				<div><h3 style={{fontWeight: '450', fontSize: '17px'}}>BMR: <span style={{fontWeight: '600'}}>{bmr.toFixed(2) || 0}</span> cals/day</h3></div>
			</div>
		</>
	)
}