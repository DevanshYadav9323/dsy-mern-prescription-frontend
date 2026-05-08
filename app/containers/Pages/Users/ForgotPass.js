import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import Button from "@mui/material/Button";
import { connect } from "react-redux";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import ArrowForward from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import useStyles from "../../../components/Forms/user-jss";
// import { TextFieldRedux, CheckboxRedux } from "./ReduxFormMUI";
import brand from "dan-api/dummy/brand";
import { useHistory } from "react-router";
import AppConfig from "../../App/constants/config";
import axios from "axios";
import { TextField } from "@mui/material";
import { toast } from "react-toastify";

// validation functions
const required = (value) => (value === null ? "Required" : undefined);


const LinkBtn = React.forwardRef(function LinkBtn(props, ref) {
  // eslint-disable-line
  return <NavLink to={props.to} {...props} innerRef={ref} />; // eslint-disable-line
});

function ForgotPasswordForm(props) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const { classes, cx } = useStyles();
  const { handleSubmit, pristine, submitting, deco, type, setType} = props;
  const history = useHistory()
  const baseUrl = AppConfig.baseUrl
  const submitForm = async () => {
     const { data } = await axios.post(`${baseUrl}/admin/send_otp`,{email:props.email})
     if(data.error){
      toast(data.title)
     } else {
      props.setType('OTP')
     }
  };
  
  const handleBack = () => {
    props.setType("")
    props.setEmail("")

  }
  return (
    <Paper className={cx(classes.sideWrap, deco && classes.petal)}>
      <section className={classes.pageFormSideWrap}>
        <form onSubmit={handleSubmit} style={{ marginTop: 250 }}>
          <div>
            <Typography variant="h5" component="h1" gutterBottom>
              Welcome to&nbsp;
              {brand.name}
            </Typography>
            <FormControl variant="standard" className={classes.formControl}>
            <TextField
                    variant="standard"
                    // margin="normal"
                    name="product_name"
                    label="Email"
                    value={props.email}
                    onChange={(e) => props.setEmail(e.target.value)}
                    type="text"
                    fullWidth
                  />
            </FormControl>
          </div>
          <div className={classes.optArea}>
            <Button
              size="small"
              onClick={handleBack}
              className={classes.buttonLink}
            >
              Back to login
            </Button>
          </div>
          <div className={classes.btnArea}>
            <Button
              variant="contained"
              fullWidth
              color="primary"
              size="large"
              onClick={submitForm}
            >
              Send OTP
              <ArrowForward
                className={cx(classes.rightIcon, classes.iconSmall)}
                disabled={submitting || pristine}
              />
            </Button>
          </div>
        </form>
      </section>
    </Paper>
  );
}

ForgotPasswordForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  deco: PropTypes.bool.isRequired,
};

const LoginFormReduxed = reduxForm({
  form: "loginForm2",
  enableReinitialize: true,
})(ForgotPasswordForm);

const FormInit = connect((state) => ({
  force: state,
  initialValues: state.login.usersLogin,
  deco: state.ui.decoration,
}))(LoginFormReduxed);

export default FormInit;
