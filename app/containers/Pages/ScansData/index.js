import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Button } from '@mui/material';
import { makeStyles } from "tss-react/mui";
import brand from 'dan-api/dummy/brand';
import AppConfig from "../../App/constants/config";
import axios from 'axios';
import { toast } from "react-toastify";
import dayjs from 'dayjs';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginTop: theme.spacing ? theme.spacing(3) : 24,
    },
    paper: {
        width: '100%',
        overflowX: 'auto',
    },
    table: {
        minWidth: 750,
    },
    button: {
        padding: '2px 8px',
        minWidth: 'unset',
        fontSize: '12px'
    },
}));

function ScansData() {
    const classes = useStyles();
    const title = brand.name + ' - Scans Data';
    const description = brand.desc;
    const baseUrl = AppConfig.baseUrl
    const token = localStorage.getItem("token");
    const history = useHistory();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [scansData, setScansData] = useState([]);
    const [loading, setLoading] = useState(false);

    const getScansData = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${baseUrl}/scans/scan_order_listing_for_shop`, {
                headers: {
                    Authorization: token,
                },
            });

            console.log(data)

            if (!data.error) {
                setScansData(data.scanOrderData || []);
            } else {
                toast(data.message || "Something went wrong");
            }
        } catch (error) {
            console.error("Error fetching scan data", error);
            toast("Error fetching scan data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getScansData();
    }, []);


    const dummyData = [
        {
            order_number: 'ORD001',
            customer_name: 'John Doe',
            invoice_number: 'INV1234',
            number_of_products: 3,
            rewards: 150,
            invoice_date: '2024-04-21T10:30:00',
            total_amount: 2500,
        },
        {
            order_number: 'ORD002',
            customer_name: 'Jane Smith',
            invoice_number: 'INV1235',
            number_of_products: 5,
            rewards: 300,
            invoice_date: '2024-04-22T14:45:00',
            total_amount: 4600,
        },
        // Add more entries if needed
    ];

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, scansData.length - page * rowsPerPage);

    return (
        <div className={classes.root}>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
            </Helmet>

            <Paper className={classes.paper}>
                <TableContainer>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Order Number</TableCell>
                                <TableCell>Customer Name</TableCell>
                                <TableCell>Invoice Number</TableCell>
                                <TableCell align="center">Number of Products</TableCell>
                                <TableCell align="center">Rewards</TableCell>
                                <TableCell>Invoice Date</TableCell>
                                <TableCell align="right">Total Amount</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {scansData
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => (
                                    <TableRow hover key={index}>
                                        <TableCell>{row.order_no}</TableCell>
                                        <TableCell>{row.customer_id?.name}</TableCell>
                                        <TableCell>{row?.invoice_no || "NA"}</TableCell>
                                        <TableCell align="center">{row.order_details?.length || 0}</TableCell>
                                        <TableCell align="center">{row.total_reward}</TableCell>
                                        <TableCell>{dayjs(row.createdAt).format("DD-MM-YYYY HH:mm")}</TableCell>
                                        <TableCell align="right">₹ {row.total_amount}</TableCell>
                                        <TableCell align="center">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                className={classes.button}
                                                sx={{ padding: "2px 8px", minWidth: "unset", fontSize: "12px" }}
                                                onClick={() => history.push(`/scans/scan-details?id=${row._id}`)}
                                            >
                                                View
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={8} align="center">Loading...</TableCell>
                                </TableRow>
                            ) : scansData.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={8} align="center">No data found</TableCell>
                                </TableRow>
                            ) : (
                                scansData
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => (
                                        <TableRow hover key={index}>
                                            {/* all your updated table cells here */}
                                        </TableRow>
                                    ))
                            )}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={8} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[]}
                    component="div"
                    count={dummyData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}

export default ScansData;
