// import React, {
//   useState
// } from "react";

// import {
//   Helmet
// } from "react-helmet";

// import brand
// from "dan-api/dummy/brand";

// import Typography
// from "@mui/material/Typography";

// import useMediaQuery
// from "@mui/material/useMediaQuery";

// import TextField
// from "@mui/material/TextField";

// import Button
// from "@mui/material/Button";

// import Paper
// from "@mui/material/Paper";

// import Grid
// from "@mui/material/Grid";

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

// function PatientSignup() {

//   const history =
//     useHistory();

//   const title =
//     brand.name;

//   const description =
//     brand.desc;

//   const {
//     classes
//   } = useStyles();

//   const mdDown =
//     useMediaQuery((theme) =>
//       theme.breakpoints.down("md")
//     );

//   const [form, setForm] =
//     useState({

//       name: "",

//       age: "",

//       email: "",

//       phone: "",

//       password: "",

//       surgeryHistory: "",

//       illnessHistory: ""

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

//       const payload = {

//         ...form,

//         surgeryHistory:
//           form.surgeryHistory
//             .split(",")
//             .map((item) =>
//               item.trim()
//             ),

//         illnessHistory:
//           form.illnessHistory
//             .split(",")
//             .map((item) =>
//               item.trim()
//             )

//       };

//       const { data } =
//         await axios.post(

//           `${AppConfig.baseUrl}/patient/signup`,

//           payload

//         );

//       if (data.error) {

//         toast.error(
//           data.message
//         );

//         return;

//       }

//       localStorage.setItem(
//         "token",
//         data.data.token
//       );

//       localStorage.setItem(
//         "patientToken",
//         data.data.token
//       );

//       localStorage.setItem(
//         "role",
//         "patient"
//       );

//       localStorage.setItem(
//         "patientData",
//         JSON.stringify(
//           data.data.patient
//         )
//       );

//       toast.success(
//         data.message
//       );

//       history.push(
//         "/doctors"
//       );

//     } catch (error) {

//       console.log(error);

//       toast.error(
//         "Signup failed"
//       );

//     }

//   };

//   return (

//     <div
//       className={classes.rootFull}
//       style={{
//         height: "100vh",
//         overflow: "hidden"
//       }}
//     >

//       <Helmet>

//         <title>
//           Patient Signup
//         </title>

//         <meta
//           name="description"
//           content={description}
//         />

//       </Helmet>

//       <div

//   className={
//     classes.containerSide
//   }

//   style={{

//     background:
//       "linear-gradient(135deg,#00695C,#26A69A)",

//     minHeight: "100vh",

//     overflowY: "auto",

//     display: "flex",

//     alignItems: "flex-start",

//     paddingTop: 40,

//     paddingBottom: 40

//   }}

// >

//         {/* LEFT SECTION */}

//         {!mdDown && (

//           <div

//             className={
//               classes.opening
//             }

//             style={{

//               flex: 1,

//               height: "100vh",

//               display: "flex",

//               flexDirection: "column",

//               alignItems: "center",

//               justifyContent: "center",

//               padding: "30px"

//             }}

//           >

//             <img

//               src={img}

//               style={{

//                 width: "240px",

//                 maxWidth: "80%",

//                 objectFit: "contain"

//               }}

//             />

//             <Typography

//               variant="h3"

//               style={{

//                 color: "#fff",

//                 marginTop: 28,

//                 fontWeight: 800,

//                 textAlign: "center"

//               }}

//             >

//               Patient Portal

//             </Typography>

//             <Typography

//               style={{

//                 color:
//                   "rgba(255,255,255,0.85)",

//                 marginTop: 16,

//                 maxWidth: 500,

//                 textAlign: "center",

//                 lineHeight: 1.7,

//                 fontSize: 15

//               }}

//             >

//               Create your healthcare
//               account to consult doctors,
//               access prescriptions and
//               manage your medical history
//               securely online.

//             </Typography>

//           </div>

//         )}

//         {/* RIGHT SECTION */}

//         <div

//   className={
//     classes.sideFormWrap
//   }

//   style={{

//     display: "flex",

//     alignItems: "flex-start",

//     justifyContent: "center",

//     minHeight: "100vh",

//     padding: 20,

//     flex: 1

//   }}

// >

//           <Paper

//             elevation={10}

//             style={{

//               width: "100%",

//               maxWidth: 560,

//               borderRadius: 24,

//               padding: "30px",

//               overflow: "hidden"

//             }}

//           >

//             <form
//               onSubmit={submitForm}
//             >

//               {/* HEADER */}

