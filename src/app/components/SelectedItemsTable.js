import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TotalMacros from './TotalMacros';
import CopyAllOutlinedIcon from '@mui/icons-material/CopyAllOutlined';
import ChecklistIcon from '@mui/icons-material/Checklist';
import { Slide, toast } from 'react-toastify';

function SelectedItemsTable({ selectedRows }) {
  const columnsHeaders = [ 'Food Item', 'Amount', 'Carbohydrates', 'Proteins', 'Fats', 'Energy', 'Action']

  const tableStyling = { minWidth: 816, width: 'fit-content', boxShadow: 'none', border: '1px solid rgba(0,0,0,0.1)' }
  const tableCellStyling = { padding: '5px 10px', height: "36px" };
  const buttonStyling = { all: 'unset', cursor: 'pointer' }
  const emptyStateClasses = {
    display: selectedRows.length ? 'none' : 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '300px',
    backgroundColor: '#f4f4f4'
  }

  const ToastContent = ({ message }) => (
    <div dangerouslySetInnerHTML={{ __html: message }} />
  );

  const handleRowCopy = async row => {
    const { item, quantity, carbohydrates, proteins, fats, energy } = row;
    const copyString = `${item}\t${quantity}\t${carbohydrates}\t${proteins}\t${fats}\t${energy}`
    try {
      await navigator.clipboard.writeText(copyString)
      toast.success(<ToastContent message={`<b>Item: ${row.item}</b><br/> Copied successfully`} />, {
        position: 'top-center',
        autoClose: 1000,
        transition: Slide,
        theme: 'colored',
        hideProgressBar: true,
      })
    } catch(error) {
      console.error(error.message)
    }
  }

  return (
    <div>
      <TableContainer component={Paper} sx={{width: 'fit-content', maxHeight: 'calc(100vh - 125px)', height: 'auto'}}>
        <Table stickyHeader sx={tableStyling} aria-label="selectedItemsTable">
          <TableHead>
            <TableRow>
              {columnsHeaders.map((column, index) => {
                const width = index == 0 ? '253px' : 'auto';
                return <TableCell
                  key={index}
                  sx={{ padding: '5px 10px', width: width, height: "39px" }}
                  align={index == 0 ? 'left' : 'center'}>{column}</TableCell>
              })}
            </TableRow>
          </TableHead>
          <TableBody sx={{display: selectedRows.length ? 'table-row-group' : 'none', width: '100%'}}>
            {selectedRows.map((row) => (
              <TableRow key={row.id}>
                <TableCell sx={tableCellStyling} component="th" scope="row">{row.item}</TableCell>
                <TableCell sx={tableCellStyling} align="center">{row.quantity}</TableCell>
                <TableCell sx={tableCellStyling} align="center">{row.carbohydrates}</TableCell>
                <TableCell sx={tableCellStyling} align="center">{row.proteins}</TableCell>
                <TableCell sx={tableCellStyling} align="center">{row.fats}</TableCell>
                <TableCell sx={tableCellStyling} align="center">{row.energy}</TableCell>
                <TableCell className='btn-copy-cell' sx={tableCellStyling} align="center">
                  <button className='btn-copy' type='button' style={buttonStyling} onClick={() => handleRowCopy(row)}><CopyAllOutlinedIcon /></button>
                </TableCell>
              </TableRow>))
            }
          </TableBody>
        </Table>
      </TableContainer>
      <TotalMacros selectedItems={selectedRows} />
      <div style={emptyStateClasses}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center'}}>
          <ChecklistIcon></ChecklistIcon>
          <p>No food items selected</p>
        </div>
      </div>
    </div>
  )
}

export default SelectedItemsTable;