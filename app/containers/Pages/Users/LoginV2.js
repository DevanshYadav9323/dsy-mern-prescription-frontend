import React, { useState } from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { LoginFormV2 } from "dan-components";
import useStyles from "dan-components/Forms/user-jss";
import axios from "axios";
import { useHistory } from "react-router";
import AppConfig from "../../App/constants/config";
import img from "../../../../public/images/logo/logo.png";
import { toast } from "react-toastify";

function LoginV2() {
  const history = useHistory();

  const baseUrl = AppConfig.baseUrl;
  const submitForm = async (values) => {
    try {
      const { data } = await axios.post(`${baseUrl}/shop/login_shop`, values);
      if (!data.error) {
        history.push(`/verify-otp?phone=${data.phone_no}`);
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
  const { classes } = useStyles();
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
            <LoginFormV2
              onSubmit={(values) => submitForm(values)}
            />
        </div>
      </div>
    </div>
  );
}

export default LoginV2;
