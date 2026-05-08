import React, { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { ResetForm } from 'dan-components';
import useStyles from '../../../components/Forms/user-jss';
import { useHistory } from 'react-router';
import axios from 'axios';
import { toast } from "react-toastify";
import AppConfig from "../../App/constants/config";

function ResetPassword() {
  const [valueForm, setValueForm] = useState(null);
  const history = useHistory()
  const baseUrl = AppConfig.baseUrl
  const submitForm = useCallback(async (values) => {
     const { data } = await axios.post(`${baseUrl}/admin/send_otp`,values)
     if(data.error){
      toast(data.title)
     } else {
      history.push({pathname:`/verify-otp` , search:`?email=${data.email}`})
     }
  }, [valueForm]);

  const title = brand.name + ' - Reset Password';
  const description = brand.desc;
  const { classes } = useStyles();
  return (
    <div className={classes.root}>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <div className={classes.container}>
        <div className={classes.userFormWrap}>
          <ResetForm onSubmit={(values) => submitForm(values)} />
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
