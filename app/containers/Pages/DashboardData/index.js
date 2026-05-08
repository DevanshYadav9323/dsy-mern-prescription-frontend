import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Paper, Grid, TextField, Button, Box, Typography } from "@mui/material";
import { toast } from "react-toastify";
import brand from "dan-api/dummy/brand";
import AppConfig from "../../App/constants/config";
import colorfull from "../../../api/palette/colorfull";
import CounterWidget from "../../../components/Widget/CounterWidget";
import {
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
} from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";
import dayjs from "dayjs";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import spinner from "../../../../public/images/spinner.gif";



ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// const scanChartOptions = {
//     responsive: true,
//     plugins: {
//         legend: {
//             position: 'top',
//             labels: {
//                 usePointStyle: true,
//                 pointStyle: 'rectRounded',
//             },
//         },
//     },
//     scales: {
//         y: {
//             beginAtZero: true,
//         },
//     },
// };

const scanChartOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: "top",
            labels: {
                usePointStyle: true,
                pointStyle: "rectRounded",
            },
        },
        tooltip: {
            mode: "index",
            intersect: false,
        },
    },
    scales: {
        y: {
            beginAtZero: true,
            title: {
                display: true,
                text: "Value",
            },
        },
        x: {
            title: {
                display: true,
                text: "Month",
            },
        },
    },
};

