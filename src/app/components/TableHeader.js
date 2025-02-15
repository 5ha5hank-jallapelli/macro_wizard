import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

export default function TableHeader({selectedRows}) {
  const columnsHeaders = ['Food Item', 'Amount', 'Carbohydrates', 'Proteins', 'Fats', 'Energy']
  return (
    <TableHead>
      <TableRow>
        {columnsHeaders.map((column, index) => {
          const width = index == 0 ? '253px' : 'auto';
          return <TableCell
            className={`fw-bold ${index > 0 ? 'item-column' : ''}`}
            key={index}
            sx={{ padding: '5px 10px', width: width, height: "39px" }}
            align={index == 0 ? 'left' : 'center'}>{`${column}`} {} </TableCell>
        })}
        <TableCell />
      </TableRow>
    </TableHead>
  )
}