import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import * as XLSX from 'xlsx-js-style'
import { saveAs } from 'file-saver'
import { useVitals } from '@/app/context/VitalsContext';
import { border, color } from '@mui/system';

export default function ExportTableButton({ selectedItems }) {
  const { vitals } = useVitals()

  const handleTableExport = () => {
    const table = document.getElementById('selectedItems');
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.table_to_sheet(table)

      XLSX.utils.sheet_to_json(worksheet, { header: 1 })

      worksheet["!ref"] = XLSX.utils.encode_range({ s: { r: 0, c: 0 }, e: { r: 500, c: 500 } });

      const bold = {font: { bold: true }}
      const hCenter = {alignment: { horizontal: 'center'}}
      const hStart = { alignment: { horizontal: 'left'}}
      const allBorders = {
        border: {
          top: {
            style: 'thin',
            color: '#000'
          },
          right: {
            style: 'thin',
            color: '#000'
          },
          bottom: {
            style: 'thin',
            color: '#000'
          },
          left: {
            style: 'thin',
            color: '#000'
          }
        }}

      worksheet["!cols"] = [
        { wch: 30 },
        { wch: 10 },
        { wch: 15 },
        { wch: 10 },
        { wch: 10 },
        { wch: 10 },
      ]

      const range = XLSX.utils.decode_range(worksheet["!ref"]);

      for (let R = range.s.r; R <= range.e.c; ++R) {
        for (let C = range.s.c; C <= range.e.c; ++C) {
        const cell_addr = XLSX.utils.encode_cell({r: R, c: C});
        const cell = worksheet[cell_addr]
        if (cell) {
            const cellElement = table.rows[R].cells[C]
            // if (cellElement.classList.contains("cell-body") && cell.v === '') {
            //   cell.v = 0
            // }
            if (cellElement.classList.contains("fw-bold")) {
              cell.s = {...bold}
            }
            if (cellElement.classList.contains("item-column")) {
            cell.s = {...bold,...hCenter}
            }
            if (cellElement.classList.contains("total-cell")) {
              cell.s = {
              ...bold,
              fill: {fgColor:{ rgb: "ffd700"}},
            }
            }
            if (cellElement.classList.contains("total-item-cell")) {
              cell.s = {
                ...bold,
                ...hCenter,
                fill: {fgColor:{ rgb: "ffd700"}},
              }
            }
            if (cellElement.classList.contains("reference-cell")) {
              cell.s = {
              ...bold,
              fill: {fgColor:{ rgb: "afeeee"}},
            }
            }
            if (cellElement.classList.contains("reference-item-cell")) {
              cell.s = {
                ...bold,
                ...hCenter,
                fill: {fgColor:{ rgb: "afeeee"}},
              }
            }
            if (cellElement.classList.contains("meta-data-cell")) {
              cell.s = {
                ...bold,
                ...hStart,
                fill: {fgColor:{ rgb: "afeeee"}},
              }
            }
            if (cellElement.classList.contains("cell-body")) {
              cell.s = {...hCenter}
            }
            if (cellElement.classList.contains("cereals")) {
              cell.s = { ...bold, fill: { fgColor: { rgb: 'fdf5e6'}}}
            }
            if (cellElement.classList.contains("pulses")) {
              cell.s = { ...bold, fill: { fgColor: { rgb: 'EBE9D2'}}}
            }
            if (cellElement.classList.contains("nuts-and-oilseeds")) {
              cell.s = { ...bold, fill: { fgColor: { rgb: 'F6F0BA'}}}
            }
            if (cellElement.classList.contains("meat-&-poultry")) {
            cell.s = {...bold, fill: { fgColor: { rgb: 'E6C9CA'}}}
            }
            if (cellElement.classList.contains("seafood")) {
            cell.s = {...bold, fill: { fgColor: { rgb: 'B0E0E6'}}}
            }
            if (cellElement.classList.contains("vegetables")) {
            cell.s = {...bold, fill: { fgColor: { rgb: 'D5FFD7'}}}
            }
            if (cellElement.classList.contains("mushrooms")) {
            cell.s = {...bold, fill: { fgColor: { rgb: 'FFDAE0'}}}
            }
            if (cellElement.classList.contains("fruits")) {
            cell.s = {...bold, fill: { fgColor: { rgb: 'F4B395'}}}
            }
            if (cellElement.classList.contains("milk-&-milk-products")) {
            cell.s = {...bold, fill: { fgColor: { rgb: 'F0F8FF'}}}
            }
            if (cellElement.classList.contains("h-start")) {
              cell.s = {...hStart}
            }
            cell.s = {...cell.s, ...allBorders}
          }
        }
      }
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet 1")

      const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
      const blob = new Blob([wbout], { type: 'application/vnd.ms-excel' });
      saveAs(blob, 'plan.xlsx');
  }

  return (
    <button
      type='button'
      title='Export Data'
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        transform: 'translateY(4px)',
        backgroundColor: '#10793F',
        color: 'white',
        padding: '1px 10px',
        border: 'none',
        borderRadius: '4px',
        maxHeight: '35px',
        letterSpacing:'0.2px'
      }}
      disabled={!selectedItems.length ? true : false}
      onClick={() => handleTableExport()}>
      Export XLSX
      <FileDownloadOutlinedIcon style={{color: 'white', fontSize: '20px'}} />
    </button>
  )
}