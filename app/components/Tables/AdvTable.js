import React from "react";
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
import Button from "@mui/material/Button";
import EditableCell from "../Tables/tableParts/EditableCell";
import { AddAPhotoRounded } from "@mui/icons-material";
import {
  ButtonGroup,
  Checkbox,
  Grid,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import AppConfig from "../../containers/App/constants/config";
import Autocomplete from "@mui/material/Autocomplete";
import spinner from "../../../public/images/spinner.gif";
import { toast } from "react-toastify";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Menu, { MenuProps } from "@mui/material/Menu";
import { styled, alpha } from "@mui/material/styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import EmptyData from "./EmptyData";
import { useHistory } from "react-router";

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

function EnhancedTableHead(props) {
  const { data } = props;

  return (
    <TableHead>
      <TableRow>
        {data.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? "none" : "normal"}
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

const EnhancedTableToolbar = ({
  companyData,
  categoryData,
  reloadData,
  getSearchData,
  setSearch,
  search,
  setBrand,
  brand,
  loading,
  subCategories,
  units,
  tab,
  checkedProducts,
  hideUnhide,
  setHideUnhide,
  setType,
  setChecked,
}) => {
  const { classes, cx } = useToolbarStyles();
  const [addOpen, setAddOpen] = React.useState(false);
  const [CSVOpen, setCSVOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [uploadOpen, setUploadOpen] = React.useState(false);


  const baseUrl = AppConfig.baseUrl;
  const token = localStorage.getItem("token");
  const handleAddModalOpen = () => {
    setAddOpen(true);
  };

  const handleClose = () => {
    setAddOpen(false);
  };

  const handleAddCSVModalOpen = () => {
    setCSVOpen(true);
  };

  const handleCSVClose = () => {
    setCSVOpen(false);
  };

  const handleReset = async () => {
    await setSearch("");
    await setBrand("");
    getSearchData("reset");
  };

  const handleDownloadTemp = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/product/download_template`, {
        responseType: "blob",
        headers: {
          Authorization: token,
        },
      });
      if (!data.error) {
        const url = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `template.xlsx`);
        document.body.appendChild(link);
        link.click();
      } else {
        toast(data.title);
      }
    } catch (error) {
      console.log(error);
      toast(error.message);
    }
  };
  const handleHideUnhide = (e, str) => {
    setType(str);
    setHideUnhide(true);
  };

  return (
    <Toolbar className={cx(classes.root)} style={{ marginTop: 15 }}>
      <Grid container>
        <Grid item xl={6} md={6} xs={12}>
          <Grid container alignItems="left" spacing={1}>
            <Grid item>
              <TextField
                name="company_id"
                select
                label="Brand"
                //  className={classes.textField}
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                // margin="normal"
                // fullWidth
                InputProps={{ style: { width: "150px", borderRadius: "40px" } }}
                disabled={loading}
              >
                <MenuItem value={""}>Select brand</MenuItem>
                {companyData &&
                  companyData.map((option) => (
                    <MenuItem key={option._id} value={String(option._id)}>
                      {option.company_name}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
            <Grid item>
              <Input
                style={{
                  borderRadius: "20px",
                  marginRight: "5px",
                  height: "37px",
                }}
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                aria-label="action"
                onClick={getSearchData}
                disabled={loading}
              >
                Search
              </Button>
            </Grid>

            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                aria-label="action"
                onClick={handleReset}
                disabled={loading}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xl={6} md={6} xs={12}>
          <Grid
            container
            alignItems="right"
            justifyContent="flex-end"
            spacing={1}
          >
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                aria-label="action"
                onClick={() => setDeleteOpen(true)}
                disabled={loading || checkedProducts.length == 0}
              >
                Delete
              </Button>
            </Grid>
            <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  aria-label="action"
                  onClick={() => setUploadOpen(true)}
                  // disabled={loading || checkedProducts.length == 0}
                >
                  Upload Images
                </Button>
              </Grid> 
            {tab == 0 ? (
              
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  aria-label="action"
                  onClick={(e) => handleHideUnhide(e, "hide")}
                  disabled={loading || checkedProducts.length == 0}
                >
                  Hide
                </Button>
              </Grid> 
            ) : (
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  aria-label="action"
                  onClick={(e) => handleHideUnhide(e, "unhide")}
                  disabled={loading || checkedProducts.length == 0}
                >
                  Unhide
                </Button>
              </Grid>
            )}

            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                aria-label="action"
                onClick={handleDownloadTemp}
                disabled={loading}
              >
                Download Template
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                aria-label="action"
                onClick={handleAddCSVModalOpen}
                disabled={loading}
              >
                Upload Data
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                aria-label="action"
                onClick={handleAddModalOpen}
                disabled={loading}
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* <Typography
        className={classes.title}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        <Grid container spacing={1}>
        <Grid item >
          <Input
            style={{ borderRadius: "20px", marginRight: "5px", height: "37px" }}
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Button
            variant="contained"
            color="secondary"
            aria-label="action"
            onClick={getSearchData}
            disabled={loading}
          >
            Search
          </Button>
        </Grid>
        <Grid item >
          <Button
            variant="contained"
            color="secondary"
            aria-label="action"
            onClick={handleReset}
            disabled={loading}
          >
            Reset
          </Button>
        </Grid>
        </Grid>
      </Typography>
      <div style={{display:'flex',gap:5}}>
      <Button
          variant="contained"
          color="secondary"
          aria-label="action"
          onClick={handleDownloadTemp}
          disabled={loading}
        >
          Download Template
        </Button>
        <Button
          variant="contained"
          color="secondary"
          aria-label="action"
          onClick={handleAddCSVModalOpen}
          disabled={loading}
        >
          Upload CSV
        </Button>
        <Button
          variant="contained"
          color="secondary"
          aria-label="action"
          onClick={handleAddModalOpen}
          disabled={loading}
        >
          Add
        </Button>
      </div> */}
      <AddProductModal
        open={addOpen}
        handleClose={handleClose}
        companyData={companyData}
        reloadData={reloadData}
        categoryData={categoryData}
        loading={loading}
        subCategories={subCategories}
        units={units}
      />
      <UploadProductImagesModal open={uploadOpen} handleClose={() => setUploadOpen(false)} reloadData={reloadData}/>
      <CsvModal
        open={CSVOpen}
        handleClose={handleCSVClose}
        title="Upload Data"
        reloadData={reloadData}
      />
      <DeleteProductModal
        open={deleteOpen}
        checkedProducts={checkedProducts}
        handleClose={() => {
          setDeleteOpen(false);
          setChecked([]);
        }}
        reloadData={reloadData}
        setSearch={setSearch}
      />
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {};

export default function AdvTable(data) {
  const { classes } = useStyles();
  const [order, setOrder] = React.useState("asc");
  const history = useHistory();
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [editOpen, setEditOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(100);
  const [rowData, setRowData] = React.useState({});
  const [productId, setProductId] = React.useState("");
  const [search, setSearch] = React.useState("");
  const [brand, setBrand] = React.useState("");
  const [checked, setChecked] = React.useState([]);
  const [hideUnhide, setHideUnhide] = React.useState(false);
  const [type, setType] = React.useState("");
  const baseUrl = AppConfig.baseUrl;

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

  // const handleClick = (event, name) => {
  //   const selectedIndex = selected.indexOf(name);
  //   let newSelected = [];

  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, name);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1),
  //     );
  //   }

  //   setSelected(newSelected);
  // };

  const handleChangePage = (event, newPage) => {
    data.setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    data.setPage(0);
  };

  // const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.data.length - data.page * rowsPerPage);

  const handleEditModalOpen = async (row) => {
    setRowData(row);
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleDeleteModalOpen = (id) => {
    setDeleteOpen(true);
    setProductId(id);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
    setProductId("");
  };

  const getSearchData = async (type) => {
    try {
      await data.reloadData(search, brand, type);
    } catch (error) {
      console.log(error);
      toast(error.message || "Something went wrong");
    }
  };

  const handleChangeTab = (event, val2) => {
    history.push(`product-bank?tab=${val2}`);
    setChecked([]);
    data.setActiveTab(val2);
  };

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleHideUnhideProduct = (id) => {
    setProductId(id);
    setType(data.activeTab == 0 ? "hide" : "unhide");
    setHideUnhide(true);
  };

  return (
    <div className={classes.rootTable}>
      <Paper className={classes.paper}>
        <Tabs
          value={data.activeTab}
          onChange={handleChangeTab}
          variant="fullWidth"
          indicatorColor="secondary"
          textColor="secondary"
        >
          <Tab className="tabs" label="Active" value={"0"} />
          <Tab label="Hidden" value={"1"} />
        </Tabs>
        <EnhancedTableToolbar
          loading={data.loading}
          companyData={data.companies}
          reloadData={data.reloadData}
          setSearch={setSearch}
          categoryData={data.categories}
          getSearchData={getSearchData}
          search={search}
          brand={brand}
          setBrand={setBrand}
          subCategories={data.subCategories}
          units={data.units}
          tab={data.activeTab}
          checkedProducts={checked}
          setType={setType}
          setHideUnhide={setHideUnhide}
          setChecked={setChecked}
        />
        {data.loading ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src={spinner}
              alt="spinner"
              className={classes.circularProgress}
            />
          </div>
        ) : (
          <TableContainer sx={{ overflowX: "auto" }}>
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
                rowCount={data.data.length}
              />
              <TableBody>
                {data && data.data && data.data.length == 0 && (
                  <TableCell colSpan={8} rowSpan={5}>
                    <EmptyData />
                  </TableCell>
                )}
                {stableSort(data.data, getComparator(order, orderBy))
                  .slice(data.page * rowsPerPage, data.page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    // const isItemSelected = isSelected(row.name);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        // aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row._id}
                        // selected={isItemSelected}
                      >
                        <TableCell>
                          <Checkbox
                            checked={checked.indexOf(row) !== -1}
                            tabIndex={-1}
                            onClick={handleToggle(row)}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        </TableCell>
                        <TableCell align="center" style={{ minWidth: 60 }}>
                          {row.SKU}
                        </TableCell>
                        <TableCell style={{ minWidth: 200 }}>
                          {data.companies.map((val) =>
                            val._id == row.company_id ? val.company_name : ""
                          )}
                        </TableCell>
                        <TableCell style={{ minWidth: 200 }}>
                          {row.product_name}
                        </TableCell>
                        <TableCell style={{ minWidth: 200 }}>
                          {data.categories.map((val) =>
                            val._id == row.category_id ? val.category : ""
                          )}
                        </TableCell>
                        <TableCell align="left" style={{ minWidth: 200 }}>
                          {row.subcategory}
                        </TableCell>
                        <TableCell align="center" style={{ minWidth: 100 }}>
                          {row.quantity}
                          {row.unit}
                        </TableCell>
                        <TableCell align="left" style={{ minWidth: 150 }}>
                          <Grid container gap={0.5} justifyContent="left">
                            <Grid item>
                              <Button
                                style={{
                                  padding: "2px 8px",
                                  fontSize: "12px",
                                  marginRight: "2px",
                                }}
                                color="success"
                                variant="contained"
                                onClick={() => handleEditModalOpen(row)}
                              >
                                Edit
                              </Button>
                            </Grid>
                            <Grid item>
                              <Button
                                style={{
                                  padding: "2px 8px",
                                  fontSize: "12px",
                                  marginRight: "2px",
                                }}
                                color="primary"
                                variant="contained"
                                onClick={() => handleHideUnhideProduct(row._id)}
                              >
                                {data.activeTab == 0 ? "Hide" : "Unhide"}
                              </Button>
                            </Grid>
                            <Grid item>
                              <Button
                                style={{ padding: "2px 8px", fontSize: "12px" }}
                                color="error"
                                variant="contained"
                                onClick={() => handleDeleteModalOpen(row._id)}
                              >
                                Delete
                              </Button>
                            </Grid>
                          </Grid>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {/* {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )} */}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={data.data.length}
          rowsPerPage={rowsPerPage}
          page={data.page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <EditProductModal
        open={editOpen}
        handleClose={handleEditClose}
        data={rowData}
        reloadData={data.reloadData}
        companyData={data.companies}
        categoryData={data.categories}
        subCategories={data.subCategories}
        units={data.units}
      />
      <DeleteProductModal
        open={deleteOpen}
        handleClose={handleDeleteClose}
        id={productId}
        checkedProducts={checked}
        reloadData={data.reloadData}
        setSearch={setSearch}
      />
      <HideUnhideProductModal
        open={hideUnhide}
        type={type}
        setSearch={setSearch}
        checkedProducts={checked}
        id={productId}
        handleClose={() => {
          setHideUnhide(false);
          setProductId("");
          setChecked([]);
        }}
        reloadData={data.reloadData}
      />
    </div>
  );
}

const Actions = ({ data, handleEditModalOpen, handleDeleteModalOpen }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        style={{ padding: "2px 8px", fontSize: "12px" }}
      >
        Actions
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            handleEditModalOpen(data);
            handleClose();
          }}
          disableRipple
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleDeleteModalOpen(data._id), handleClose();
          }}
          disableRipple
        >
          Delete
        </MenuItem>
      </StyledMenu>
    </>
  );
};
