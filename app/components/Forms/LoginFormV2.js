import React, { useState } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import Button from "@mui/material/Button";
import { connect } from "react-redux";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import ArrowForward from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import useStyles from "./user-jss";
import { TextFieldRedux, CheckboxRedux } from "./ReduxFormMUI";
import brand from "dan-api/dummy/brand";

// validation functions
const required = (value) => (value === null ? "Required" : undefined);
const email = (value) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email"
    : undefined;
const password = (value) =>
  value && value.length < 8 ? "Password cannot be less than 8 characters" : undefined;

const LinkBtn = React.forwardRef(function LinkBtn(props, ref) {
  // eslint-disable-line
  return <NavLink to={props.to} {...props} innerRef={ref} />; // eslint-disable-line
});

function LoginFormV2(props) {

  const { classes, cx } = useStyles();
  const { handleSubmit, pristine, submitting, deco} = props;
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
              <Field
                name="phone_no"
                component={TextFieldRedux}
                placeholder="Phone"
                label="Phone"
                required
                validate={[required]}
                className={classes.field}
              />
            </FormControl>
          </div>
          {/* <div>
            <FormControl variant="standard" className={classes.formControl}>
              <Field
                name="password"
                component={TextFieldRedux}
                type={showPassword ? "text" : "password"}
                label="Password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        size="large"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                required
                validate={[required, password]}
                className={classes.field}
              />
            </FormControl>
          </div> */}
          {/* <div className={classes.optArea}>
            <Button
              size="small"
              onClick={() => setType('forgot')}
              className={classes.buttonLink}
            >
              Forgot password
            </Button>
          </div> */}
          <div className={classes.btnArea}>
            <Button
              variant="contained"
              fullWidth
              color="primary"
              size="large"
              type="submit"
            >
              Continue
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

LoginFormV2.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  deco: PropTypes.bool.isRequired,
};

const LoginFormReduxed = reduxForm({
  form: "loginForm2",
  enableReinitialize: true,
})(LoginFormV2);

const FormInit = connect((state) => ({
  force: state,
  initialValues: state.login.usersLogin,
  deco: state.ui.decoration,
}))(LoginFormReduxed);

export default FormInit;
