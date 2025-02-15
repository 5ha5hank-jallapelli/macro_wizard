import ChecklistIcon from '@mui/icons-material/Checklist';

export default function EmptyTableState({ selectedItems }) {
  const emptyStateClasses = {
    display: selectedItems.length ? 'none' : 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '300px',
    backgroundColor: '#f4f4f4'
  }

  return (
    <div style={emptyStateClasses}>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center'}}>
        <ChecklistIcon></ChecklistIcon>
        <p>No food items selected</p>
      </div>
    </div>
  )
}