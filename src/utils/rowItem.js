import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import CopyAllOutlinedIcon from '@mui/icons-material/CopyAllOutlined';
import { Slide, toast } from 'react-toastify';

export default function rowItem(items) {
  const tableCellStyling = { padding: '5px 10px', height: "36px" };
  const buttonStyling = { all: 'unset', cursor: 'pointer' }

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
    items.map((row) => (
      <TableRow key={row.id} sx={{display: items.length ? 'table-row' : 'none', width: '100%'}}>
        <TableCell sx={tableCellStyling} component="th" scope="row">{row.item}</TableCell>
        <TableCell className='cell-body' sx={tableCellStyling} align="center">{row.quantity}</TableCell>
        <TableCell className='cell-body' sx={tableCellStyling} align="center">{row.carbohydrates}</TableCell>
        <TableCell className='cell-body' sx={tableCellStyling} align="center">{row.proteins}</TableCell>
        <TableCell className='cell-body' sx={tableCellStyling} align="center">{row.fats}</TableCell>
        <TableCell className='cell-body' sx={tableCellStyling} align="center">{row.energy}</TableCell>
        <TableCell className='btn-copy-cell' sx={tableCellStyling} align="center">
          <button className='btn-copy' type='button' style={buttonStyling} onClick={() => handleRowCopy(row)}><CopyAllOutlinedIcon /></button>
        </TableCell>
      </TableRow>
    ))
  )
}