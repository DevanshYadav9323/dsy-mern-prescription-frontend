import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "tss-react/mui";
import { lighten } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import {
    Button,
    Divider,
    Grid,
    IconButton,
    Input,
    MenuItem,
    Box,
    TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import { useHistory } from "react-router";
import axios from "axios";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";
import Menu, { MenuProps } from "@mui/material/Menu";
import { styled, alpha } from "@mui/material/styles";
import spinner from "../../../../public/images/spinner.gif";
import { toast } from "react-toastify";
import EmptyData from "../../../components/Tables/EmptyData";
import dayjs from "dayjs";

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const useStyles = makeStyles()((theme) => ({
    root: {
        width: "100%",
    },
    paper: {
        width: "100%",
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: "rect(0 0 0 0)",
        height: 1,
        margin: -1,
        overflow: "hidden",
        padding: 0,
        position: "absolute",
        top: 20,
        width: 1,
    },
}));

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
        }}
        transformOrigin={{
            vertical: "top",
            horizontal: "right",
        }}
        {...props}
    />
))(({ theme }) => ({
    "& .MuiPaper-root": {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === "light"
                ? "rgb(55, 65, 81)"
                : theme.palette.grey[300],
        boxShadow:
            "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
        "& .MuiMenu-list": {
            padding: "4px 0",
        },
        "& .MuiMenuItem-root": {
            "& .MuiSvgIcon-root": {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            "&:active": {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity
                ),
            },
        },
    },
}));

function EnhancedTableHead(props) {
    const { data } = props;

    return (
        <TableHead>
            <TableRow>
                {data.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align}
                        padding={"normal"}
                    >
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    data: PropTypes.array.isRequired,
};

// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. Unsupported arrow function syntax.
// Unexpected value type of ConditionalExpression.
const useToolbarStyles = makeStyles()((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.mode === "light"
            ? {
                  color: theme.palette.secondary.main,
                  backgroundColor: lighten(theme.palette.secondary.light, 0.85),
              }
            : {
                  color: theme.palette.text.primary,
                  backgroundColor: theme.palette.secondary.dark,
              },
    title: {
        flex: "1 1 100%",
    },
}));

const EnhancedTableToolbar = ({ reloadData, loading }) => {
    const { classes, cx } = useToolbarStyles();

    return (
        <Toolbar className={cx(classes.root)} style={{ marginTop: 15 }}>
            <Typography
                className={classes.title}
                variant="h6"
                id="tableTitle"
                component="div"
            ></Typography>
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {};

export default function EarningTable(data) {
    const { classes } = useStyles();
    const history = useHistory();
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("calories");
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [loading, setLoading] = useState(false);

    const [searchDate, setSearchDate] = React.useState("");
    const [filteredRows, setFilteredRows] = React.useState(data.data || []);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = data.data.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // const isSelected = (name) => selected.indexOf(name) !== -1;

    const emptyRows =
        rowsPerPage -
        Math.min(rowsPerPage, data.data.length - page * rowsPerPage);

    const handleSearch = () => {
        const date = searchDate;

        const result = data.data.filter((row) => {
            return !date || dayjs(row.createdAt).isSame(date, "day");
        });

        setFilteredRows(result);
        setPage(0);
    };

    const handleReset = () => {
        setSearchDate("");
        setFilteredRows(data.data);
        setPage(0);
    };

    React.useEffect(() => {
        setFilteredRows(data.data);
    }, [data.data]);

    const handleReload = () => {
        setLoading(true);
        data.reloadData();
        setLoading(false);
    };

    return (
        <div className={classes.root}>
            <Button
                variant="contained"
                color="primary"
                onClick={handleReload}
                disabled={loading}
                style={{ position: "absolute", right: "8px", top: "78px" }}
            >
                {loading ? "Reloading..." : "Reload"}
            </Button>

                    
                {loading ? ( <div style={{ display: "flex", justifyContent: "center" }}>
                        <img
                            src={spinner}
                            alt="spinner"
                            className={classes.circularProgress}
                        />
                    </div>) : (<>
                        <Paper className={classes.paper}>
                    <Box sx={{ padding: "16px 16px 0 16px" }}>
                    <Box sx={{ display: "flex", gap: 2, width: "85%" }}>
                        <TextField
                            label="Requested Date"
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
                        >
                            Search
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleReset}
                        >
                            Reset
                        </Button>
                    </Box>
                </Box>
                {/* <EnhancedTableToolbar
          loading={data.loading}
          reloadData={data.reloadData}
        /> */}
                {data.loading ? (
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <img
                            src={spinner}
                            alt="spinner"
                            className={classes.circularProgress}
                        />
                    </div>
                ) : (
                    <TableContainer>
                        <Table
                            className={classes.table}
                            aria-labelledby="tableTitle"
                            size={"medium"}
                            aria-label="enhanced table"
                        >
                            <EnhancedTableHead
                                data={data.columnData}
                                classes={classes}
                                // numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={filteredRows.length}
                            />
                            <TableBody>
                                {filteredRows.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} align="center">
                                            No redeem records
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    stableSort(
                                        filteredRows,
                                        getComparator(order, orderBy)
                                    )
                                        .slice(
                                            page * rowsPerPage,
                                            page * rowsPerPage + rowsPerPage
                                        )
                                        .map((row, index) => (
                                            <TableRow
                                                hover
                                                tabIndex={-1}
                                                key={row._id}
                                            >
                                                <TableCell>
                                                    {row?.customer_id?.name ||
                                                        "NA"}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {row.coins}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {"₹ " + row.coins / 100}
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        variant="contained"
                                                        color={
                                                            row.status ===
                                                            "pending"
                                                                ? "error"
                                                                : "success"
                                                        }
                                                        sx={{
                                                            padding: "2px 8px",
                                                            minWidth: "unset",
                                                            fontSize: "12px",
                                                        }}
                                                    >
                                                        {row.status}
                                                    </Button>
                                                </TableCell>
                                                <TableCell>
                                                    {dayjs(
                                                        row.createdAt
                                                    ).format(
                                                        "DD-MM-YYYY HH:mm"
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {row?.settled_on
                                                        ? dayjs(
                                                              row.settled_on
                                                          ).format(
                                                              "DD-MM-YYYY HH:mm"
                                                          )
                                                        : "NA"}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                )}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{ height: 53 * emptyRows }}
                                    >
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
                <TablePagination
                    rowsPerPageOptions={[]}
                    component="div"
                    count={filteredRows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
                 </Paper>
                </>)}
                
           
        </div>
    );
}
