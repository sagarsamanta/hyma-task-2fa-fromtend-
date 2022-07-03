import React, {  useContext } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import { Button, Typography } from "@material-ui/core";
import { useFormik } from "formik";
import cogoToast from "cogo-toast";
import * as yup from "yup";
import axios from "axios";
import { MyContext } from "../components/AuthProvider";
import { useNavigate, useLocation } from "react-router-dom";
const validationSchema = yup.object({
  otp: yup.string().required("Otp can't be empty"),
});
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 150,
    },
    width: 400,
    padding: 25,
    borderRadius: "20px",
    border: "1px solid #e9e9e9",
    boxShadow: "10px 10px 40px 10px rgb(0,0,0, 0.3)",
    display: "flex",
    justifyContent: "center",
    alignItems: "stretch",
    flexDirection: "column",
    "& > *:not(:last-child)": {
      marginBottom: 20,
    },
    backgroundColor: "white",
  },
  container: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // background: `linear-gradient(to right, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("${BackImage}")`,
    background: "linear-gradient(#ebdede0d, #cae99a);",
  },
  logoImage: {
    width: "200px",
    height: "auto",
    margin: "0 auto",
  },
  form: {
    display: "flex",
    justifyContent: "center",
    alignItems: "stretch",
    flexDirection: "column",
    "& .MuiTextField-root": {
      width: "100%",
      margin: 0,
      marginBottom: 20,
    },
  },
  fullWidth: {
    width: "100%",
  },
}));
const Otp = ({ email, userId }) => {
  const context = useContext(MyContext);
  let navigate = useNavigate();
  let location = useLocation();

  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = (values) => {
    values.userId = userId;
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_DASHBOARD_URL}/api/user/verifyOtp`,
      data: values,
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          cogoToast.success(response.data?.message);
          context.signIn(response.data.user[0], () => {
            let to = location.state?.from?.pathname || "/profile";
            navigate(to, { replace: true });
          });
        } else {
          cogoToast.error(response.data?.message);
        }
      })
      .catch((err) => {
        cogoToast.error(err?.response?.data?.message || "Server error");
      })
      .finally(() => {
      });
  };
  const handleResendOtp = () => {
    let value = {
      userId: userId,
      email: email,
    };
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_DASHBOARD_URL}/api/user/resendOtp`,
      data: value,
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200 && response.data?.status === "PENDING") {
          cogoToast.success(response.data?.message);
        } else {
          cogoToast.error(response.data?.message);
        }
      })
      .catch((err) => {
        cogoToast.error(err?.response?.data?.message || "Server error");
      })
      .finally(() => {});
  };

  return (
    <div className={classes.container}>
      <div className={classes.root}>
        {/* <div style={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="h6">Enter Code</Typography>
        </div> */}
        <div>
          <Typography variant="" style={{ color: "green" }}>
            Verification code sent to : {email}
          </Typography>
        </div>
        <form
          className={classes.form}
          onSubmit={formik.handleSubmit}
          autoComplete="off"
        >
          <TextField
            id="outlined-error"
            placeholder="Enter code...."
            fullWidth
            size="small"
            name="otp"
            variant="outlined"
            value={formik.values.otp}
            onChange={formik.handleChange}
            error={formik.touched.otp && Boolean(formik.errors.otp)}
            helperText={formik.touched.otp && formik.errors.otp}
            focused
          />

          <Button
            onClick={() => {
              formik.handleSubmit();
            }}
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            style={{ border: "none", outline: "none" }}
            // disabled={isDisable}
          >
            Verify
          </Button>
        </form>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "-1rem",
            marginRight: "0.5rem",
          }}
        >
          <NavLink
            to="/signup"
            onClick={handleResendOtp}
            style={({ isActive }) => ({
              textDecoration: "none",
            })}
          >
            Resend Code
          </NavLink>
        </div>
      </div>
    </div>
  );
};
export default Otp;
