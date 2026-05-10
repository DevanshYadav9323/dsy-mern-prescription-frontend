// import React, {
//   useState
// } from "react";

// import {
//   Helmet
// } from "react-helmet";

// import Typography
// from "@mui/material/Typography";

// import TextField
// from "@mui/material/TextField";

// import Button
// from "@mui/material/Button";

// import Paper
// from "@mui/material/Paper";

// import useMediaQuery
// from "@mui/material/useMediaQuery";

// import useStyles
// from "dan-components/Forms/user-jss";

// import axios
// from "axios";

// import {
//   useHistory
// } from "react-router";

// import AppConfig
// from "../../App/constants/config";

// import img
// from "../../../../public/images/logo/logo.png";

// import {
//   toast
// } from "react-toastify";

// function PatientLogin() {

//   const history =
//     useHistory();

//   const {
//     classes
//   } = useStyles();

//   const mdDown =
//     useMediaQuery((theme) =>
//       theme.breakpoints.down("md")
//     );

//   const [form, setForm] =
//     useState({

//       email: "",

//       password: ""

//     });

//   const handleChange =
//     (e) => {

//     setForm({

//       ...form,

//       [e.target.name]:
//         e.target.value

//     });

//   };

//   const submitForm =
//     async (e) => {

//     e.preventDefault();

//     try {

//       const { data } =
//         await axios.post(
//           `${AppConfig.baseUrl}/patient/signin`,
//           form
//         );

//       if (data.error) {

//         toast.error(
//           data.message
//         );

//         return;

//       }

//       localStorage.setItem(
//   "token",
//   data.data.token
// );

//       localStorage.setItem(
//         "patientToken",
//         data.data.token
//       );

//       localStorage.setItem(
//         "patientData",
//         JSON.stringify(
//           data.data.patient
//         )
//       );

//       localStorage.setItem(
//   "role",
//   "patient"
// );

//       toast.success(
//         data.message
//       );

//       history.push(
//         "/doctors"
//       );

//     } catch (error) {

//       console.log(error);

//       toast.error(
//         "Login failed"
//       );

//     }

//   };

//   return (

//     <div
//       className={
//         classes.rootFull
//       }
//     >

//       <Helmet>
//         <title>
//           Patient Login
//         </title>
//       </Helmet>

//       <div
//         className={
//           classes.containerSide
//         }

//         style={{
//           backgroundColor:
//             "#009688"
//         }}
//       >

//         {!mdDown && (

//           <div
//             className={
//               classes.opening
//             }
//           >

//             <img
//               src={img}
//               height="300px"
//               width="300px"
//             />

//           </div>

//         )}

//         <div
//           className={
//             classes.sideFormWrap
//           }
//         >

//           <Paper
//             className={
//               classes.sideWrap
//             }
//           >

//             <form
//               onSubmit={
//                 submitForm
//               }
//             >

//               <div
//                 className={
//                   classes.topBar
//                 }
//               >

//                 <Typography
//                   variant="h4"

//                   className={
//                     classes.title
//                   }
//                 >

//                   Patient Login

//                 </Typography>

//               </div>

//               <div
//                 className={
//                   classes.formWrap
//                 }
//               >

//                 <TextField
//                   fullWidth
//                   margin="normal"
//                   label="Email"
//                   name="email"
//                   type="email"
//                   value={
//                     form.email
//                   }
//                   onChange={
//                     handleChange
//                   }
//                 />

//                 <TextField
//                   fullWidth
//                   margin="normal"
//                   label="Password"
//                   name="password"
//                   type="password"
//                   value={
//                     form.password
//                   }
//                   onChange={
//                     handleChange
//                   }
//                 />

//                 <div
//                   className={
//                     classes.btnArea
//                   }
//                 >

//                   <Button
//                     fullWidth
//                     size="large"
//                     variant="contained"
//                     color="primary"
//                     type="submit"
//                   >

//                     Login

//                   </Button>

//                 </div>

//               </div>

//             </form>

//           </Paper>

//         </div>

//       </div>

//     </div>

//   );

// }

// export default PatientLogin;


import React, {
  useState
} from "react";

import {
  Helmet
} from "react-helmet";

import Typography
from "@mui/material/Typography";

import TextField
from "@mui/material/TextField";

import Button
from "@mui/material/Button";

import Paper
from "@mui/material/Paper";

import useMediaQuery
from "@mui/material/useMediaQuery";

import useStyles
from "dan-components/Forms/user-jss";

import axios
from "axios";

import {
  useHistory
} from "react-router";

import AppConfig
from "../../App/constants/config";

import img
from "../../../../public/images/logo/logo.png";

import {
  toast
} from "react-toastify";

