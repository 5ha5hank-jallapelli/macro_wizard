import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import * as XLSX from 'xlsx-js-style'
import { saveAs } from 'file-saver'
import { useVitals } from '@/app/context/VitalsContext';

export default function ExportTableButton({ selectedItems }) {
  const { vitals } = useVitals()

  const handleTableExport = () => {
    const table = document.getElementById('selectedItems');
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.table_to_sheet(table)

      let data = XLSX.utils.sheet_to_json(worksheet, { header: 1 })

      const metaData = [
        ["", ""],
        ["Name", ""],
        ["Age", `${vitals.age} years`],
        ["Weight", `${vitals.weight} kgs`],
        ["Height", `${vitals.height} cms`],
        ["BMI", `${vitals.bmi} kg/m2`],
        ["BMR", `${vitals.bmr} cals/day`],
        ["", ""],
        ["", ""]
      ];

      data = [...metaData, ...data ];

      const newData = XLSX.utils.aoa_to_sheet(data)

      worksheet["!ref"] = XLSX.utils.encode_range({ s: { r: 0, c: 0 }, e: { r: 500, c: 500 } });

      const bold = {font: { bold: true }}
      const hCenter = {alignment: { horizontal: 'center'}}
      const borderRight = {right: {style: 'hair', color: 'dcdcdc'}}

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
            if (cellElement.classList.contains("fw-bold")) {
              cell.s = {...bold}
            }
            if (cellElement.classList.contains("item-column")) {
            cell.s = {...bold,...hCenter}
            }
            if (cellElement.classList.contains("total-cell")) {
              cell.s = { ...bold, ...borderRight, fill: {fgColor:{ rgb: "ffd700" }}}
            }
            if (cellElement.classList.contains("total-item-cell")) {
              cell.s = { ...bold, ...borderRight, ...hCenter, fill: {fgColor:{ rgb: "ffd700" }}}
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
          }
        }
      }

      XLSX.utils.book_append_sheet(workbook, newData, "Sheet 1")

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