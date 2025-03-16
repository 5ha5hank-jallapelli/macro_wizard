import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

export default function TableHeader({selectedRows}) {
  const columnsHeaders = ['Food Item', 'Amount', 'Carbohydrates', 'Proteins', 'Fats', 'Energy']
  return (
    <TableHead>
      <TableRow sx={{visibility: 'collapse'}}>
        <TableCell className='fw-bold meta-data-cell'>Name</TableCell>
        <TableCell className='fw-bold meta-data-cell'>Gender</TableCell>
        <TableCell className='fw-bold meta-data-cell'>Age</TableCell>
        <TableCell className='fw-bold meta-data-cell'>Weight</TableCell>
        <TableCell className='fw-bold meta-data-cell'>Height</TableCell>
        <TableCell className='fw-bold meta-data-cell'>BMI</TableCell>
        <TableCell className='fw-bold meta-data-cell'>BMR</TableCell>
      </TableRow>
      <TableRow sx={{visibility: 'collapse'}}>
        <TableCell className='meta-data-cell'>[Client Name]</TableCell>
        <TableCell className='meta-data-cell'>Male</TableCell>
        <TableCell className='meta-data-cell'>31</TableCell>
        <TableCell className='meta-data-cell'>89</TableCell>
        <TableCell className='meta-data-cell'>189</TableCell>
        <TableCell className='meta-data-cell'>24.8</TableCell>
        <TableCell className='meta-data-cell'>2018</TableCell>
      </TableRow>
      <TableRow></TableRow>
      <TableRow></TableRow>
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