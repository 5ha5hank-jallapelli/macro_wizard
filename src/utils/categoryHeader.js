import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

const tableCellStyling = { padding: '5px 10px', height: "36px" };

export default function categoryHeader(label, items) {
  const rowStyles = { display: items.length ? 'table-row' : 'none', pointerEvents: 'none',
    backgroundColor:
    label == "Cereals" ? '#fdf5e6' :
    label == 'Pulses' ? 'rgba(189,183,107, 0.3)' :
    label == 'Nuts and Oilseeds' ? 'rgba(240,230,140,0.6)' :
    label == 'Meat & Poultry' ? 'rgba(171,78,82, 0.3)' :
    label == 'Seafood' ? 'rgba(176,224,230,1)' :
    label == 'Vegetables' ? 'rgba(118,255,122, 0.3)' :
    label == 'Mushrooms' ? ' rgba(255,182,193,0.5)' :
    label == 'Fruits' ? 'rgba(233,105,44, 0.5)' :
    label == 'Milk & Milk Products' ? 'rgba(240,248,255,1)' :
    '' }
  return (
    <TableRow sx={rowStyles}>
      <TableCell className={`fw-bold ${label.toLowerCase().replaceAll(' ', '-')}`} sx={tableCellStyling}>{label}</TableCell>
      <TableCell sx={tableCellStyling} className={label.toLowerCase().replaceAll(' ', '-')}></TableCell>
      <TableCell sx={tableCellStyling} className={label.toLowerCase().replaceAll(' ', '-')}></TableCell>
      <TableCell sx={tableCellStyling} className={label.toLowerCase().replaceAll(' ', '-')}></TableCell>
      <TableCell sx={tableCellStyling} className={label.toLowerCase().replaceAll(' ', '-')}></TableCell>
      <TableCell sx={tableCellStyling} className={label.toLowerCase().replaceAll(' ', '-')}></TableCell>
      <TableCell sx={tableCellStyling} className={label.toLowerCase().replaceAll(' ', '-')}></TableCell>
    </TableRow>
  )
}