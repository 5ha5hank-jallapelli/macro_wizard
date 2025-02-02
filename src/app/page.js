'use client'

import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([])
  const [selectedRows, setSelectedRows] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/api/data')
    .then(response => {
      response.json().then(data => {
        setData(data.data)
      })
    })
  }, [])

  const columns = [
    { field: 'item', headerName: 'Food Item', width: 221 },
    { field: 'quantity', headerName: 'Amount', width: 139 },
    { field: 'carbohydrates', headerName: 'Carbohydrates', width: 203 },
    { field: 'proteins', headerName: 'Proteins', width: 141 },
    { field: 'fats', headerName: 'Fats', width: 122 },
    { field: 'energy', headerName: 'Energy', width: 157 }
  ]

  const handleRowSelection = (rowSelectionModel, details) => {
    const selectedRowItems = data.flatMap(table => table.items.filter(item => rowSelectionModel.includes(item.id)))

    setSelectedRows(prevState => (
      [...prevState, ...selectedRowItems]
    ))
  }

  return (
    <div className='' style={{height: '100vh', overflow: 'auto'}}>
      { console.log(selectedRows)}
      { data.map(table => (
        <div key={table.id}>
          <h2>{table.category}</h2>
          <Paper sx={{ height: '100%', width: 1050 }}>
            <DataGrid
              columns={columns}
              rows={table.items}
              checkboxSelection
              hideFooter={true}
              // onRowClick={handleRowClick}
              onRowSelectionModelChange={handleRowSelection}
              sx={{ border: 0 }}
            />
          </Paper>
        </div>
       )) }
    </div>
  );
}