//               <div
//                 style={{
//                   marginBottom: 22
//                 }}
//               >

//                 <Typography

//                   variant="h4"

//                   style={{

//                     fontWeight: 800,

//                     color: "#00796B",

//                     marginBottom: 8

//                   }}

//                 >

//                   Patient Signup

//                 </Typography>

//                 <Typography
//                   style={{
//                     color: "#666",
//                     fontSize: 15
//                   }}
//                 >

//                   Create your patient
//                   account to continue.

//                 </Typography>

//               </div>

//               {/* FORM */}

//               <Grid
//                 container
//                 spacing={2}
//               >

//                 <Grid
//                   item
//                   xs={12}
//                 >

//                   <TextField

//                     fullWidth

//                     variant="outlined"

//                     label="Full Name"

//                     name="name"

//                     value={form.name}

//                     onChange={handleChange}

//                     InputProps={{

//                       style: {

//                         height: 54,

//                         borderRadius: 12

//                       }

//                     }}

//                   />

//                 </Grid>

//                 <Grid
//                   item
//                   xs={12}
//                   md={6}
//                 >

//                   <TextField

//                     fullWidth

//                     variant="outlined"

//                     label="Age"

//                     type="number"

//                     name="age"

//                     value={form.age}

//                     onChange={handleChange}

//                     InputProps={{

//                       style: {

//                         height: 54,

//                         borderRadius: 12

//                       }

//                     }}

//                   />

//                 </Grid>

//                 <Grid
//                   item
//                   xs={12}
//                   md={6}
//                 >

//                   <TextField

//                     fullWidth

//                     variant="outlined"

//                     label="Phone Number"

//                     name="phone"

//                     value={form.phone}

//                     onChange={handleChange}

//                     InputProps={{

//                       style: {

//                         height: 54,

//                         borderRadius: 12

//                       }

//                     }}

//                   />

//                 </Grid>

//                 <Grid
//                   item
//                   xs={12}
//                 >

//                   <TextField

//                     fullWidth

//                     variant="outlined"

//                     label="Email Address"

//                     type="email"

//                     name="email"

//                     value={form.email}

//                     onChange={handleChange}

//                     InputProps={{

//                       style: {

//                         height: 54,

//                         borderRadius: 12

//                       }

//                     }}

//                   />

//                 </Grid>

//                 <Grid
//                   item
//                   xs={12}
//                 >

//                   <TextField

//                     fullWidth

//                     variant="outlined"

//                     label="Password"

//                     type="password"

//                     name="password"

//                     value={form.password}

//                     onChange={handleChange}

//                     InputProps={{

//                       style: {

//                         height: 54,

//                         borderRadius: 12

//                       }

//                     }}

//                   />

//                 </Grid>

//                 <Grid
//                   item
//                   xs={12}
//                 >

//                   <TextField

//                     fullWidth

//                     multiline

//                     rows={3}

//                     variant="outlined"

//                     label="History of Surgery"

//                     helperText="Separate multiple values using commas"

//                     name="surgeryHistory"

//                     value={form.surgeryHistory}

//                     onChange={handleChange}

//                   />

//                 </Grid>

//                 <Grid
//                   item
//                   xs={12}
//                 >

//                   <TextField

//                     fullWidth

//                     multiline

//                     rows={3}

//                     variant="outlined"

//                     label="History of Illness"

//                     helperText="Separate multiple values using commas"

//                     name="illnessHistory"

//                     value={form.illnessHistory}

//                     onChange={handleChange}

//                   />

//                 </Grid>

//               </Grid>

//               {/* BUTTON */}

//               <Button

//                 variant="contained"

//                 fullWidth

//                 size="large"

//                 type="submit"

//                 style={{

//                   marginTop: 24,

//                   height: 54,

//                   borderRadius: 12,

//                   background:
//                     "linear-gradient(90deg,#00796B,#26A69A)",

//                   fontSize: 16,

//                   fontWeight: 700,

//                   textTransform: "none"

//                 }}

//               >

//                 Create Account

//               </Button>

//               {/* LOGIN */}

//               <Typography

//                 align="center"

//                 style={{

//                   marginTop: 20,

//                   cursor: "pointer",

//                   color: "#00796B",

//                   fontWeight: 600,

//                   fontSize: 14

//                 }}

//                 onClick={() =>
//                   history.push(
//                     "/patient/login"
//                   )
//                 }

//               >

//                 Already have an account?
//                 Login

//               </Typography>

//             </form>

//           </Paper>

//         </div>

//       </div>

//     </div>

//   );

// }

