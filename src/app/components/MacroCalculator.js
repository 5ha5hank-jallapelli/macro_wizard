'use client'

import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useState, useEffect } from "react";
import { carbohydrates, proteins, fats } from '@/utils/macros';
import { useMacro } from '../context/MacrosContext';

import Carbohydrates from './Carbohydrates';
import Proteins from './Proteins';
import Fats from './Fats';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function MacroCalculator() {
  const [tabIndex, setTabIndex] = useState(0)
  const { macro, setMacro } = useMacro()

  useEffect(() => {
    const c = carbohydrates(macro.totalCalories, macro.carbohydrates_percentage)
    const p = proteins(macro.totalCalories, macro.proteins_percentage)
    const f = fats(macro.totalCalories, macro.fats_percentage)

    setMacro(prevState => ({
      ...prevState,
      carbohydrates: c.serving,
      proteins: p.serving,
      fats: f.serving,
      totalCalories: macro.totalCalories
    }))
  }, [macro.totalCalories])

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  }

  return (
    <>
      <Box sx={{ width: '100%', marginTop: '10px' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabIndex} onChange={handleTabChange} aria-label="Macro">
            <Tab label="Carbohydrates" {...a11yProps(0)} sx={{flexGrow: 1, fontWeight: '600', fontSize: '14px', padding: '15px 5px 5px', textTransform: 'capitalize', color: 'black'}} />
            <Tab label="Protein" {...a11yProps(1)} sx={{ flexGrow: 1, fontWeight: '600', fontSize: '14px', padding: '15px 5px 5px', textTransform: 'capitalize', color: 'black' }} />
            <Tab label="Fats" {...a11yProps(2)} sx={{flexGrow: 1, fontWeight: '600', fontSize: '14px', padding: '15px 5px 5px', textTransform: 'capitalize', color: 'black'}} />
          </Tabs>
        </Box>
        <div style={{display: 'flex', gap: '10px', marginBlock: '20px'}}>
          <FormControl variant="outlined" style={{margin: '0', flex: '0 0 48%'}}>
            <FormLabel htmlFor='outlined-adornment-carbs-percent' style={{ color: 'black', marginBottom: '5px'}}>Calories</FormLabel>
            <OutlinedInput
              id="outlined-adornment-calories"
              value={macro.totalCalories}
              onChange={(e) => setMacro(prevState => ({...prevState, totalCalories: e.target.value}))}
              endAdornment={<InputAdornment position="end">cals</InputAdornment>}
              aria-describedby="outlined-calories-helper-text"
              inputProps={{
                'aria-label': 'calories percent',
              }}
            />
          </FormControl>
          <div style={{ flex: '0 0 48%' }}>
            <CustomTabPanel value={tabIndex} index={0}>
              <Carbohydrates />
            </CustomTabPanel>
            <CustomTabPanel value={tabIndex} index={1}>
              <Proteins />
            </CustomTabPanel>
            <CustomTabPanel value={tabIndex} index={2}>
              <Fats />
            </CustomTabPanel>
          </div>
        </div>
        <div style={{backgroundColor: 'rgba(0,0,0,0.2)', height: '1px', marginBlock: '15px 10px'}}></div>
        <div style={{ display: tabIndex == 0 ? 'flex' : 'none', gap: '20px' }}>
          <div><h3 style={{ fontWeight: '450', fontSize: '15px' }}>Calories: <span style={{ fontWeight: '600' }}>{macro.carbohydrates_serving_calories}</span> cals</h3></div>
          <div style={{display: 'flex', alignItems: 'flex-end'}}><h3 style={{fontWeight: '450', fontSize: '15px'}}>Serving: <span style={{fontWeight: '600'}}>{macro.carbohydrates}</span> gms</h3></div>
        </div>
        <div style={{ display: tabIndex == 1 ? 'flex' : 'none', gap: '20px' }}>
          <div><h3 style={{ fontWeight: '450', fontSize: '15px' }}>Calories: <span style={{ fontWeight: '600' }}>{macro.proteins_serving_calories}</span> cals</h3></div>
          <div style={{display: 'flex', alignItems: 'flex-end'}}><h3 style={{fontWeight: '450', fontSize: '15px'}}>Serving: <span style={{fontWeight: '600'}}>{macro.proteins}</span> gms</h3></div>
        </div>
        <div style={{ display: tabIndex == 2 ? 'flex' : 'none', gap: '20px' }}>
          <div><h3 style={{ fontWeight: '450', fontSize: '15px' }}>Calories: <span style={{ fontWeight: '600' }}>{macro.fats_serving_calories}</span> cals</h3></div>
          <div style={{display: 'flex', alignItems: 'flex-end'}}><h3 style={{fontWeight: '450', fontSize: '15px'}}>Serving: <span style={{fontWeight: '600'}}>{macro.fats}</span> gms</h3></div>
        </div>
      </Box>
    </>
  )
}