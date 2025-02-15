import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHeader from './TableHeader';
import RowItemWithCategory from './RowItemWithCategory';
import TotalMacros from './TotalMacros';
import EmptyTableState from './EmptyTableState';
import { useState, useEffect } from 'react';

function SelectedItemsTable({ selectedRows }) {
  const [cerealItems, setCerealItems] = useState([])
  const [pulsesItems, setPulsesItems] = useState([])
  const [nutsAndOilItems, setNutsAndOilItems] = useState([])
  const [meatPoultryItems, setMeatPoultryItems] = useState([])
  const [seaFoodItems, setSeaFoodItems] = useState([])
  const [vegetables, setVegetables] = useState([])
  const [mushroomItems, setMushroomItems] = useState([])
  const [fruitItems, setFruitItems] = useState([])
  const [dairyItems, setDairyItems] = useState([])

  const tableStyling = { minWidth: 816, width: 'fit-content', boxShadow: 'none', border: '1px solid rgba(0,0,0,0.1)' }

  useEffect(() => {
    setCerealItems(getCategoryItems('Cereals'));
    setPulsesItems(getCategoryItems('Pulses'))
    setNutsAndOilItems(getCategoryItems('Nuts and Oilseeds'))
    setMeatPoultryItems(getCategoryItems('Meat & Poultry'))
    setSeaFoodItems(getCategoryItems('Seafood'))
    setVegetables(getCategoryItems('Vegetables'))
    setMushroomItems(getCategoryItems('Mushrooms'))
    setFruitItems(getCategoryItems('Fruits'))
    setDairyItems(getCategoryItems('Milk and Milk Products'))
  }, [selectedRows])

  const getCategoryItems = category => selectedRows.filter(item => item.category === category)

  return (
    <div>
      <TableContainer component={Paper} sx={{width: 'fit-content', maxHeight: 'calc(100vh - 125px)', height: 'auto'}}>
        <Table stickyHeader sx={tableStyling} aria-label="selectedItemsTable">
          <TableHeader/>
          <TableBody sx={{ display: selectedRows.length ? 'table-row-group' : 'none', width: '100%' }}>
            <RowItemWithCategory label={'Cereals'} items={cerealItems} />
            <RowItemWithCategory label={'Pulses'} items={pulsesItems} />
            <RowItemWithCategory label={'Nuts and Oilseeds'} items={nutsAndOilItems} />
            <RowItemWithCategory label={'Meat & Poultry'} items={meatPoultryItems} />
            <RowItemWithCategory label={'Seafood'} items={seaFoodItems} />
            <RowItemWithCategory label={'Vegetables'} items={vegetables} />
            <RowItemWithCategory label={'Mushrooms'} items={mushroomItems} />
            <RowItemWithCategory label={'Fruits'} items={fruitItems} />
            <RowItemWithCategory label={'Milk & Milk Products'} items={dairyItems} />
          </TableBody>
        </Table>
      </TableContainer>
      <TotalMacros selectedItems={selectedRows} />
      <EmptyTableState selectedItems={selectedRows} />
    </div>
  )
}

export default SelectedItemsTable;