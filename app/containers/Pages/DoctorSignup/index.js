// import React, {
//   useState
// } from "react";

// import { Helmet }
// from "react-helmet";

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

// import { useHistory }
// from "react-router";

// import AppConfig
// from "../../App/constants/config";

// import img
// from "../../../../public/images/logo/logo.png";

// import { toast }
// from "react-toastify";

// function DoctorSignup() {

//   const history =
//     useHistory();

//   const title =
//     brand.name;

//   const description =
//     brand.desc;

//   const { classes } =
//     useStyles();

//   const mdDown =
//     useMediaQuery((theme) =>
//       theme.breakpoints.down("md")
//     );

//   const [form, setForm] =
//     useState({

//       name: "",

//       specialty: "",

//       email: "",

//       phone: "",

//       experience: "",

//       password: "",

//       profilePicture: ""

//     });

//   const handleChange =
//     (e) => {

//     setForm({

//       ...form,

//       [e.target.name]:
//         e.target.value

//     });

//   };

//   const handleImage =
//     (e) => {

//     const file =
//       e.target.files[0];

//     if (!file) return;

//     const reader =
//       new FileReader();

//     reader.readAsDataURL(
//       file
//     );

//     reader.onloadend =
//       () => {

//       setForm({

//         ...form,

//         profilePicture:
//           reader.result

//       });

//     };

//   };

//   const submitForm =
//     async (e) => {

//     e.preventDefault();

//     try {

//       const { data } =
//         await axios.post(

//           `${AppConfig.baseUrl}/doctor/signup`,

//           form

//         );

//       if (data.error) {

//         toast.error(
//           data.message
//         );

//         return;

//       }

//       toast.success(
//         data.message
//       );

//       localStorage.setItem(
//         "doctorToken",
//         data.data.token
//       );

//       localStorage.setItem(
//         "doctorData",

//         JSON.stringify(
//           data.data.doctor
//         )
//       );

//       localStorage.setItem(
//         "role",
//         "doctor"
//       );

//       history.push(
//         "/login"
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
//       className={
//         classes.rootFull
//       }
//     >

//       <Helmet>

//         <title>
//           Doctor Signup
//         </title>

//         <meta
//           name="description"
//           content={description}
//         />

//       </Helmet>

//       <div
//         className={
//           classes.containerSide
//         }

//         style={{
//           backgroundColor:
//             "#A32CDE"
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

//                   Doctor Signup

//                 </Typography>

//               </div>

//               <div
//                 className={
//                   classes.formWrap
//                 }
//               >

//                 <Grid
//                   container
//                   spacing={2}
//                 >

//                   <Grid
//                     item
//                     xs={12}
//                   >

//                     <Typography
//                       gutterBottom
//                     >

//                       Profile Picture

//                     </Typography>

//                     <input

//                       type="file"

//                       accept="image/*"

//                       onChange={
//                         handleImage
//                       }

//                     />

//                     {form.profilePicture && (

//                       <div
//                         style={{
//                           marginTop: 20
//                         }}
//                       >

//                         <img

//                           src={
//                             form.profilePicture
//                           }

//                           alt="preview"

//                           style={{

//                             width: 120,

//                             height: 120,

//                             borderRadius:
//                               "50%",

//                             objectFit:
//                               "cover",

//                             border:
//                               "3px solid #A32CDE"

//                           }}

//                         />

//                       </div>

//                     )}

//                   </Grid>

//                   <Grid
//                     item
//                     xs={12}
//                   >

//                     <TextField
//                       fullWidth
//                       label="Full Name"
//                       name="name"
//                       value={form.name}
//                       onChange={
//                         handleChange
//                       }
//                     />

//                   </Grid>

//                   <Grid
//                     item
//                     xs={12}
//                   >

//                     <TextField
//                       fullWidth
//                       label="Specialty"
//                       name="specialty"
//                       value={
//                         form.specialty
//                       }
//                       onChange={
//                         handleChange
//                       }
//                     />

//                   </Grid>

//                   <Grid
//                     item
//                     xs={12}
//                     md={6}
//                   >

