# Dynamic-Data-Management-and-Export-Tool
A React-based table component that allows users to manage employee data by adding, editing, deleting, and exporting rows to Excel. It features dynamic row addition, Excel export with custom formatting, and responsive design with skeleton loading states.
The Interactive Employee Data Table is a React-based component designed for managing employee information. It allows users to dynamically add, edit, and delete rows of data, with features like Excel export, custom formatting, and responsive design.

## Features
- **Dynamic Row Addition**: 
  - Users can easily add new rows of employee data, including fields such as `name`, `email`, `company`, etc.
  - A new row form appears with pre-filled date fields and empty inputs for other details.
  
- **Excel Export**: 
  - Data can be exported to an Excel file using the `XLSX` library.
  - Includes custom formatting with bold headers, auto-adjusted column widths, and borders.
  - The exported file is named with the current date and time.
  
- **Skeleton Loading**: 
  - Skeleton screens are displayed during data loading to enhance the user experience.
  - Placeholder elements mimic the structure of the table, providing visual feedback.

- **Responsive Design**: 
  - The table is designed to be responsive, ensuring a seamless experience across different devices.
  - CSS is used to adjust the table layout and elements based on screen size.

## Technology Stack
- **React**: 
  - The frontend framework used for building the interactive UI.
  
- **XLSX**: 
  - A library used for converting JSON data to an Excel sheet and handling export functionality.
  
- **FileSaver.js**: 
  - A library used for saving the exported Excel file to the user's device.
  
## Code Structure
- **TableComponent.js**: 
  - The main React component that handles the table's logic, state management, and data manipulation.
  
- **TableComponent.css**: 
  - Contains styling for the table, including skeleton loaders and button designs.

## Usage
The component can be integrated into any React application where employee data needs to be managed. It is designed to be easy to customize and extend based on specific project requirements.
