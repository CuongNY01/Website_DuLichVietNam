import * as XLSX from 'xlsx';

/**
 * Exports JSON data to an Excel file (.xlsx)
 * @param data Array of objects to export
 * @param fileName Desired file name (without extension)
 * @param sheetName Name of the worksheet
 */
export const exportToExcel = (data: any[], fileName: string, sheetName: string = 'Sheet1') => {
  // Create a new workbook
  const wb = XLSX.utils.book_new();
  
  // Convert JSON to worksheet
  const ws = XLSX.utils.json_to_sheet(data);
  
  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  
  // Write and download the file
  XLSX.writeFile(wb, `${fileName}.xlsx`);
};

/**
 * Format currency for report display
 */
export const formatCurrency = (amount: number): string => {
  return amount.toLocaleString('vi-VN') + ' đ';
};
