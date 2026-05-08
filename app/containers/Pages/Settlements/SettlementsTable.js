import * as React from "react";
import {
  Box,
  Button,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
  Grid,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import dayjs from "dayjs";

function formatDate(dateString) {
  if (!dateString) return "-";
  return dayjs(dateString).format("DD-MM-YYYY HH:mm") || dateString;
}

function Row({ row }) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
      <TableCell sx={{border: "none"}}>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center">{row.total_coins}</TableCell>
        <TableCell align="center">{`₹ ${row.total_amount}`}</TableCell>
        <TableCell sx={{border: "none"}}>{formatDate(row.settled_on)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              {/* <Typography variant="subtitle1" gutterBottom>
                Redemption History
              </Typography> */}
              <Table size="small" aria-label="redeems">
                <TableHead>
                  <TableRow>
                    <TableCell>Customer Name</TableCell>
                    <TableCell align="center">Coins</TableCell>
                    <TableCell align="center">Amount</TableCell>
                    <TableCell>Redeemed Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.redeems && row.redeems.length > 0 ? (
                    row.redeems.map((r, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{r.customer_name}</TableCell>
                        <TableCell align="center">{r.coins}</TableCell>
                        <TableCell align="center">{`₹ ${r.amount}`}</TableCell>
                        <TableCell>{formatDate(r.redeemed_date)}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        No redemption history
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function SettlementTable({ data = [] }) {
  const [searchDate, setSearchDate] = React.useState("");
  const [filteredRows, setFilteredRows] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleSearch = () => {
    const date = searchDate;
    const result = data.filter((row) => {
      return !date || dayjs(row.settled_on).isSame(date, "day");
    });

    const sorted = [...result].sort(
      (a, b) => new Date(b.settled_on) - new Date(a.settled_on)
    );
    setFilteredRows(sorted);
    setPage(0);
  };

  const handleReset = () => {
    setSearchDate("");
    const sorted = [...data].sort(
      (a, b) => new Date(b.settled_on) - new Date(a.settled_on)
    );
    setFilteredRows(sorted);
    setPage(0);
  };

  React.useEffect(() => {
    const sorted = [...data].sort(
      (a, b) => new Date(b.settled_on) - new Date(a.settled_on)
    );
    setFilteredRows(sorted);
  }, [data]);

  const paginatedRows = filteredRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <Box sx={{ padding: 2 }}>
        <Box sx={{ display: "flex", gap: 2, width: "85%" }}>
          <TextField
            label="Settled Date"
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{
              width: "15%",
              "& .MuiOutlinedInput-root": {
                borderRadius: "20px",
                padding: "0 10px",
              },
            }}
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSearch}
            sx={{ minWidth: "64px" }}
          >
            Search
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleReset}
            sx={{ minWidth: "64px" }}
          >
            Reset
          </Button>
        </Box>
      </Box>

      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="settlements table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="center">Total Coins</TableCell>
              <TableCell align="center">Total Amount</TableCell>
              <TableCell>Settled On</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.length > 0 ? (
              paginatedRows.map((row, idx) => <Row key={idx} row={row} />)
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No settlements found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
      />
    </Paper>
  );
}
