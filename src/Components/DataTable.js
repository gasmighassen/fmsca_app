import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Box,
  TableSortLabel,
  Typography,
  Checkbox,
  Menu,
  MenuItem,
  IconButton,
  Divider,
  TextField,
  Skeleton,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

const columns = [
  { label: "Created Date", key: "created_dt" },
  { label: "Modified Date", key: "data_source_modified_dt" },
  { label: "Entity", key: "entity_type" },
  { label: "Operating Status", key: "operating_status" },
  { label: "Legal Name", key: "legal_name" },
  { label: "DBA Name", key: "dba_name" },
  { label: "Physical Address", key: "physical_address" },
  { label: "Phone", key: "phone" },
  { label: "DOT", key: "usdot_number" },
  { label: "MC/MX/FF", key: "mc_mx_ff_number" },
  { label: "Power Units", key: "power_units" },
  { label: "Out Of Service Date", key: "out_of_service_date" },
];

const DataTable = () => {
  // State for storing raw data fetched from the CSV
  const [data, setData] = useState([]);

  // State for storing filtered data based on search query
  const [filteredData, setFilteredData] = useState([]);

  // State for pagination: current page number
  const [page, setPage] = useState(0);

  // State for pagination: number of rows per page
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // State for sorting order ('asc' or 'desc')
  const [order, setOrder] = useState("asc");

  // State for the column by which data is sorted
  const [orderBy, setOrderBy] = useState("");

  // State for managing which columns are visible
  const [visibleColumns, setVisibleColumns] = useState(
    columns.reduce((acc, col) => ({ ...acc, [col.key]: true }), {})
  );

  // State for the anchor element of the filter menu
  const [anchorEl, setAnchorEl] = useState(null);

  // State for search query input
  const [searchQuery, setSearchQuery] = useState("");

  // State for loading status
  const [loading, setLoading] = useState(true);

  // Effect to fetch and parse CSV data on component mount
  useEffect(() => {
    fetch("/FMSCA_records.csv")
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          complete: (results) => {
            const parsedData = results.data.map((row) =>
              columns.reduce((acc, col) => {
                acc[col.key] = row[col.key];
                return acc;
              }, {})
            );
            setData(parsedData);
            setLoading(false);
          },
        });
      });
  }, []);

  // Effect to filter data based on search query and visible columns
  useEffect(() => {
    const filtered = data.filter((row) =>
      Object.values(row).some((value) =>
        value.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setFilteredData(filtered);
  }, [data, searchQuery, visibleColumns]);

  // Function to handle sorting request by column
  const handleRequestSort = (property) => {
    // Determine if current sort order is ascending
    const isAsc = orderBy === property && order === "asc";
    // Toggle sort order
    setOrder(isAsc ? "desc" : "asc");
    // Set column to sort by
    setOrderBy(property);
  };

  // Function to perform stable sorting of the array
  const stableSort = (array, comparator) => {
    // Create an array of pairs [element, index] to preserve original order
    const stabilizedArray = array.map((el, index) => [el, index]);
    // Sort array using comparator and original index for stable sorting
    stabilizedArray.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      return order !== 0 ? order : a[1] - b[1];
    });
    // Extract sorted elements
    return stabilizedArray.map((el) => el[0]);
  };

  // Function to get the comparator for sorting
  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
      : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
  };

  return (
    <Paper
      elevation={3}
      style={{
        margin: "16px",
        padding: "16px",
      }}
    >
      <Box display="flex" flexDirection="column" padding="16px">
        <Box marginBottom="16px">
          <Typography variant="h4" gutterBottom>
            Data Overview
          </Typography>
          <Typography variant="body2" paragraph>
            This table presents data from the Federal Motor Carrier Safety
            Administration (FMSCA), offering insights into the safety and
            regulatory compliance of motor carriers. Utilize the search and
            filter options to efficiently navigate and explore the data.
          </Typography>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          marginBottom="16px"
        >
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ marginRight: "16px" }}
          />
          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
            <FilterListIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            PaperProps={{ style: { maxHeight: 400, width: "220px" } }}
          >
            <MenuItem disabled>
              <Typography variant="subtitle2">Select Columns</Typography>
            </MenuItem>
            <Divider />
            {columns.map((col) => (
              <MenuItem key={col.key}>
                <Checkbox
                  checked={visibleColumns[col.key]}
                  onChange={(e) =>
                    setVisibleColumns((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.checked,
                    }))
                  }
                  name={col.key}
                  color="primary"
                />
                {col.label}
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <TableContainer
          style={{
            maxWidth: "100%",
            overflowX: "auto",
            maxHeight: "calc(100vh - 400px)",
          }}
        >
          {loading ? (
            // Display skeleton loading effect while data is being fetched
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Skeleton variant="text" width="100%" />
                  </TableCell>
                  {columns.map((col) => (
                    <TableCell key={col.key}>
                      <Skeleton variant="text" width="100%" />
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.from({ length: rowsPerPage }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton variant="text" width="100%" />
                    </TableCell>
                    {columns.map((col) => (
                      <TableCell key={col.key}>
                        <Skeleton variant="text" width="100%" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            // Render the actual table once data is loaded
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{
                      backgroundColor: "#f0f0f0",
                      textAlign: "left",
                      minWidth: "100px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    <Typography
                      variant="body2"
                      style={{ fontSize: "0.875rem", fontWeight: "bold" }}
                    ></Typography>
                  </TableCell>
                  {columns
                    .filter((col) => visibleColumns[col.key])
                    .map((col) => (
                      <TableCell
                        key={col.key}
                        style={{
                          backgroundColor: "#f0f0f0",
                          textAlign: "left",
                          whiteSpace: "nowrap",
                          minWidth: "100px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        <TableSortLabel
                          active={orderBy === col.label}
                          direction={orderBy === col.label ? order : "asc"}
                          onClick={() => handleRequestSort(col.label)}
                        >
                          <Typography
                            variant="body2"
                            style={{ fontSize: "0.875rem", fontWeight: "bold" }}
                          >
                            {col.label}
                          </Typography>
                        </TableSortLabel>
                      </TableCell>
                    ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {stableSort(filteredData, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow
                      key={index}
                      style={{
                        backgroundColor:
                          index % 2 === 0 ? "#fafafa" : "#ffffff",
                        height: "56px",
                      }}
                    >
                      <TableCell
                        style={{
                          textAlign: "left",
                          maxWidth: "100px",
                          wordBreak: "break-word",
                          whiteSpace: "normal",
                          overflow: "hidden",
                        }}
                      >
                        <Typography
                          variant="body2"
                          style={{
                            fontSize: "0.675rem",
                          }}
                        >
                          {page * rowsPerPage + index + 1}
                        </Typography>
                      </TableCell>
                      {columns
                        .filter((col) => visibleColumns[col.key])
                        .map((col) => (
                          <TableCell
                            key={col.key}
                            style={{
                              textAlign: "left",
                              maxWidth: "200px",
                              wordBreak: "break-word",
                              whiteSpace: "normal",
                              overflow: "hidden",
                            }}
                          >
                            <Typography
                              variant="body2"
                              style={{
                                fontSize: "0.675rem",
                              }}
                            >
                              {row[col.key]}
                            </Typography>
                          </TableCell>
                        ))}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <TablePagination
          component="div"
          count={filteredData.length}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          style={{ marginTop: "16px" }}
        />
      </Box>
    </Paper>
  );
};

export default DataTable;