// export default PatientSignup;


import React, {
  useState
} from "react";

import {
  Helmet
} from "react-helmet";

import brand
from "dan-api/dummy/brand";

import Typography
from "@mui/material/Typography";

import useMediaQuery
from "@mui/material/useMediaQuery";

import TextField
from "@mui/material/TextField";

import Button
from "@mui/material/Button";

import Paper
from "@mui/material/Paper";

import Grid
from "@mui/material/Grid";

import Avatar
from "@mui/material/Avatar";

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

function PatientSignup() {

  const history =
    useHistory();

  const title =
    brand.name;

  const description =
    brand.desc;

  const {
    classes
  } = useStyles();

  const mdDown =
    useMediaQuery((theme) =>
      theme.breakpoints.down("md")
    );

  const [form, setForm] =
    useState({

      name: "",

      age: "",

      email: "",

      phone: "",

      password: "",

      surgeryHistory: "",

      illnessHistory: "",

      profilePicture: ""

    });

  const handleChange =
    (e) => {

    setForm({

      ...form,

      [e.target.name]:
        e.target.value

    });

  };

  const handleImage =
    (e) => {

    const file =
      e.target.files[0];

    if (!file) return;

    const reader =
      new FileReader();

    reader.readAsDataURL(
      file
    );

    reader.onloadend =
      () => {

      setForm({

        ...form,

        profilePicture:
          reader.result

      });

    };

  };

  const submitForm =
    async (e) => {

    e.preventDefault();

    try {

      const payload = {

        ...form,

        surgeryHistory:
          form.surgeryHistory
            .split(",")
            .map((item) =>
              item.trim()
            ),

        illnessHistory:
          form.illnessHistory
            .split(",")
            .map((item) =>
              item.trim()
            )

      };

      const { data } =
        await axios.post(

          `${AppConfig.baseUrl}/patient/signup`,

          payload

        );

      if (data.error) {

        toast.error(
          data.message
        );

        return;

      }

      localStorage.setItem(
        "token",
        data.data.token
      );

      localStorage.setItem(
        "patientToken",
        data.data.token
      );

      localStorage.setItem(
        "role",
        "patient"
      );

      localStorage.setItem(
        "patientData",
        JSON.stringify(
          data.data.patient
        )
      );

      toast.success(
        data.message
      );

      history.push(
        "/doctors"
      );

    } catch (error) {

      console.log(error);

      toast.error(
        "Signup failed"
      );

    }

  };

  return (

    <div
      className={classes.rootFull}
      style={{
        minHeight: "100vh"
      }}
    >

      <Helmet>

        <title>
          Patient Signup
        </title>

        <meta
          name="description"
          content={description}
        />

      </Helmet>

      <div

        className={
          classes.containerSide
        }

        style={{

          background:
            "linear-gradient(135deg,#00695C,#26A69A)",

          minHeight: "100vh",

          overflowY: "auto",

          display: "flex",

          alignItems: "flex-start",

          paddingTop: 40,

          paddingBottom: 40

        }}

      >

        {/* LEFT SIDE */}

        {!mdDown && (

          <div

            style={{

              flex: 1,

              display: "flex",

              alignItems: "center",

              justifyContent: "center",

              padding: "60px",

              overflow: "hidden"

            }}

          >

            <div

              style={{

                width: "100%",

                maxWidth: 520,

                display: "flex",

                flexDirection: "column",

                alignItems: "center",

                justifyContent: "center",

                textAlign: "center"

              }}

            >

              <img

                src={img}

                style={{

                  width: 240,

                  height: 240,

                  objectFit: "contain"

                }}

              />

              <Typography

                variant="h3"

                style={{

                  color: "#fff",

                  marginTop: 32,

                  fontWeight: 800,

                  width: "100%"

                }}

              >

                Patient Portal

              </Typography>

              <Typography

                style={{

                  color:
                    "rgba(255,255,255,0.85)",

                  marginTop: 18,

                  lineHeight: 1.8,

                  fontSize: 16

                }}

              >

                Create your healthcare
                account to consult doctors,
                access prescriptions and
                manage your medical history
                securely online.

              </Typography>

            </div>

          </div>

        )}

        {/* RIGHT SIDE */}

        <div

          className={
            classes.sideFormWrap
          }

          style={{

            display: "flex",

            alignItems: "flex-start",

            justifyContent: "center",

            minHeight: "100vh",

            padding: 20,

            flex: 1

          }}

        >

          <Paper

            elevation={10}

            style={{

              width: "100%",

              maxWidth: 560,

              borderRadius: 24,

              padding: "30px"

            }}

          >

            <form
              onSubmit={submitForm}
            >

              {/* HEADER */}

              <div
                style={{
                  marginBottom: 22
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

                  Patient Signup

                </Typography>

                <Typography
                  style={{
                    color: "#666",
                    fontSize: 15
                  }}
                >

                  Create your patient
                  account to continue.

                </Typography>

              </div>

              {/* PROFILE IMAGE */}

              <div
                style={{
                  marginBottom: 24,
                  textAlign: "center"
                }}
              >

                <Avatar

                  src={
                    form.profilePicture
                  }

                  style={{

                    width: 110,

                    height: 110,

                    margin:
                      "0 auto 16px auto",

                    border:
                      "4px solid #26A69A"

                  }}

                />

                <Button
                  variant="outlined"
                  component="label"
                  style={{
                    borderRadius: 10
                  }}
                >

                  Upload Profile Picture

                  <input

                    hidden

                    type="file"

                    accept="image/*"

                    onChange={
                      handleImage
                    }

                  />

                </Button>

              </div>

              {/* FORM */}

              <Grid
                container
                spacing={2}
              >

                <Grid
                  item
                  xs={12}
                >

                  <TextField

                    fullWidth

                    variant="outlined"

                    label="Full Name"

                    name="name"

                    value={form.name}

                    onChange={handleChange}

                    InputProps={{

                      style: {

                        height: 54,

                        borderRadius: 12

                      }

                    }}

                  />

                </Grid>

                <Grid
                  item
                  xs={12}
                  md={6}
                >

                  <TextField

                    fullWidth

                    variant="outlined"

                    label="Age"

                    type="number"

                    name="age"

                    value={form.age}

                    onChange={handleChange}

                    InputProps={{

                      style: {

                        height: 54,

                        borderRadius: 12

                      }

                    }}

                  />

                </Grid>

                <Grid
                  item
                  xs={12}
                  md={6}
                >

                  <TextField

                    fullWidth

                    variant="outlined"

                    label="Phone Number"

                    name="phone"

                    value={form.phone}

                    onChange={handleChange}

                    InputProps={{

                      style: {

                        height: 54,

                        borderRadius: 12

                      }

                    }}

                  />

                </Grid>

                <Grid
                  item
                  xs={12}
                >

                  <TextField

                    fullWidth

                    variant="outlined"

                    label="Email Address"

                    type="email"

                    name="email"

                    value={form.email}

                    onChange={handleChange}

                    InputProps={{

                      style: {

                        height: 54,

                        borderRadius: 12

                      }

                    }}

                  />

                </Grid>

                <Grid
                  item
                  xs={12}
                >

                  <TextField

                    fullWidth

                    variant="outlined"

                    label="Password"

                    type="password"

                    name="password"

                    value={form.password}

                    onChange={handleChange}

                    InputProps={{

                      style: {

                        height: 54,

                        borderRadius: 12

                      }

                    }}

                  />

                </Grid>

                <Grid
                  item
                  xs={12}
                >

                  <TextField

                    fullWidth

                    multiline

                    rows={3}

                    variant="outlined"

                    label="History of Surgery"

                    helperText="Separate multiple values using commas"

                    name="surgeryHistory"

                    value={form.surgeryHistory}

                    onChange={handleChange}

                  />

                </Grid>

                <Grid
                  item
                  xs={12}
                >

                  <TextField

                    fullWidth

                    multiline

                    rows={3}

                    variant="outlined"

                    label="History of Illness"

                    helperText="Separate multiple values using commas"

                    name="illnessHistory"

                    value={form.illnessHistory}

                    onChange={handleChange}

                  />

                </Grid>

              </Grid>

              {/* BUTTON */}

              <Button

                variant="contained"

                fullWidth

                size="large"

                type="submit"

                style={{

                  marginTop: 24,

                  height: 54,

                  borderRadius: 12,

                  background:
                    "linear-gradient(90deg,#00796B,#26A69A)",

                  fontSize: 16,

                  fontWeight: 700,

                  textTransform: "none"

                }}

              >

                Create Account

              </Button>

              {/* LOGIN */}

              <Typography

                align="center"

                style={{

                  marginTop: 20,

                  cursor: "pointer",

                  color: "#00796B",

                  fontWeight: 600,

                  fontSize: 14

                }}

                onClick={() =>
                  history.push(
                    "/patient/login"
                  )
                }

              >

                Already have an account?
                Login

              </Typography>

            </form>

          </Paper>

        </div>

      </div>

    </div>

  );

}

export default PatientSignup;