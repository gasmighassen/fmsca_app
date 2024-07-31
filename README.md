# Data Overview App for federal motor carrier safety administration

## Description

The Data Overview App provides a comprehensive view of data from the Federal Motor Carrier Safety Administration (FMSCA). This app features a dynamic table that allows users to search, filter, and sort data effectively. It supports column visibility customization and includes pagination to handle large datasets efficiently.

## Features

- **Dynamic Data Table**: Displays data from a CSV file with real-time updates.
- **Search Functionality**: Allows users to search through all data fields.
- **Column Visibility Control**: Users can toggle column visibility through a filter menu.
- **Sorting**: Users can sort data by columns in ascending or descending order.
- **Pagination**: Navigates through large datasets with page-based navigation.
- **Responsive Design**: The table adjusts to fit various screen sizes.

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/data-overview-app.git
   ```
2. **Navigate to the Project Directory:**
   ```bash
   cd data-overview-app
   ```
3. **Install Dependencies:**
   ```bash
   npm install
   ```
4. **Run the App:**
   ```bash
   npm start
   ```

## Usage

- **Loading Data:** The app fetches data from /FMSCA_records.csv. Ensure the CSV file is placed in the public directory of the project.
- **Search:** Use the search bar to filter data across all columns.
- **Filter Columns:** Click the filter icon to select or deselect columns you want to display.
- **Sort Data:** Click on column headers to sort data in ascending or descending order.
- **Pagination:** Use pagination controls to navigate through different pages of data.

## Technologies Used

- **React:** JavaScript library for building user interfaces.
- **Material UI:** React components for faster and easier web development.
- **PapaParse:** JavaScript library for parsing CSV files.

## Contact

For any questions or issues, please contact G.Gasmi at gasmi.ghassen@gmail.com.
