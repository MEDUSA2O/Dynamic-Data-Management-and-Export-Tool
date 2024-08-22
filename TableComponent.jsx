import React, { useState, useEffect } from 'react';
import './TableComponent.css';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const TableComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNewRow, setShowNewRow] = useState(false);
  const [newRow, setNewRow] = useState(createEmptyRow());
  const [workbook, setWorkbook] = useState(() => XLSX.utils.book_new());

  const columns = [
    'S NO',
    'CREATED ON',
    'MODIFIED ON',
    'NAME',
    'EMAIL',
    'COMPANY',
    'BLOOD GROUP',
    'CONTACT NO',
    'DESIGNATION',
    'SKILL',
    'DELETE'
  ];

  useEffect(() => {
    setTimeout(() => {
      setData(generateRandomData());
      setLoading(false);
    }, 2000);
  }, []);

  function generateRandomData() {
    const designations = ['L1 Developer', 'L2 Developer', 'L3 Developer', 'Intern'];
    const skills = ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 'SQL', 'Git', 'Docker'];

    const rows = [];
    for (let i = 1; i <= 10; i++) {
      rows.push({
        sno: i,
        createdOn: new Date().toLocaleDateString(),
        modifiedOn: new Date().toLocaleDateString(),
        name: `Name ${i}`,
        email: `name${i}@example.com`,
        company: `Company ${i}`,
        bloodGroup: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'][Math.floor(Math.random() * 8)],
        contactNo: `123456789${i}`,
        designation: designations[Math.floor(Math.random() * designations.length)],
        skill: skills[Math.floor(Math.random() * skills.length)]
      });
    }
    return rows;
  }

  function createEmptyRow() {
    return {
      createdOn: new Date().toLocaleDateString(),
      modifiedOn: new Date().toLocaleDateString(),
      name: '',
      email: '',
      company: '',
      bloodGroup: '',
      contactNo: '',
      designation: '',
      skill: ''
    };
  }

  const handleInputChange = (e, field) => {
    setNewRow({ ...newRow, [field]: e.target.value });
  };

  const handleAddNewRow = () => {
    setNewRow({
      sno: data.length + 1,
      createdOn: new Date().toLocaleDateString(),
      modifiedOn: new Date().toLocaleDateString(),
      name: '',
      email: '',
      company: '',
      bloodGroup: '',
      contactNo: '',
      designation: '',
      skill: ''
    });
    setShowNewRow(true);
  };

  const handleApply = () => {
    const updatedData = [...data, newRow].map((row, index) => ({
      ...row,
      sno: index + 1
    }));
    setData(updatedData);
    setShowNewRow(false);
    setNewRow(createEmptyRow());
  };

  const handleDiscard = () => {
    setShowNewRow(false);
    setNewRow(createEmptyRow());
  };

  const handleDelete = (index) => {
    const newData = data.filter((_, i) => i !== index).map((row, i) => ({ ...row, sno: i + 1 }));
    setData(newData);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Setting column widths and header styles
    const range = XLSX.utils.decode_range(worksheet['!ref']);
    const colWidths = Array(range.e.c + 1).fill(10); // Default column width

    for (let R = range.s.r; R <= range.e.r; ++R) {
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cell_address = { c: C, r: R };
        const cell_ref = XLSX.utils.encode_cell(cell_address);

        if (worksheet[cell_ref]) {
          const cellValue = worksheet[cell_ref].v ? worksheet[cell_ref].v.toString() : '';
          colWidths[C] = Math.max(colWidths[C], cellValue.length + 2);

          if (R === 0) { // Header row
            worksheet[cell_ref].s = {
              font: { bold: true },
              alignment: { vertical: 'center', horizontal: 'center' },
              border: {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
              }
            };
            worksheet[cell_ref].v = worksheet[cell_ref].v.toUpperCase(); // Convert to uppercase
          } else {
            worksheet[cell_ref].s = {
              border: {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
              }
            };
          }
        }
      }
    }

    // Setting column widths
    worksheet['!cols'] = colWidths.map(width => ({ wch: width }));

    // Create a new sheet with the current date and time as the name
    const sheetName = new Date().toLocaleString();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(dataBlob, "table_data.xlsx");
  };

  return (
    <div className="table-container">
      <button onClick={handleAddNewRow}>Add New Row</button>
      {showNewRow && (
        <>
          <button onClick={handleApply}>Apply</button>
          <button onClick={handleDiscard}>Discard</button>
        </>
      )}
      <button onClick={exportToExcel}>Export to Excel</button>
      <table>
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            Array.from({ length: 10 }).map((_, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((col, colIndex) => (
                  <td key={colIndex}>
                    <div className="skeleton"></div>
                  </td>
                ))}
              </tr>
            ))
          ) : (
            data.map((row, index) => (
              <tr key={index}>
                <td>{row.sno}</td>
                <td>{row.createdOn}</td>
                <td>{row.modifiedOn}</td>
                <td>{row.name}</td>
                <td>{row.email}</td>
                <td>{row.company}</td>
                <td>{row.bloodGroup}</td>
                <td>{row.contactNo}</td>
                <td>{row.designation}</td>
                <td>{row.skill}</td>
                <td>
                  <button onClick={() => handleDelete(index)} className="delete-button">Delete</button>
                </td>
              </tr>
            ))
          )}
          {showNewRow && (
            <tr>
              <td>{newRow.sno}</td>
              <td>{newRow.createdOn}</td>
              <td>{newRow.modifiedOn}</td>
              <td><input type="text" value={newRow.name} onChange={(e) => handleInputChange(e, 'name')} /></td>
              <td><input type="email" value={newRow.email} onChange={(e) => handleInputChange(e, 'email')} /></td>
              <td><input type="text" value={newRow.company} onChange={(e) => handleInputChange(e, 'company')} /></td>
              <td><input type="text" value={newRow.bloodGroup} onChange={(e) => handleInputChange(e, 'bloodGroup')} /></td>
              <td><input type="text" value={newRow.contactNo} onChange={(e) => handleInputChange(e, 'contactNo')} /></td>
              <td><input type="text" value={newRow.designation} onChange={(e) => handleInputChange(e, 'designation')} /></td>
              <td><input type="text" value={newRow.skill} onChange={(e) => handleInputChange(e, 'skill')} /></td>
              <td></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
