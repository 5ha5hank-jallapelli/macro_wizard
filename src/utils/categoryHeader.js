import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

const tableCellStyling = { padding: '5px 10px', height: "36px" };

export default function categoryHeader(label, items) {
  const rowStyles = { display: items.length ? 'table-row' : 'none', pointerEvents: 'none' }
  return (
    <TableRow sx={rowStyles}>
      <TableCell sx={tableCellStyling}><span style={{ fontWeight: '600' }}>{label}</span></TableCell>
      <TableCell sx={tableCellStyling}></TableCell>
      <TableCell sx={tableCellStyling}></TableCell>
      <TableCell sx={tableCellStyling}></TableCell>
      <TableCell sx={tableCellStyling}></TableCell>
      <TableCell sx={tableCellStyling}></TableCell>
      <TableCell sx={tableCellStyling}></TableCell>
    </TableRow>
  )
}