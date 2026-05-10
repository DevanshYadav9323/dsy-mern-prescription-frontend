import React, { useState } from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { LoginFormV2 } from "dan-components";
import useStyles from "dan-components/Forms/user-jss";
import axios from "axios";
import { useHistory, useLocation } from "react-router";
import AppConfig from "../../App/constants/config";
import img from "../../../../public/images/logo/logo.png";
import { toast } from "react-toastify";
import { OtpVerification } from "../../pageListAsync";
import { TextFieldRedux } from "../../../components/Forms/ReduxFormMUI";
import { Field } from "redux-form";
import { Button, FormControl, Paper, TextField } from "@mui/material";
import { token } from "stylis";
import { MuiOtpInput } from "mui-one-time-password-input";
const required = (value) => (value === null ? "Required" : undefined);

function VerifyOTP() {
  const history = useHistory();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const phone_no = queryParams.get("phone");
  const baseUrl = AppConfig.baseUrl;
  const [otp, setOtp] = useState("")
  const handleResend = async () => {
    try {
      const { data } = await axios.post(`${baseUrl}/shop/resend_otp`, {phone_no});
      if (!data.error) {
        toast("OTP sent")
      } else {
        toast(data.title);
      }
    } catch (error) {
      console.log(error);
      toast(error.message);
    }
  };
  console.log(otp,"first")

  const handleVerify = async () => {
    try {
      const { data } = await axios.post(`${baseUrl}/shop/verify_otp`, {phone_no, otp});
      console.log(data)
      if (!data.error) {
        localStorage.setItem("token",data.token)
        const response = await axios.get(`${baseUrl}/shop/shop_details`, {
        headers: { authorization: data.token }})
        localStorage.setItem("qr", response.data.shop.qrUrl)
        localStorage.setItem("shop_name", response.data.shop.shop_name)
        history.push("/redeems")
        toast("Successfully logged in")
      } else {
        toast(data.title);
      }
    } catch (error) {
      console.log(error);
      toast(error.message);
    }
  };

  const title = brand.name;
  const description = brand.desc;
  const { classes, cx } = useStyles();
  const mdDown = useMediaQuery((theme) => theme.breakpoints.down("md"));

  
  return (
    <div className={classes.rootFull}>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <div
        className={classes.containerSide}
        style={{ backgroundColor: "#A32CDE" }}
      >
        {!mdDown && (
          <div className={classes.opening}>
            <img src={img} height="300px" width="300px" />
          </div>
        )}
        <div className={classes.sideFormWrap}>
        <Paper className={cx(classes.sideWrap, classes.petal)}>
        <section className={classes.pageFormSideWrap}>
        <form style={{ marginTop: 250 }}>
          <div>
            <Typography variant="h5" component="h1" gutterBottom>
              Welcome to&nbsp;
              {brand.name}
            </Typography>
            <MuiOtpInput marginTop={5} marginBottom={5} value={otp} onChange={(e)=>setOtp(e)} />
          </div>
          
          <div className={classes.btnArea}>
            <Button
              variant="contained"
              fullWidth
              color="primary"
              size="large"
              onClick={handleResend}
            >
              Resend OTP
            </Button>
            <Button
              variant="contained"
              fullWidth
              color="primary"
              size="large"
              onClick={handleVerify}
            >
              Verify OTP
            </Button>
          </div>
        </form>
      </section>
      </Paper>
        </div>
      </div>
    </div>
  );
}

export default VerifyOTP;