function DashboardData() {
    const title = brand.name + " - Dashboard";
    const description = brand.desc;
    const baseUrl = AppConfig.baseUrl;
    const token = localStorage.getItem("token");
    const [loading, setLoading] = useState(false);
    const [scanChartData, setScanChartData] = useState({
        labels: [],
        datasets: [],
    });
    const [redeemsData, setRedeemsData] = useState([]);
    const [scansData, setScansData] = useState([]);
    const [dataBlockStats, setDataBlockStats] = useState([]);
    // const { classes } = useStyles();

    const getDatablockDetails = async () => {
        try {
            setLoading(true);

            const { data } = await axios.get(
                `${baseUrl}/dashboard/get_datablock_details`,
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );

            if (!data.error) {
                setDataBlockStats(data.data);
            } else {
                toast(data.title || "Failed to fetch datablock details.");
            }
        } catch (error) {
            console.error("Error fetching datablock details", error);
            toast("Error fetching datablock details.");
        } finally {
            setLoading(false);
        }
    };

    // const getScanAnalytics = async () => {
    //     try {
    //         setLoading(true);
    //         const { data } = await axios.get(`${baseUrl}/dashboard/scan_analytics`, {
    //             headers: {
    //                 Authorization: token,
    //             },
    //         });

    //         if (!data.error) {
    //             const scanData = data.scanData || [];

    //             const labels = scanData.map(item =>
    //                 dayjs(item.month, 'YYYY-MM').format('MMM YYYY')
    //             );
    //             const scanCounts = scanData.map(item => item.scanCount);
    //             const scanAmounts = scanData.map(item => item.totalScanAmount);

    //             setScanChartData({
    //                 labels,
    //                 datasets: [
    //                     {
    //                         label: 'Number of Scans',
    //                         data: scanCounts,
    //                         backgroundColor: 'rgb(236, 64, 122)',
    //                     },
    //                     {
    //                         label: 'Scan Amount',
    //                         data: scanAmounts,
    //                         backgroundColor: 'rgb(156, 39, 176)',
    //                     },
    //                 ],
    //             });
    //         } else {
    //             toast(data.title || "Failed to fetch scan analytics.");
    //         }
    //     } catch (error) {
    //         console.error("Error fetching scan analytics", error);
    //         toast("Error fetching scan analytics.");
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const getScanAnalytics = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(
                `${baseUrl}/dashboard/scan_analytics`,
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );

            if (!data.error) {
                const scanData = data.scanData || [];
                const redeemData = data.redeemData || [];

                const months = Array.from(
                    new Set([
                        ...scanData.map((item) => item.month),
                        ...redeemData.map((item) => item.month),
                    ])
                ).sort();

                const labels = months.map((month) =>
                    dayjs(month, "YYYY-MM").format("MMM YYYY")
                );

                const scanAmounts = months.map((month) => {
                    const entry = scanData.find((item) => item.month === month);
                    return entry?.totalScanAmount || 0;
                });

                const coinsEarned = months.map((month) => {
                    const entry = scanData.find((item) => item.month === month);
                    return entry?.totalCoinsEarned || 0;
                });

                const coinsRedeemed = months.map((month) => {
                    const entry = redeemData.find(
                        (item) => item.month === month
                    );
                    return entry?.totalCoinsRedeemed || 0;
                });

                setScanChartData({
                    labels,
                    datasets: [
                        {
                            label: "Total Scan Amount",
                            data: scanAmounts,
                            backgroundColor: "rgb(236, 64, 122)",
                        },
                        {
                            label: "Coins Earned",
                            data: coinsEarned,
                            backgroundColor: "rgb(156, 39, 176)",
                        },
                        {
                            label: "Coins Redeemed",
                            data: coinsRedeemed,
                            backgroundColor: "rgb(33, 150, 243)",
                        },
                    ],
                });
            } else {
                toast(data.title || "Failed to fetch scan analytics.");
            }
        } catch (error) {
            console.error("Error fetching scan analytics", error);
            toast("Error fetching scan analytics.");
        } finally {
            setLoading(false);
        }
    };

    const getDashboardDetails = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(
                `${baseUrl}/dashboard/get_dashboard_details`,
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );

            if (!data.error) {
                setRedeemsData(data.redeemOrderData || []);
                setScansData(data.scanOrderData || []);
            } else {
                toast(data.title || "Failed to fetch dashboard details.");
            }
        } catch (error) {
            console.error("Error fetching dashboard details", error);
            toast("Error fetching dashboard details.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getDatablockDetails();
        getScanAnalytics();
        getDashboardDetails();
    }, []);

    const handleReload = () => {
        setLoading(true);
        getDatablockDetails();
        getScanAnalytics();
        getDashboardDetails();
        setLoading(false);
    };

    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                onClick={handleReload}
                disabled={loading}
                style={{position: "absolute" , right: "8px" , top: "78px" }}
            >
                {loading ? "Reloading..." : "Reload"}
            </Button>

            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="twitter:title" content={title} />
                <meta property="twitter:description" content={description} />
            </Helmet>
            {loading ? (<div style={{ display: "flex", justifyContent: "center" }}>
                                    <img
                                        src={spinner}
                                        alt="spinner"
                                        // className={classes.circularProgress}
                                    />
                                </div>) : (<><Grid container spacing={4} alignItems="stretch">
                <Grid item xs={12} md={6} lg={6} sx={{ height: "100%" }}>
                    <Paper
                        elevation={3}
                        sx={{ p: 3, borderRadius: 2, height: "365px" }}
                    >
                        <Typography
                            variant="h6"
                            fontWeight={500}
                            gutterBottom
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                            }}
                        >
                            <i
                                className="fas fa-circle-dollar-to-slot"
                                style={{ fontSize: "20px", color: "#555" }}
                            ></i>
                            Latest Redeems
                        </Typography>
                        <TableContainer
                            component={Paper}
                            sx={{
                                maxHeight: 250,
                                overflowY: "auto",
                                "&::-webkit-scrollbar": { display: "none" },
                            }}
                        >
                            <Table
                                size="small"
                                stickyHeader
                                sx={{ margin: "0px" }}
                            >
                                <TableHead>
                                    <TableRow
                                        sx={{ backgroundColor: "#f5f5f5" }}
                                    >
                                        <TableCell sx={{ fontWeight: 600 }}>
                                            Customer Name
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>
                                            Coins
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>
                                            Amount
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>
                                            Created At
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {redeemsData.map((row, index) => (
                                        <TableRow
                                            key={index}
                                            hover
                                            sx={{
                                                transition:
                                                    "background 0.2s ease-in-out",
                                                "&:hover": {
                                                    backgroundColor: "#f0f0f0",
                                                },
                                            }}
                                        >
                                            <TableCell sx={{ py: 2 }}>
                                                <Typography
                                                    variant="body2"
                                                    fontWeight={500}
                                                >
                                                    {row.customer_id?.name ||
                                                        "N/A"}
                                                </Typography>
                                            </TableCell>
                                            <TableCell sx={{ py: 2 }}>
                                                <Typography variant="body2">
                                                    {row.coins || 0}
                                                </Typography>
                                            </TableCell>
                                            <TableCell sx={{ py: 2 }}>
                                                <Typography variant="body2">
                                                    ₹ {row.coins / 100 || 0}
                                                </Typography>
                                            </TableCell>
                                            <TableCell sx={{ py: 2 }}>
                                                <Typography variant="body2">
                                                    {new Date(
                                                        row.createdAt
                                                    ).toLocaleDateString(
                                                        "en-IN"
                                                    )}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6} lg={6}>
                    <Grid container spacing={2} sx={{ height: "100%" }}>
                        <Grid item xs={12} sm={6}>
                            <CounterWidget
                                color={colorfull[0]}
                                start={0}
                                end={dataBlockStats.total_redeems}
                                duration={3}
                                title="Total Redeems"
                            >
                                <i
                                    className="fas fa-coins"
                                    style={{
                                        fontSize: "65px",
                                        color: "#fff",
                                        opacity: 0.5,
                                    }}
                                ></i>
                            </CounterWidget>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <CounterWidget
                                color={colorfull[1]}
                                start={0}
                                end={dataBlockStats.total_redeem_amount}
                                duration={3}
                                title="Total Redeemed Amount"
                            >
                                <i
                                    className="fas fa-indian-rupee-sign"
                                    style={{
                                        fontSize: "65px",
                                        color: "#fff",
                                        opacity: 0.5,
                                    }}
                                ></i>
                            </CounterWidget>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <CounterWidget
                                color={colorfull[2]}
                                start={0}
                                end={dataBlockStats.total_unsettled_earnings}
                                duration={3}
                                title="Unsettled Earnings"
                            >
                                <i
                                    className="fas fa-money-bill-wave"
                                    style={{
                                        fontSize: "65px",
                                        color: "#fff",
                                        opacity: 0.5,
                                    }}
                                ></i>
                            </CounterWidget>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <CounterWidget
                                color={colorfull[3]}
                                start={0}
                                end={dataBlockStats.total_settled_earnings}
                                duration={3}
                                title="Settled Earnings"
                            >
                                <i
                                    className="fas fa-wallet"
                                    style={{
                                        fontSize: "65px",
                                        color: "#fff",
                                        opacity: 0.5,
                                    }}
                                ></i>
                            </CounterWidget>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <CounterWidget
                                color={colorfull[6]}
                                start={0}
                                end={dataBlockStats.total_bill_scans}
                                duration={3}
                                title="Total Bill Scans"
                            >
                                <i
                                    className="fas fa-camera"
                                    style={{
                                        fontSize: "65px",
                                        color: "#fff",
                                        opacity: 0.5,
                                    }}
                                ></i>
                            </CounterWidget>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <CounterWidget
                                color={colorfull[7]}
                                start={0}
                                end={dataBlockStats.total_bill_amount}
                                duration={3}
                                title="Total Bill Amount"
                            >
                                <i
                                    className="fas fa-file-invoice-dollar"
                                    style={{
                                        fontSize: "65px",
                                        color: "#fff",
                                        opacity: 0.5,
                                    }}
                                ></i>
                            </CounterWidget>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} md={6} lg={6} sx={{ height: "100%" }}>
                    <Paper
                        elevation={3}
                        sx={{ p: 3, borderRadius: 2, height: "405px" }}
                    >
                        <Typography
                            variant="h6"
                            fontWeight={500}
                            gutterBottom
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                            }}
                        >
                            <i
                                className="fas fa-camera"
                                style={{ fontSize: "20px", color: "#555" }}
                            ></i>
                            Latest Scans
                        </Typography>
                        <TableContainer
                            component={Paper}
                            elevation={0}
                            sx={{
                                maxHeight: 305,
                                overflowY: "auto",
                                scrollbarWidth: "none",
                                "&::-webkit-scrollbar": { display: "none" },
                            }}
                        >
                            <Table
                                size="small"
                                stickyHeader
                                sx={{ margin: "0px" }}
                            >
                                <TableHead>
                                    <TableRow
                                        sx={{ backgroundColor: "#f5f5f5" }}
                                    >
                                        <TableCell sx={{ fontWeight: 600 }}>
                                            Customer Name
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>
                                            Order Number
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>
                                            Amount
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>
                                            Created At
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {scansData.map((row, index) => (
                                        <TableRow
                                            key={index}
                                            hover
                                            sx={{
                                                transition:
                                                    "background 0.2s ease-in-out",
                                                "&:hover": {
                                                    backgroundColor: "#f0f0f0",
                                                },
                                            }}
                                        >
                                            <TableCell sx={{ py: 2 }}>
                                                <Typography
                                                    variant="body2"
                                                    fontWeight={500}
                                                >
                                                    {row.customer_id?.name ||
                                                        "NA"}
                                                </Typography>
                                            </TableCell>
                                            <TableCell sx={{ py: 2 }}>
                                                <Typography variant="body2">
                                                    {row.order_no || "NA"}
                                                </Typography>
                                            </TableCell>
                                            <TableCell sx={{ py: 2 }}>
                                                <Typography variant="body2">
                                                    ₹{" "}
                                                    {row?.total_amount || "NA"}
                                                </Typography>
                                            </TableCell>
                                            <TableCell sx={{ py: 2 }}>
                                                <Typography variant="body2">
                                                    {new Date(
                                                        row.createdAt
                                                    ).toLocaleDateString(
                                                        "en-IN"
                                                    )}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6} lg={6} sx={{ height: "100%" }}>
                    <Paper style={{ padding: "20px" }}>
                        <h3
                            style={{
                                fontSize: "22px",
                                fontWeight: "500",
                                marginBottom: "16px",
                            }}
                        >
                            Scan Activity (Last 3 Months)
                        </h3>
                        {loading ? (
                            <div>Loading...</div>
                        ) : (
                            <Bar
                                data={scanChartData}
                                options={scanChartOptions}
                            />
                        )}
                    </Paper>
                </Grid>
            </Grid></>)} 
            
        </div>
    );
}

export default DashboardData;
