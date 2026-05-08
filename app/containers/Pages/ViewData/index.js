import React , {useState , useEffect}from 'react';
import { useParams } from 'react-router-dom';
import { Paper, Typography, Divider, Box } from '@mui/material';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import AppConfig from "../../App/constants/config";
import axios from 'axios';
import { toast } from "react-toastify";
import dayjs from 'dayjs';

function ViewData() {
  const [scanData, setScanData] = useState(null);
  const [loading, setLoading] = useState(false);
  const baseUrl = AppConfig.baseUrl;
  const token = localStorage.getItem("token");
  const queryParams = new URLSearchParams(window.location.search);
  const orderId = queryParams.get("id");

  const getScanData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${baseUrl}/scans/scan-details?id=${orderId}`, {
        headers: { Authorization: token },
      });

      if (!data.error) {
        setScanData(data.scanOrderData || null);
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
    getScanData();
  }, []);

  if (!scanData) {
    return (
      <Typography variant="h6" color="error">
        Scan data not found.
      </Typography>
    );
  }

  const customer = scanData.customer_id || {};

  return (
    <Paper style={{ padding: "24px", marginTop: "16px" }}>

      <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(240px, 1fr))" gap={2}>
        <Box><strong>Customer Name:</strong> {customer.name || "NA"}</Box>
        {/* <Box><strong>Customer Phone:</strong> {customer.phone_no || "NA"}</Box> */}
        <Box><strong>Invoice Number:</strong> {scanData.invoice_no || "NA"}</Box>
        <Box><strong>Order Number:</strong> {scanData.order_no || "NA"}</Box>
        <Box><strong>Total Products:</strong> {scanData.order_details?.length || 0}</Box>
        <Box><strong>Total Reward:</strong> ₹ {scanData.total_reward || 0}</Box>
        <Box><strong>Total Amount:</strong> ₹ {scanData.total_amount || 0}</Box>
        <Box><strong>Invoice Date:</strong> {scanData.invoice_date ? dayjs(scanData.invoice_date).format("DD-MM-YYYY HH:mm") : "NA"}</Box>
        <Box><strong>Created At:</strong> {scanData.createdAt ? dayjs(scanData.createdAt).format("DD-MM-YYYY HH:mm") : "NA"}</Box>
        {/* <Box><strong>Status:</strong> {scanData.order_status || "NA"}</Box> */}
        {/* <Box><strong>Type:</strong> {scanData.is_offline ? "Offline" : "Online"}</Box> */}
      </Box>

      {scanData.order_details?.length > 0 && (
        <>
          <Divider style={{ margin: "24px 0" }} />
          <Typography variant="h6" gutterBottom>Product Details</Typography>
          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>#</strong></TableCell>
                  <TableCell><strong>Product Name</strong></TableCell>
                  <TableCell><strong>Qty</strong></TableCell>
                  <TableCell><strong>Reward</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {scanData.order_details.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{product.product_name || "NA"}</TableCell>
                    <TableCell>{product.quantity || 0}</TableCell>
                    <TableCell>{product?.reward || 0}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Paper>
  );
}

export default ViewData;
