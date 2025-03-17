'use client'

import CalculateIcon from '@mui/icons-material/Calculate';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import BmrCalculator from './BmrCalculator';
import MacroCalculator from './MacroCalculator';
import { useState, useEffect } from "react";

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

export default function CalculatorPane() {
  const [showCalculatorPane, setShowCalculatorPanel] = useState(false)
  const [tabValue, setTabValue] = useState(0);

  const handleCalculatorPaneToggle = type => {
    type == 'show' ? setShowCalculatorPanel(true) : setShowCalculatorPanel(false)
  }

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
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
        <div style={{ padding: '10px 15px', backgroundColor: '#1447E6', color: 'white', borderBottom: '1px solid rgba(0,0,0,0.2)', display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center'}}>
            <h4 style={{ fontWeight: '600', margin: '0'}}>Vitals & Macro Calculator</h4>
          </div>
          <button type="button"
            style={{ border: 'none', backgroundColor: 'unset', display: 'flex', alignItems: 'center' }}
            onClick={() => handleCalculatorPaneToggle('close')}>
            <DisabledByDefaultIcon style={{ color: 'rgba(255,255,255,0.9)', strokeWidth: '1px', fontSize: '26px'}} />
          </button>
        </div>
        <div style={{ padding: '0px 15px 15px'}}>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Vitals" {...a11yProps(0)} sx={{flexGrow: 1, paddingBottom: '5px', textTransform: 'capitalize', fontSize: '16px', fontWeight: '550', color: 'black'}} />
              <Tab label="Macros" {...a11yProps(1)} sx={{flexGrow: 1, paddingBottom: '5px', textTransform: 'capitalize', fontSize: '16px', fontWeight: '550', color: 'black'}} />
            </Tabs>
          </Box>
          <CustomTabPanel value={tabValue} index={0}>
            <BmrCalculator />
          </CustomTabPanel>
          <CustomTabPanel value={tabValue} index={1}>
            <MacroCalculator />
          </CustomTabPanel>
        </Box>
        </div>
      </div>
    </>
  )
}