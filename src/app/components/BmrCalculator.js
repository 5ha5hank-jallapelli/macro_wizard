'use client'

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useVitals } from '../context/VitalsContext';


export default function BmrCalculator() {
	const { vitals, setVitals } = useVitals();

	const calculateBmrBmi = () => {
		const heightInMtr = vitals.height/100;

		const bm = (vitals.weight/(heightInMtr*heightInMtr)).toFixed(2);
		setVitals(prevState => ({...prevState, bmi: bm}))

		if (vitals.gender === 'Male') {
			const br = (10*(vitals.weight)+6.25*(vitals.height)-5*(vitals.age) + 5).toFixed(2);
			setVitals(prevState => ({...prevState, bmr: br}))
		} else if (vitals.gender === 'Female') {
			const br = (10*(vitals.weight)+6.25*(vitals.height)-5*(vitals.age) - 161).toFixed(2);
			setVitals(prevState => ({...prevState, bmr: br}))
		}
	}

	return (
		<>
			<div style={{ marginBlock: '20px'}}>
				<FormControl>
				<FormLabel htmlFor='row-radio-buttons-group' style={{ color: 'black', marginBottom: '5px'}}>Gender</FormLabel>
					<RadioGroup
						row
						aria-labelledby="row-radio-buttons-group-label"
						value={vitals.gender}
						onChange={event => setVitals(prevState => ({...prevState, gender: event.target.value}))}
						name="row-radio-buttons-group">
						<FormControlLabel style={{ fontSize: '15px !important' }} value='Male' control={<Radio />} label="Male" />
						<FormControlLabel style={{ fontSize: '15px !important' }} value='Female' sx={{marginLeft: '10px'}} control={<Radio />} label="Female" />
					</RadioGroup>
				</FormControl>
				<hr style={{marginBlock: '10px', opacity: '0.2'}} />
				<div style={{ display: 'flex', gap: '10px', paddingTop: '5px' }}>
					<FormControl variant="outlined">
						<FormLabel htmlFor='outlined-adornment-age' style={{ color: 'black', marginBottom: '5px'}}>Age</FormLabel>
						<OutlinedInput
							id="outlined-adornment-age"
							value={vitals.age}
							onChange={(event) => setVitals(prevState => ({...prevState, age: event.target.value }))}
							endAdornment={<InputAdornment position="end">years</InputAdornment>}
							aria-describedby="outlined-age-helper-text"
							inputProps={{
								'aria-label': 'age',
							}}/>
					</FormControl>
					<FormControl variant="outlined">
						<FormLabel htmlFor='outlined-adornment-weight' style={{ color: 'black', marginBottom: '5px'}}>Weight</FormLabel>
						<OutlinedInput
							id="outlined-adornment-weight"
							value={vitals.weight}
							onChange={(event) => setVitals(prevState => ({...prevState, weight: event.target.value }))}
							endAdornment={<InputAdornment position="end">kgs</InputAdornment>}
							aria-describedby="outlined-weight-helper-text"
							inputProps={{
								'aria-label': 'weight',
							}}/>
					</FormControl>
					<FormControl variant="outlined" style={{margin: '0'}}>
						<FormLabel htmlFor='outlined-adornment-height' style={{ color: 'black', marginBottom: '5px'}}>Height</FormLabel>
						<OutlinedInput
							id="outlined-adornment-height"
							value={vitals.height}
							onChange={(event) => setVitals(prevState => ({...prevState, height: event.target.value }))}
							endAdornment={<InputAdornment position="end">cms</InputAdornment>}
							aria-describedby="outlined-height-helper-text"
							inputProps={{
								'aria-label': 'height',
							}}/>
					</FormControl>
				</div>
			</div>
			<div style={{marginTop: '20px', display: 'flex', gap: '20px', alignItems: 'center'}}>
				<button type='button' style={{color: '#ffffff', backgroundColor: '#1447E6', borderRadius: '6px', padding: '5px 10px', border: 'none'}} onClick={() => calculateBmrBmi()}>
					Calculate
				</button>
			</div>
			<div style={{backgroundColor: 'rgba(0,0,0,0.2)', height: '1px', marginBlock: '15px 10px'}}></div>
			<div style={{ display: 'flex', gap: '20px' }}>
				<div><h3 style={{ fontWeight: '450', fontSize: '16px' }}>BMI: <span style={{ fontWeight: '600' }}>{vitals.bmi || 0}</span> kg/m<sup>2</sup></h3></div>
				<div style={{display: 'flex', alignItems: 'flex-end'}}><h3 style={{fontWeight: '450', fontSize: '16px'}}>BMR: <span style={{fontWeight: '600'}}>{vitals.bmr || 0}</span> cals/day</h3></div>
			</div>
		</>
	)
}