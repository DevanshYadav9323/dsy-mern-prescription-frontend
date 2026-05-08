import React from 'react';
import { NavLink } from 'react-router-dom';
import { Field } from 'redux-form';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import ArrowForward from '@mui/icons-material/ArrowForward';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import brand from 'dan-api/dummy/brand';
import logo from 'dan-images/logo.svg';
import useStyles from '../../../components/Forms/user-jss';
import { TextField } from '@mui/material';
import { MuiOtpInput } from 'mui-one-time-password-input'
import axios from 'axios';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import AppConfig from "../../App/constants/config";
import img from "../../../../public/images/logo/logo.png"


function OtpVerificationForm(props) {
  const { classes, cx } = useStyles();
  const {
    handleSubmit,
    pristine,
    submitting,
    deco,
    email
  } = props;
  const [otp, setOtp] = React.useState('')
  const history = useHistory()
  const baseUrl = AppConfig.baseUrl

  const handleChange = (e) => {
    setOtp(e)
  }

  const handleVerifyOtp = async () => {
    const { data } = await axios.post(`${baseUrl}/admin/verify_otp`,{otp,email})
    if(data.error){
        toast(data.title)
    } else {
       localStorage.setItem('token',data.token)
       history.push('/product-bank')
    }
  }

  const handleResendOtp = async () => {
    const { data } = await axios.post(`${baseUrl}/admin/resend_otp`,{email})
    toast('Otp sent')
  }
  return (
    <Paper className={cx(classes.paperWrap, deco && classes.petal)}>
      <div style={{display:'flex', justifyContent:'center'}}>
        <NavLink to="/product-bank" className={classes.brand}>
          <img src={img} alt={brand.name} style={{height:80 ,width:80}}/>
        </NavLink>
      </div>
      <Typography variant="h4" className={classes.title} gutterBottom>
        Verify Otp
      </Typography>
      <Typography variant="caption" className={classes.subtitle} gutterBottom align="center">
        Enter Otp below
      </Typography>
      <section className={classes.formWrap}>
        <form>
          <div style={{marginTop:10}}>
            <FormControl variant="standard" className={classes.formControl}>
             <MuiOtpInput value={otp} onChange={handleChange} />
            </FormControl>
          </div>
          <div className={classes.btnArea}>
            <Button variant="contained" color="primary" onClick={handleVerifyOtp}>
              Verify Otp
            </Button>
            <Button variant="contained" color="primary" onClick={handleResendOtp}>
              Resend Otp
            </Button>
          </div>
        </form>
      </section>
    </Paper>
  );
}



export default OtpVerificationForm;
