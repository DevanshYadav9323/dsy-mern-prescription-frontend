// import React, {
//   useEffect,
//   useState
// } from "react";

// import axios from "axios";

// import {
//   Typography,
//   Card,
//   CardContent,
//   Grid,
//   Button
// } from "@mui/material";

// import AppConfig
// from "../../App/constants/config";

// function MyPrescriptions() {

//   const [prescriptions,
//     setPrescriptions] =
//     useState([]);

//   useEffect(() => {

//     fetchPrescriptions();

//   }, []);

//   const fetchPrescriptions =
//     async () => {

//     try {

//       const token =
//         localStorage.getItem(
//           "patientToken"
//         );

//       const { data } =
//         await axios.get(

//           `${AppConfig.baseUrl}/consultation/my-prescriptions`,

//           {
//             headers: {
//               authorization:
//                 `Bearer ${token}`
//             }
//           }

//         );

//       setPrescriptions(
//         data.data
//       );

//     } catch (error) {

//       console.log(error);

//     }

//   };

//   return (

//     <div>

//       <Grid
//         container
//         spacing={3}
//       >

//         {prescriptions.map(
//           (item) => (

//           <Grid
//             item
//             xs={12}
//             md={6}
//             key={item._id}
//           >

//             <Card>

//               <CardContent>

//                 <Typography
//                   variant="h6"
//                 >

//                   Dr. {
//                     item.doctor?.name
//                   }

//                 </Typography>

//                 <Typography
//                   sx={{
//                     mt: 2
//                   }}
//                 >

//                   Care To Be Taken

//                 </Typography>

//                 <Typography>

//                   {
//                     item.careToBeTaken
//                   }

//                 </Typography>

//                 <Typography
//                   sx={{
//                     mt: 2
//                   }}
//                 >

//                   Medicines

//                 </Typography>

//                 <Typography>

//                   {
//                     item.medicines
//                   }

//                 </Typography>

//                 <Button

//                   fullWidth

//                   variant="contained"

//                   color="primary"

//                   sx={{
//                     mt: 3
//                   }}

//                   href={`${AppConfig.baseUrl}${item.pdfUrl}`}

//                   target="_blank"

//                 >

//                   Download PDF

//                 </Button>

//               </CardContent>

//             </Card>

//           </Grid>

//         ))}

//       </Grid>

//     </div>

//   );

// }

// export default MyPrescriptions;


import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import {
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Box,
  Avatar,
  Divider
} from "@mui/material";

import DownloadRoundedIcon
from "@mui/icons-material/DownloadRounded";

import {
  useHistory
} from "react-router";

import AppConfig
from "../../App/constants/config";

function MyPrescriptions() {

  const history =
    useHistory();

  const [prescriptions,
    setPrescriptions] =
    useState([]);

  useEffect(() => {

    fetchPrescriptions();

  }, []);

  const fetchPrescriptions =
    async () => {

    try {

      const token =
        localStorage.getItem(
          "patientToken"
        );

      const { data } =
        await axios.get(

          `${AppConfig.baseUrl}/consultation/my-prescriptions`,

          {
            headers: {
              authorization:
                `Bearer ${token}`
            }
          }

        );

      setPrescriptions(
        data.data || []
      );

    } catch (error) {

      console.log(error);

    }

  };

  /*
  ========================================
  EMPTY STATE
  ========================================
  */

  if (
    prescriptions.length === 0
  ) {

    return (

      <Box

        sx={{

          minHeight: "60vh",

          display: "flex",

          flexDirection: "column",

          justifyContent: "center",

          alignItems: "center",

          textAlign: "center",

          padding: 3

        }}

      >

        <Typography
          variant="h4"
          fontWeight={700}
          gutterBottom
        >

          No Prescriptions Yet

        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            maxWidth: 500,
            mb: 4,
            lineHeight: 1.8
          }}
        >

          Your prescriptions will
          appear here after doctors
          complete your consultations.

        </Typography>

        <Button

          variant="contained"

          size="large"

          onClick={() => {

            history.push(
              "/doctors"
            );

          }}

        >

          Consult A Doctor

        </Button>

      </Box>

    );

  }

  return (

    <Grid
      container
      spacing={3}
    >

      {prescriptions.map(
        (item) => (

        <Grid
          item
          xs={12}
          md={6}
          lg={4}
          key={item._id}
        >

          <Card

            elevation={0}

            sx={{

              borderRadius: "20px",

              border:
                "1px solid rgba(0,0,0,0.08)",

              height: "100%",

              transition: "0.25s",

              backgroundColor:
                "#fff",

              "&:hover": {

                transform:
                  "translateY(-4px)",

                boxShadow:
                  "0 10px 30px rgba(0,0,0,0.08)"

              }

            }}

          >

            <CardContent
              sx={{
                p: 3
              }}
            >

              {/* HEADER */}

              <Box

                sx={{

                  display: "flex",

                  alignItems: "center",

                  gap: 2,

                  mb: 3

                }}

              >

                <Avatar

                  src={
                    item.doctor
                      ?.profilePicture
                  }

                  sx={{
                    width: 58,
                    height: 58
                  }}

                />

                <Box>

                  <Typography
                    variant="h6"
                    fontWeight={700}
                  >

                    Dr. {
                      item.doctor?.name
                    }

                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >

                    {
                      item.doctor
                        ?.specialty
                    }

                  </Typography>

                </Box>

              </Box>

              <Divider
                sx={{
                  mb: 3
                }}
              />

              {/* CARE */}

              <Box
                sx={{
                  mb: 3
                }}
              >

                <Typography

                  variant="subtitle2"

                  fontWeight={700}

                  sx={{
                    mb: 1
                  }}

                >

                  Care To Be Taken

                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    lineHeight: 1.9
                  }}
                >

                  {
                    item.careToBeTaken
                  }

                </Typography>

              </Box>

              {/* MEDICINES */}

              <Box
                sx={{
                  mb: 3
                }}
              >

                <Typography

                  variant="subtitle2"

                  fontWeight={700}

                  sx={{
                    mb: 1
                  }}

                >

                  Medicines

                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    lineHeight: 1.9
                  }}
                >

                  {
                    item.medicines
                  }

                </Typography>

              </Box>

              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
                sx={{
                  mb: 3
                }}
              >

                Generated on{" "}

                {

                  new Date(
                    item.createdAt
                  ).toLocaleDateString()

                }

              </Typography>

              <Button

                fullWidth

                variant="outlined"

                startIcon={
                  <DownloadRoundedIcon />
                }

                href={
                  `${AppConfig.baseUrl}${item.pdfUrl}`
                }

                target="_blank"

                sx={{

                  borderRadius: "12px",

                  padding: "10px",

                  fontWeight: 600,

                  textTransform:
                    "none"

                }}

              >

                Download Prescription

              </Button>

            </CardContent>

          </Card>

        </Grid>

      ))}

    </Grid>

  );

}

export default MyPrescriptions;