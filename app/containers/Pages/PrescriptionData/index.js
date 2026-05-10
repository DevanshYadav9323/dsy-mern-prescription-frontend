// import React, {
//   useEffect,
//   useState
// } from "react";

// import axios from "axios";

// import {
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   Button
// } from "@mui/material";

// import AppConfig
// from "../../App/constants/config";

// import { toast }
// from "react-toastify";

// function PrescriptionData() {

//   const [prescriptions,
//     setPrescriptions] =
//     useState([]);

//   useEffect(() => {

//     getPrescriptions();

//   }, []);

//   const getPrescriptions =
//     async () => {

//     try {

//       const token =
//         localStorage.getItem(
//           "doctorToken"
//         );

//       const { data } =
//         await axios.get(
//           `${AppConfig.baseUrl}/prescription/doctor`,
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

//       toast.error(
//         "Failed to fetch prescriptions"
//       );

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
//             lg={4}
//             key={item._id}
//           >

//             <Card>

//               <CardContent>

//                 <Typography
//                   variant="h6"
//                 >

//                   {
//                     item.patient?.name
//                   }

//                 </Typography>

//                 <Typography
//                   gutterBottom
//                 >

//                   {
//                     item.patient?.email
//                   }

//                 </Typography>

//                 <Typography>

//                   <strong>
//                     Care:
//                   </strong>

//                   {" "}

//                   {
//                     item.careToBeTaken
//                   }

//                 </Typography>

//                 <Typography
//                   sx={{
//                     marginTop: 1
//                   }}
//                 >

//                   <strong>
//                     Medicines:
//                   </strong>

//                   {" "}

//                   {
//                     item.medicines
//                   }

//                 </Typography>

//                 <Button
//                   fullWidth
//                   variant="contained"
//                   color="primary"

//                   sx={{
//                     marginTop: 2
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

// export default PrescriptionData;


import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Avatar,
  Divider
} from "@mui/material";

import DownloadRoundedIcon
from "@mui/icons-material/DownloadRounded";

import AppConfig
from "../../App/constants/config";

import { toast }
from "react-toastify";

function PrescriptionData() {

  const [prescriptions,
    setPrescriptions] =
    useState([]);

  useEffect(() => {

    getPrescriptions();

  }, []);

  const getPrescriptions =
    async () => {

    try {

      const token =
        localStorage.getItem(
          "doctorToken"
        );

      const { data } =
        await axios.get(

          `${AppConfig.baseUrl}/prescription/doctor`,

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

      toast.error(
        "Failed to fetch prescriptions"
      );

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

          px: 3

        }}

      >

        <Typography
          variant="h4"
          fontWeight={700}
          gutterBottom
        >

          No Prescriptions Generated Yet

        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            maxWidth: 550,
            lineHeight: 1.8
          }}
        >

          Prescriptions created
          for patient consultations
          will appear here and can
          be downloaded anytime.

        </Typography>

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
                    item.patient
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

                    {
                      item.patient?.name
                    }

                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >

                    {
                      item.patient?.email
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

              {/* DATE */}

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

              {/* ACTION */}

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

export default PrescriptionData;