function PatientLogin() {

  const history =
    useHistory();

  const {
    classes
  } = useStyles();

  const mdDown =
    useMediaQuery((theme) =>
      theme.breakpoints.down("md")
    );

  const [form, setForm] =
    useState({

      email: "",

      password: ""

    });

  const handleChange =
    (e) => {

    setForm({

      ...form,

      [e.target.name]:
        e.target.value

    });

  };

  const submitForm =
    async (e) => {

    e.preventDefault();

    try {

      const { data } =
        await axios.post(
          `${AppConfig.baseUrl}/patient/signin`,
          form
        );

      if (data.error) {

        toast.error(
          data.message
        );

        return;

      }

      localStorage.clear();
      sessionStorage.clear();

      localStorage.setItem(
        "token",
        data.data.token
      );

      localStorage.setItem(
        "patientToken",
        data.data.token
      );

      localStorage.setItem(
        "patientData",
        JSON.stringify(
          data.data.patient
        )
      );

      localStorage.setItem(
        "role",
        "patient"
      );

      toast.success(
        data.message
      );

    //   history.push(
    //     "/doctors"
    //   );
    window.location.href = "/doctors";

    } catch (error) {

      console.log(error);

      toast.error(
        "Login failed"
      );

    }

  };

  return (

    <div
      className={classes.rootFull}
      style={{
        height: "100vh",
        overflow: "hidden"
      }}
    >

      <Helmet>

        <title>
          Patient Login
        </title>

      </Helmet>

      <div

        className={
          classes.containerSide
        }

        style={{

          background:
            "linear-gradient(135deg,#00695C,#26A69A)",

          height: "100vh",

          overflow: "hidden",

          display: "flex",

          alignItems: "center"

        }}

      >

        {/* LEFT SECTION */}

        {!mdDown && (

          <div

            className={
              classes.opening
            }

            style={{

              flex: 1,

              height: "100vh",

              display: "flex",

              flexDirection: "column",

              alignItems: "center",

              justifyContent: "center",

              padding: "30px"

            }}

          >

            <img

              src={img}

              style={{

                width: "260px",

                maxWidth: "80%",

                objectFit: "contain"

              }}

            />

            <Typography

              variant="h3"

              style={{

                color: "#fff",

                marginTop: 28,

                fontWeight: 800,

                textAlign: "center"

              }}

            >

              Patient Portal

            </Typography>

            <Typography

              style={{

                color:
                  "rgba(255,255,255,0.85)",

                marginTop: 16,

                maxWidth: 500,

                textAlign: "center",

                lineHeight: 1.7,

                fontSize: 15

              }}

            >

              Book consultations,
              access prescriptions,
              and connect with doctors
              securely through the
              online healthcare platform.

            </Typography>

          </div>

        )}

        {/* RIGHT SECTION */}

        <div

          className={
            classes.sideFormWrap
          }

          style={{

            display: "flex",

            alignItems: "center",

            justifyContent: "center",

            height: "100vh",

            padding: 20

          }}

        >

          <Paper

            elevation={10}

            style={{

              width: "100%",

              maxWidth: 480,

              borderRadius: 24,

              padding: "32px",

              overflow: "hidden"

            }}

          >

            <form
              onSubmit={submitForm}
            >

              {/* HEADER */}

              <div
                style={{
                  marginBottom: 25
                }}
              >

                <Typography

                  variant="h4"

                  style={{

                    fontWeight: 800,

                    color: "#00796B",

                    marginBottom: 8

                  }}

                >

                  Patient Login

                </Typography>

                <Typography
                  style={{
                    color: "#666",
                    fontSize: 15
                  }}
                >

                  Welcome back.
                  Please login to continue.

                </Typography>

              </div>

              {/* EMAIL */}

              <TextField

                fullWidth

                variant="outlined"

                margin="normal"

                label="Email Address"

                name="email"

                type="email"

                value={
                  form.email
                }

                onChange={
                  handleChange
                }

                InputProps={{

                  style: {

                    height: 54,

                    borderRadius: 12,

                    fontSize: 15

                  }

                }}

              />

              {/* PASSWORD */}

              <TextField

                fullWidth

                variant="outlined"

                margin="normal"

                label="Password"

                name="password"

                type="password"

                value={
                  form.password
                }

                onChange={
                  handleChange
                }

                InputProps={{

                  style: {

                    height: 54,

                    borderRadius: 12,

                    fontSize: 15

                  }

                }}

              />

              {/* LOGIN */}

              <Button

                variant="contained"

                fullWidth

                size="large"

                type="submit"

                style={{

                  marginTop: 22,

                  height: 54,

                  borderRadius: 12,

                  background:
                    "linear-gradient(90deg,#00796B,#26A69A)",

                  fontSize: 16,

                  fontWeight: 700,

                  textTransform: "none"

                }}

              >

                Login

              </Button>

              {/* SIGNUP */}

              <Typography

                align="center"

                style={{

                  marginTop: 18,

                  cursor: "pointer",

                  color: "#00796B",

                  fontWeight: 600,

                  fontSize: 14

                }}

                onClick={() =>
                  history.push("/patient/signup")
                }

              >

                Don't have a patient account?
                Signup

              </Typography>

              {/* DIVIDER */}

              <div

                style={{

                  marginTop: 22,

                  marginBottom: 22,

                  display: "flex",

                  alignItems: "center",

                  gap: 12

                }}

              >

                <div
                  style={{
                    flex: 1,
                    height: 1,
                    background: "#ddd"
                  }}
                />

                <Typography
                  style={{
                    color: "#999",
                    fontSize: 13
                  }}
                >

                  OR

                </Typography>

                <div
                  style={{
                    flex: 1,
                    height: 1,
                    background: "#ddd"
                  }}
                />

              </div>

              {/* DOCTOR LOGIN */}

              <Button

                fullWidth

                variant="outlined"

                size="large"

                style={{

                  height: 54,

                  borderRadius: 12,

                  textTransform: "none",

                  fontWeight: 700,

                  fontSize: 15

                }}

                onClick={() =>
                  history.push("/doctor/login")
                }

              >

                Continue as Doctor

              </Button>

              {/* DOCTOR SIGNUP */}

              <Typography

                align="center"

                style={{

                  marginTop: 18,

                  cursor: "pointer",

                  color: "#283593",

                  fontWeight: 600,

                  fontSize: 14

                }}

                onClick={() =>
                  history.push("/doctor/signup")
                }

              >

                New doctor?
                Create account

              </Typography>

            </form>

          </Paper>

        </div>

      </div>

    </div>

  );

}

export default PatientLogin;