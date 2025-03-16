'use client'

import Paper from '@mui/material/Paper';
import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid';
import SelectedItemsTable from './components/SelectedItemsTable';
import CalculatorPane from './components/CalculatorPane';
import ExportTableButton from './components/ExportTableButton';
import { useEffect, useState, useContext } from "react";
import VitalInfo from './components/VitalInfo';
import { useCalculator } from './context/MacrosContext';


export default function Home() {
  const [data, setData] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/data`)
      .then(response => {
        response.json().then(data => {
          const items = data.data.flatMap(table => {
            return table.items
          })
          setData(items)
          setIsLoading(false)
        })
      })
    }, []
  )

  const columns = [
    { field: 'item', headerName: 'Food Item', width: 253 },
    { field: 'quantity', headerName: 'Amount', width: 125, editable: true },
    { field: 'carbohydrates', headerName: 'Carbohydrates', width: 185 },
    { field: 'proteins', headerName: 'Proteins', width: 142 },
    { field: 'fats', headerName: 'Fats', width: 108 },
    { field: 'energy', headerName: 'Energy', width: 125 }
  ]

  const handleRowUpdate = (updatedRow, originalRow) => {
    setData((prevState) => {
      const item = prevState.find(item => item.id === updatedRow.id)
        const standardValue = updatedRow.quantity / updatedRow.default.quantity
        item.quantity = Number(updatedRow.quantity)
        item.carbohydrates = item.carbohydrates ? Number((updatedRow.default.carbohydrates * standardValue).toFixed(2)) : 0
        item.proteins = Number((updatedRow.default.proteins * standardValue).toFixed(2))
        item.fats = Number((updatedRow.default.fats * standardValue).toFixed(2))
        item.energy = Number((updatedRow.default.energy * standardValue).toFixed(2))

        return [...new Set(prevState)]
    })
  }

  const handleRowSelection = (rowSelectionModel) => {
    const selectedRowItems = data.filter(item => rowSelectionModel.includes(item.id))
    const filteredRows = [...new Set(selectedRowItems)]
    setSelectedRows(filteredRows)
  }

  return (
    <>
      <CalculatorPane />
      <div style={{ width: '1862px', overflow: 'auto', marginInline: 'auto'}}>
        <div style={{ height: '38px', marginBottom: '10px', display: 'flex', gap: '30px', paddingRight: '18px', justifyContent: 'space-between' }}>
          <VitalInfo />
          <ExportTableButton selectedItems={selectedRows} />
        </div>
        <div style={{ height: 'calc(100vh - 75px)', overflow: 'auto', display: 'flex', gap: '20px' }}>
          <Paper sx={{ width: 1008, height: '99%' }}>
            <DataGrid
              editMode='row'
              rows={data}
              columns={columns}

              disableColumnMenu
              disableRowSelectionOnClick
              disableColumnSelector

              density='compact'

              keepNonExistentRowsSelected
              checkboxSelection

              processRowUpdate={handleRowUpdate}
              onProcessRowUpdateError={(error) => console.log(error)}

              onRowSelectionModelChange={handleRowSelection}
              loading={ isLoading }
              slots={{
                toolbar: GridToolbarQuickFilter,
              }}
              sx={{ boxShadow: 'none', border: '1px solid rgba(0,0,0,0.1)' }}
            />
          </Paper>
          < SelectedItemsTable selectedRows={selectedRows} />
        </div>
      </div>
    </>
  )
}
