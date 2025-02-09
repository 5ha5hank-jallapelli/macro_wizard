import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import CopyAllOutlinedIcon from '@mui/icons-material/CopyAllOutlined';
import { Slide, toast } from 'react-toastify';

export default function TotalMacros({ selectedItems }) {

  const tableCellStyling = { padding: '5px 10px', height: "36px", fontWeight: '600' };
  const buttonStyling = { all: 'unset', cursor: 'pointer' }

  const getTotalMacroQuantity = item => {
    return selectedItems.reduce((acc, macro) => acc + macro[item], 0).toFixed(2)
  }

  const handleCopyTotal = async () => {
    const copyString = `Total\t \
    ${getTotalMacroQuantity('quantity')}\t \
    ${getTotalMacroQuantity('carbohydrates')}\t \
    ${getTotalMacroQuantity('proteins')}\t \
    ${getTotalMacroQuantity('fats')}\t \
    ${getTotalMacroQuantity('energy')}\
    `

    try {
      await navigator.clipboard.writeText(copyString)
      toast.success('Total Copied Successfully', {
        position: 'top-center',
        autoClose: 1000,
        transition: Slide,
        theme: 'colored',
        hideProgressBar: true,
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <>
      <div style={{ display: selectedItems.length ? `block` : 'none'}}>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow sx={{backgroundColor: 'gold', fontWeight: '600'}}>
              <TableCell sx={tableCellStyling} component="th" scope="row" width={253}>Total</TableCell>
              <TableCell sx={tableCellStyling} align='center' width={82}>{ getTotalMacroQuantity('quantity') }</TableCell>
              <TableCell sx={tableCellStyling} align='center' width={151}>{ getTotalMacroQuantity('carbohydrates') }</TableCell>
              <TableCell sx={tableCellStyling} align='center' width={102}>{ getTotalMacroQuantity('proteins') }</TableCell>
              <TableCell sx={tableCellStyling} align='center' width={62}>{ getTotalMacroQuantity('fats') }</TableCell>
              <TableCell sx={tableCellStyling} align='center' width={82}>{ getTotalMacroQuantity('energy') }</TableCell>
              <TableCell className='total-macros-cell' sx={tableCellStyling} align='center' width={82}>
                <button type='button' style={buttonStyling} disabled={ selectedItems.length == 0 } onClick={() => handleCopyTotal()}><CopyAllOutlinedIcon /></button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      </div>
    </>
  )
}