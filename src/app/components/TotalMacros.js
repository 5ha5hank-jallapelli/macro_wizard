import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import CopyAllOutlinedIcon from '@mui/icons-material/CopyAllOutlined';
import { Slide, toast } from 'react-toastify';
import { useMacro } from '../context/MacrosContext';

export default function TotalMacros({ selectedItems }) {
  const tableCellStyling = { padding: '5px 10px', height: "36px", fontWeight: '600' };
  const buttonStyling = { all: 'unset', cursor: 'pointer' }
  const { macro } = useMacro();

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
      <TableRow sx={{backgroundColor: 'gold', fontWeight: '600', position: 'sticky', bottom: '36px', display: selectedItems.length ? `table-row` : 'none'}}>
        <TableCell className='total-cell' sx={tableCellStyling} component="th" scope="row" width={253}><b>Total</b></TableCell>
        <TableCell className='total-item-cell' sx={tableCellStyling} align='center' width={82}><b>{ getTotalMacroQuantity('quantity') }</b></TableCell>
        <TableCell className='total-item-cell' sx={tableCellStyling} align='center' width={151}><b>{ getTotalMacroQuantity('carbohydrates') }</b></TableCell>
        <TableCell className='total-item-cell' sx={tableCellStyling} align='center' width={102}>{ getTotalMacroQuantity('proteins') }</TableCell>
        <TableCell className='total-item-cell' sx={tableCellStyling} align='center' width={62}>{ getTotalMacroQuantity('fats') }</TableCell>
        <TableCell className='total-item-cell' sx={tableCellStyling} align='center' width={82}>{ getTotalMacroQuantity('energy') }</TableCell>
        <TableCell className='total-macros-cell' sx={tableCellStyling} align='center' width={82}>
          <button type='button' style={buttonStyling} disabled={ selectedItems.length == 0 } onClick={() => handleCopyTotal()}><CopyAllOutlinedIcon /></button>
        </TableCell>
      </TableRow>
      <TableRow sx={{backgroundColor: 'white', fontWeight: '600', position: 'sticky', bottom: '0', display: selectedItems.length ? `table-row` : 'none'}}>
        <TableCell className='total-cell' sx={tableCellStyling} component="th" scope="row" width={253}><b>Reference</b></TableCell>
        <TableCell className='total-item-cell' sx={tableCellStyling} align='center' width={82}><b>--</b></TableCell>
        <TableCell className='total-item-cell' sx={tableCellStyling} align='center' width={151}><b>{ macro.carbohydrates }</b></TableCell>
        <TableCell className='total-item-cell' sx={tableCellStyling} align='center' width={102}>{ macro.proteins }</TableCell>
        <TableCell className='total-item-cell' sx={tableCellStyling} align='center' width={62}>{ macro.fats }</TableCell>
        <TableCell className='total-item-cell' sx={tableCellStyling} align='center' width={82}>{ macro.totalCalories }</TableCell>
        <TableCell className='total-macros-cell' sx={tableCellStyling} align='center' width={82}>
          --
        </TableCell>
      </TableRow>
    </>
  )
}