//                     <TextField
//                       fullWidth
//                       label="Email"
//                       type="email"
//                       name="email"
//                       value={
//                         form.email
//                       }
//                       onChange={
//                         handleChange
//                       }
//                     />

//                   </Grid>

//                   <Grid
//                     item
//                     xs={12}
//                     md={6}
//                   >

//                     <TextField
//                       fullWidth
//                       label="Phone"
//                       name="phone"
//                       value={
//                         form.phone
//                       }
//                       onChange={
//                         handleChange
//                       }
//                     />

//                   </Grid>

//                   <Grid
//                     item
//                     xs={12}
//                     md={6}
//                   >

//                     <TextField
//                       fullWidth
//                       label="Experience"
//                       name="experience"
//                       value={
//                         form.experience
//                       }
//                       onChange={
//                         handleChange
//                       }
//                     />

//                   </Grid>

//                   <Grid
//                     item
//                     xs={12}
//                     md={6}
//                   >

//                     <TextField
//                       fullWidth
//                       label="Password"
//                       type="password"
//                       name="password"
//                       value={
//                         form.password
//                       }
//                       onChange={
//                         handleChange
//                       }
//                     />

//                   </Grid>

//                 </Grid>

//                 <div
//                   className={
//                     classes.btnArea
//                   }
//                 >

//                   <Button
//                     variant="contained"
//                     color="primary"
//                     fullWidth
//                     size="large"
//                     type="submit"
//                   >

//                     Create Account

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

// export default DoctorSignup;


import React, {
  useState
} from "react";

import { Helmet }
from "react-helmet";

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

import { useHistory }
from "react-router";

import AppConfig
from "../../App/constants/config";

import img
from "../../../../public/images/logo/logo.png";

import { toast }
from "react-toastify";

function DoctorSignup() {

  const history =
    useHistory();

  const title =
    brand.name;

  const description =
    brand.desc;

  const { classes } =
    useStyles();

  const mdDown =
    useMediaQuery((theme) =>
      theme.breakpoints.down("md")
    );

  const [form, setForm] =
    useState({

      name: "",

      specialty: "",

      email: "",

      phone: "",

      experience: "",

      password: "",

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

      const { data } =
        await axios.post(

          `${AppConfig.baseUrl}/doctor/signup`,

          form

        );

      if (data.error) {

        toast.error(
          data.message
        );

        return;

      }

      toast.success(
        data.message
      );

      localStorage.setItem(
        "doctorToken",
        data.data.token
      );

      localStorage.setItem(
        "doctorData",

        JSON.stringify(
          data.data.doctor
        )
      );

      localStorage.setItem(
        "role",
        "doctor"
      );

      history.push(
        "/doctor/login"
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
          Doctor Signup
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
            "linear-gradient(135deg,#283593,#5C6BC0)",

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

            className={
              classes.opening
            }

            style={{

              flex: 1,

              minHeight: "100vh",

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

                width: "240px",

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

              Doctor Portal

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

              Create your professional
              doctor account to manage
              consultations, prescriptions,
              and patient interactions
              securely online.

            </Typography>

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
              onSubmit={
                submitForm
              }
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

                    color: "#283593",

                    marginBottom: 8

                  }}

                >

                  Doctor Signup

                </Typography>

                <Typography
                  style={{
                    color: "#666",
                    fontSize: 15
                  }}
                >

                  Create your doctor
                  account to continue.

                </Typography>

              </div>

              {/* IMAGE */}

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
                      "4px solid #5C6BC0"

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
                >

                  <TextField

                    fullWidth

                    variant="outlined"

                    label="Specialty"

                    name="specialty"

                    value={form.specialty}

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
                  md={6}
                >

                  <TextField

                    fullWidth

                    variant="outlined"

                    label="Years of Experience"

                    name="experience"

                    value={form.experience}

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
                    "linear-gradient(90deg,#283593,#5C6BC0)",

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

                  color: "#283593",

                  fontWeight: 600,

                  fontSize: 14

                }}

                onClick={() =>
                  history.push(
                    "/doctor/login"
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

export default DoctorSignup;