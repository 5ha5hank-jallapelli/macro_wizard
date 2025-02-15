import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

export default function TableHeader() {
  const columnsHeaders = ['Food Item', 'Amount', 'Carbohydrates', 'Proteins', 'Fats', 'Energy', 'Action']
  return (
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
  )
}