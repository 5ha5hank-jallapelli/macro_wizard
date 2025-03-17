import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { useVitals } from "../context/VitalsContext"

export default function ClientDetailRows() {

  const { vitals } = useVitals()

  return (
    <>
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
        <TableCell className='meta-data-cell'>{ vitals.gender }</TableCell>
        <TableCell className='meta-data-cell'>{ vitals.age }</TableCell>
        <TableCell className='meta-data-cell'>{ vitals.weight }</TableCell>
        <TableCell className='meta-data-cell'>{ vitals.height }</TableCell>
        <TableCell className='meta-data-cell'>{ vitals.bmi }</TableCell>
        <TableCell className='meta-data-cell'>{ vitals.bmr }</TableCell>
      </TableRow>
      <TableRow></TableRow>
      <TableRow></TableRow>
    </>
  )
}